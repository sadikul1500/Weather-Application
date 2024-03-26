using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Model.ResponseModel;

namespace WeatherAppAPI.Services.Repository;

public interface IRepository
{
    DataModificationResponse Create<T>(T entity);
    DataModificationResponse Update<T>(T entity);
    DataModificationResponse Delete<T>(T entity);
}

public class Repository : IRepository
{
    private readonly WeatherAppAPIDbContext db;

    public Repository(WeatherAppAPIDbContext db)
    {
        this.db = db;
    }

    private DataModificationResponse SaveChange()
    {
        var response = new DataModificationResponse();
        try
        {
            db.SaveChanges();
        }
        catch (Exception e)
        {
            response.IsSuccessful = false;
            response.Message = e.Message;
            return response;
        }

        response.IsSuccessful = true;
        return response;
    }

    public DataModificationResponse Create<T>(T entity)
    {
        db.Add(entity);

        return SaveChange();
    }

    public DataModificationResponse Delete<T>(T entity)
    {
        db.Remove(entity);

        return SaveChange();
    }

    public DataModificationResponse Update<T>(T entity)
    {
        db.Entry(entity).State = EntityState.Modified;

        return SaveChange();
    }

    public void DetatchLocalEntity<T>(string Id) where T: class, IIdentifier
    {
        var local = db.Set<T>().Local.FirstOrDefault(entry => entry.Id.ToString().Equals(Id));

        if (local != null)
        {
            db.Entry(local).State = EntityState.Detached;
        }
    }
}
