using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Services;
public class Converter
{
    public UserModel UserEntityToModel(UserEntity userEntity)
    {
        return new UserModel()
        {
            Id = userEntity.Id,
            Username = userEntity.Name,
            Password = userEntity.Password,
            Token = userEntity.Token
        };
    }

    public UserEntity UserModelToEntity(UserModel userModel)
    {
        return new UserEntity()
        {
            Id = userModel.Id,
            Name = userModel.Username,
            Password = userModel.Password,
            Token = userModel.Token
        };
    }

    public LocationModel LocationEntityToModel(LocationEntity locationEntity)
    {
        return new LocationModel()
        {
            Id = locationEntity.Id,
            Name = locationEntity.Name,
            Latitude = locationEntity.Latitude,
            Longitude = locationEntity.Longitude
        };
    }

    public LocationEntity LocationModelToEntity(LocationModel locationModel)
    {
        return new LocationEntity()
        {
            Id = locationModel.Id,
            Name = locationModel.Name,
            Latitude = locationModel.Latitude,
            Longitude = locationModel.Longitude
        };
    }

    public SettingsModel SettingsEntityToModel(SettingsEntity settingsEntity)
    {
        return new SettingsModel()
        {
            Id = settingsEntity.Id,
            Unit = settingsEntity.Unit,
            LocationId = settingsEntity.LocationId,
            UserId = settingsEntity.UserId,
        };
    }

    public SettingsEntity SettingsModelToEntity(SettingsModel settingsModel)
    {
        return new SettingsEntity()
        {
            Id = settingsModel.Id,
            Unit = settingsModel.Unit,
            LocationId = settingsModel.LocationId,
            UserId = settingsModel.UserId,
        };
    }

    public ProfileModel ProfileEntityToModel(ProfileEntity profileEntity)
    {
        return new ProfileModel()
        {
            Id = profileEntity.Id,
            FullName = profileEntity.FullName,
            Address = profileEntity.Address,
            Phone = profileEntity.Phone,
            Email = profileEntity.Email,
            UserId = profileEntity.UserId,
        };
    }

    public ProfileEntity ProfileModelToEntity(ProfileModel profileModel)
    {
        return new ProfileEntity()
        {
            Id = profileModel.Id,
            FullName = profileModel.FullName,
            Address = profileModel.Address,
            Phone = profileModel.Phone,
            Email = profileModel.Email,
            UserId = profileModel.UserId,
        };
    }
}
