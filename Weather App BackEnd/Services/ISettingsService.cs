using WeatherAppAPI.Data;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Model.ResponseModel;
using WeatherAppAPI.Services.Repository;

namespace WeatherAppAPI.Services;
public interface ISettingsService
{
    SettingsModel GetSettings(int id);
    SettingsModel GetSettingsByUserId(int userId);
    DataModificationResponse AddSettings(SettingsModel settingsModel);
    DataModificationResponse UpdateSettings(int id, SettingsModel settingsModel);
}

public class SettingsService: ISettingsService
{
    private readonly WeatherAppAPIDbContext db;
    private readonly IRepository repository;
    private readonly Converter converter;

    public SettingsService(WeatherAppAPIDbContext db, IRepository repository, Converter converter)
    {
        this.db = db;
        this.repository = repository;
        this.converter = converter;
    }

    public SettingsModel GetSettings(int id)
    {
        var settingsEntity = this.db.Settings.Find(id);
        if (settingsEntity == null) return null;
        return converter.SettingsEntityToModel(settingsEntity);
    }

    public SettingsModel GetSettingsByUserId(int userId)
    {
        var settingsEntity = this.db.Settings.Where(s => s.UserId == userId).FirstOrDefault();
        if (settingsEntity == null) return null;
        return converter.SettingsEntityToModel(settingsEntity);

    }

    public DataModificationResponse AddSettings(SettingsModel settingsModel)
    {
        var settingsEntity = converter.SettingsModelToEntity(settingsModel);

        var response = repository.Create(settingsEntity);

        if (response.IsSuccessful)
        {
            response.Message = "Successfully added the settings";
            response.Id = settingsEntity.Id;
        }
        else
        {
            response.Message = "Something went wrong! Could not add to settings!";
        }

        return response;
    }

    public DataModificationResponse UpdateSettings(int id, SettingsModel settingsModel)
    {
        var settingsEntity = converter.SettingsModelToEntity(settingsModel);

        var editedSettings = new SettingsEntity()
        {
            Id = id,
            Unit = settingsEntity.Unit,
            LocationId = settingsEntity.LocationId,
            UserId = settingsEntity.UserId
        };

        var response = repository.Update<SettingsEntity>(editedSettings);

        if (response.IsSuccessful)
        {
            response.Id = id;
            response.Message = "Successfully updated the settings";
        }
        else
        {
            response.Message = "Something went wrong! Could not update the settings!";
        }

        return response;
    }
}
