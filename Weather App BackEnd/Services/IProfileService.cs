using WeatherAppAPI.Data;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Model.ResponseModel;
using WeatherAppAPI.Services.Repository;

namespace WeatherAppAPI.Services;

public interface IProfileService
{
    ProfileModel GetProfile(int id);
    ProfileModel GetProfileByUserId(int userid);
    DataModificationResponse AddProfile(ProfileModel profileModel);
    DataModificationResponse UpdateProfile(ProfileModel profileModel);
}

public class ProfileService : IProfileService
{
    private readonly WeatherAppAPIDbContext db;
    private readonly IRepository repository;
    private readonly Converter converter;

    public ProfileService(WeatherAppAPIDbContext db, IRepository repository, Converter converter)
    {
        this.db = db;
        this.repository = repository;
        this.converter = converter;
    }

    public ProfileModel GetProfileByUserId(int userId)
    {
        var profileEntity = this.db.Profiles.Where(p => p.UserId == userId).FirstOrDefault();
        if (profileEntity == null) return null;
        return converter.ProfileEntityToModel(profileEntity);
    }

    public ProfileModel GetProfile(int id)
    {
        var profileEntity = db.Profiles.Find(id);
        if (profileEntity == null) return null;
        return converter.ProfileEntityToModel(profileEntity);
    }

    public DataModificationResponse AddProfile(ProfileModel profileModel)
    {
        var profileEntity = converter.ProfileModelToEntity(profileModel);

        var response = repository.Create(profileEntity);

        if (response.IsSuccessful)
        {
            response.Message = "Successfully added the profile";
            response.Id = profileEntity.Id;
        }
        else
        {
            response.Message = "Something went wrong! Could not add to profile!";
        }

        return response;
    }

    public DataModificationResponse UpdateProfile(ProfileModel profileModel)
    {
        var profileEntity = converter.ProfileModelToEntity(profileModel);

        var response = repository.Update<ProfileEntity>(profileEntity);

        if (response.IsSuccessful)
        {
            response.Id = profileEntity.Id;
            response.Message = "Successfully updated the profile";
        }
        else
        {
            response.Message = "Something went wrong! Could not update the profile!";
        }

        return response;
    }
}
