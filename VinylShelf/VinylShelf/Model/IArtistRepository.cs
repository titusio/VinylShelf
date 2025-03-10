namespace VinylShelf.Model;

public interface IArtistRepository
{
    public Task AddAsync(Artist artist);
    
    public Task<Artist?> GetByNameAsync(string name);
}