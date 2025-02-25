using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VinylShelf.Model;

namespace VinylShelf;

public class ApplicationDatabaseContext(DbContextOptions o) : IdentityDbContext<User>(o)
{
    public DbSet<Record> Records { get; set; }
    
    public DbSet<Artist> Artists { get; set; }
}