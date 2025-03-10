using Microsoft.EntityFrameworkCore;

namespace VinylShelf.Model;

public class ArtistRepository(ApplicationDatabaseContext dbContext) : IArtistRepository
{
    public async Task AddAsync(Artist artist)
    {
        await dbContext.Artists.AddAsync(artist);
        await dbContext.SaveChangesAsync();
    }
    public async Task<Artist?> GetByNameAsync(string name)
    {
        return await dbContext.Artists.FirstOrDefaultAsync(a => a.Name == name);
    }
}