using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Model.ResponseModel;
using WeatherAppAPI.Services.Repository;

namespace WeatherAppAPI.Services;

public interface ILocationService
{
    ICollection<LocationModel> GetAllLocations();
    LocationModel GetLocation(int id);
    DataModificationResponse AddLocation(LocationModel locationModel);
}

public class LocationService: ILocationService
{
    private readonly WeatherAppAPIDbContext db;
    private readonly IRepository repository;
    private readonly Converter converter;

    public LocationService(WeatherAppAPIDbContext db, IRepository repository, Converter converter)
    {
        this.db = db;
        this.repository = repository;
        this.converter = converter;
    }

    public ICollection<LocationModel> GetAllLocations()
    {
        var locations =  db.Locations.ToList();
        if (locations == null) return null;
        return locations.Select(locationEntity => converter.LocationEntityToModel(locationEntity)).ToList();
    }

    public LocationModel GetLocation(int id)
    {
        var location = db.Locations.Find(id);
        if (location == null) return null;
        return converter.LocationEntityToModel(location);
    }

    public DataModificationResponse AddLocation(LocationModel locationModel)
    {
        var locationEntity = converter.LocationModelToEntity(locationModel);
        var response = repository.Create(locationEntity);

        if (response.IsSuccessful)
        {
            response.Id = locationEntity.Id;
            response.Message = "Successfully added the settings";
        }
        else
        {
            response.Message = "Something went wrong! Could not add to settings!";
        }

        return response;
    }
}
