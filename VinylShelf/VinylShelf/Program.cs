using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VinylShelf;
using VinylShelf.Extensions;
using VinylShelf.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDatabaseContext>()
    .AddApiEndpoints();

builder.Services.AddDbContext<ApplicationDatabaseContext>(options =>
{
    string? connectionString = builder.Configuration.GetConnectionString("database");
    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<IArtistRepository, ArtistRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // app.ApplyMigrations();
}

app.MapIdentityApi<User>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();