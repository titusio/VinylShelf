using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VinylShelf.Model;
using VinylShelf.Requests;

namespace VinylShelf.Controllers;

[ApiController, Route("api/[controller]")]
public class ArtistController(IArtistRepository artistRepository) : ControllerBase
{
    [HttpPost, Authorize]
    public async Task<IActionResult> CreateArtist([FromBody] CreateArtistRequest createRequest)
    {
        Artist? existing = await artistRepository.GetByNameAsync(createRequest.Name);

        if (existing is not null)
        {
            return Conflict($"Artist called {existing.Name} already present in the Database!");
        }
        
        Artist artist = new()
        {
            Name = createRequest.Name
        };

        await artistRepository.AddAsync(artist);

        return Ok();
    }
}