// Program.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RCMS.webapi.Data;

//Initializes a new instance of the WebApplicationBuilder class
//This is the entry point to configure your app. It prepares the services, configurations, and middleware that the app will use.
var builder = WebApplication.CreateBuilder(args);

//Registers the API explorer services
builder.Services.AddEndpointsApiExplorer();
//Adds Swagger generation services and configures the API documentation details
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Registration API", Version = "v1" });
});


//Configures Entity Framework Core (EF Core) to use SQL Server as the database provider
//and injects the DataContext class into the application’s services
builder.Services.AddDbContext<DataContext>(options =>
{

    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
//Adds CORS services to the app.
//Why: CORS allows your API to accept requests from different origins (domains).
//This is useful in cases where your frontend (e.g., React or Angular app) is hosted on a different domain than your API.
builder.Services.AddCors();

//what: Adds support for controllers to the app.
//Why: ASP.NET Core uses the Model-View-Controller (MVC) pattern.
//This line enables the creation of API endpoints via controllers
builder.Services.AddControllers();

//What: Builds the configured application.
//Why: After configuring services and middleware, the app is built so it can start processing requests.
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registration API v1"));
}

//What: Middleware to redirect HTTP requests to HTTPS.
//Why: Forcing HTTPS ensures secure communication between clients and the API by encrypting the data
app.UseHttpsRedirection();

//What: Middleware that adds routing to the application.
//Why: Routing maps incoming requests to the appropriate controller actions or endpoints. 
//This is necessary for an API to determine which controller should handle the request.
app.UseRouting();

//What: Sets the CORS policy to allow requests from http://localhost:3000 (a typical frontend app).
app.UseCors(builder => builder
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod());

//What: Maps the controller routes to the endpoints.
//Why: This step ensures that the application can route requests to the controllers (which contain the API logic). 
//Without this, your API wouldn't know which endpoint to respond to.
app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers();
});
//What: Starts the application.
//Why: This is the final step in the setup that launches the web server and begins listening for requests
app.Run();
