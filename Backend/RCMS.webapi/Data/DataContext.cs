namespace RCMS.webapi.Data
{
    using Microsoft.EntityFrameworkCore;
    using RCMS.webapi.Models;
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Roles> Roles { get; set; }

        public DbSet<UserRoles> UserRoles { get; set; }

    }
}
