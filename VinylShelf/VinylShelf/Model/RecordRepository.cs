namespace VinylShelf.Model;

public class RecordRepository(ApplicationDatabaseContext dbContext) : IRecordRepository
{
    public async Task AddRecord(Record record)
    {
        await dbContext.Records.AddAsync(record);

        await dbContext.SaveChangesAsync();
    }
}