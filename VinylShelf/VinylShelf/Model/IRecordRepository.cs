namespace VinylShelf.Model;

public interface IRecordRepository
{
    public Task AddRecord(Record record);
}