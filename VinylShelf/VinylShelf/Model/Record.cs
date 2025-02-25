namespace VinylShelf.Model;

public class Record
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required Artist Artist { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public required User Owner { get; set; }
}