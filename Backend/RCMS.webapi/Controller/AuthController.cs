namespace RCMS.webapi.Controller
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using RCMS.webapi.Data;
    using RCMS.webapi.Models;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            try
            {
                // Step 1: Authenticate user
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

                if (user == null)
                {
                    return Unauthorized("Invalid credentials.");
                }

                // Step 2: Fetch user's role
                var userRoleName = await _context.UserRoles
                    .Where(ur => ur.UserId == user.Id)
                    .Join(_context.Roles,
                          ur => ur.RoleId,
                          r => r.RoleId,
                          (ur, r) => r.RoleName)
                    .FirstOrDefaultAsync();

                if (string.IsNullOrEmpty(userRoleName))
                {
                    return Forbid("No role assigned to the user.");
                }

                // Step 3: Only allow Admins to log in
                if (userRoleName != "Admin")
                {
                    return StatusCode(403, new { message = "Only Admins are allowed to log in." });
                }

                // Step 4: Create claims
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, userRoleName)
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { Token = tokenString });
            }
            catch (Exception ex)
            {
                // Log error to console or logging system
                Console.WriteLine("Login error: " + ex.Message);
                return StatusCode(500, "An error occurred during login.");
            }
        }



        [HttpPost("signup")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                // Step 1: Add user to Users table
                _context.Users.Add(user);
                await _context.SaveChangesAsync(); // Save user first to get the UserId

                // Step 2: Assign default role 'User'
                var defaultRole = await _context.Roles.SingleOrDefaultAsync(r => r.RoleName == "Non-Admin");
                if (defaultRole == null)
                {
                    return BadRequest("Default role not found.");
                }

                // Step 3: Create a new UserRole entry
                var userRole = new UserRoles
                {
                    UserId = user.Id, // The userId will be generated after saving the user
                    RoleId = defaultRole.RoleId // Assign the 'User' role
                };

                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync(); // Save the user role

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest("Failed to register user.");
            }

            // Return success with the created user information
            return CreatedAtAction(nameof(GetUsers), new { email = user.Email }, user);
        }


        [HttpPut()]
        public async Task<IActionResult> PutUser(string email, User user)
        {
            if (email != user.Email)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool UserExists(string email)
        {
            return _context.Users.Any(e => e.Email == email);
        }



        // Other actions like updating and deleting user profiles can be added here.

        // Ensure you have a User model and UserLoginRequest model defined in your project.
    }
}
