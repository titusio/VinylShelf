using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VinylShelf.Model;
using VinylShelf.Requests;

namespace VinylShelf.Controllers;

[ApiController, Route("api/[controller]")]
public class RecordController(IRecordRepository recordRepository, IArtistRepository artistRepository, UserManager<User> userManager) : ControllerBase
{
    [HttpPost, Authorize]
    public async Task<IActionResult> CreateRecord([FromBody] CreateRecordRequest createRequest)
    {
        User? owner = await userManager.GetUserAsync(User);
        if (owner is null)
        {
            return NotFound("User not found!");
        }

        Artist? artist = await artistRepository.GetByNameAsync(createRequest.ArtistName);
        if (artist is null)
        {
            return NotFound($"Artist '{createRequest.ArtistName}' not found!");
        }

        Record record = new()
        {
            Name = createRequest.Name,
            Artist = artist,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Owner = owner 
        };

        await recordRepository.AddRecord(record);
        return Ok();
    }
}