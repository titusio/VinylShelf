using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VinylShelf.Model;

namespace VinylShelf;

public class ApplicationDatabaseContext(DbContextOptions o) : IdentityDbContext<User>(o);