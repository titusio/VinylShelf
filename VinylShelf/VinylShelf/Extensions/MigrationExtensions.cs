using Microsoft.EntityFrameworkCore;

namespace VinylShelf.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();

        using ApplicationDatabaseContext context =
            scope.ServiceProvider.GetRequiredService<ApplicationDatabaseContext>();

        context.Database.Migrate();
    }
}