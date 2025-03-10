namespace VinylShelf.Requests;

public class CreateRecordRequest
{
    public required string Name { get; set; }
    public required string ArtistName { get; set; }
}