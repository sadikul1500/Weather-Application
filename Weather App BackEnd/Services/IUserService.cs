using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Model.ResponseModel;
using WeatherAppAPI.Services.Repository;

namespace WeatherAppAPI.Services;
public interface IUserService
{
	UserModel GetUser(int id);
	UserModel GetUser(string username, string password);
	ICollection<UserModel> GetUsers();
	DataModificationResponse AddUser(UserModel userModel);
}

public class UserService: IUserService
{
    private readonly WeatherAppAPIDbContext db;
    private readonly IRepository repository;
    private readonly Converter converter;

	public UserService(WeatherAppAPIDbContext db, IRepository repository, Converter converter)
	{
		this.db = db;
		this.repository = repository;
		this.converter = converter;
	}

	public UserModel GetUser(int id)
	{
		var userEntity = db.Users.Find(id);
		if (userEntity == null) return null;
		return converter.UserEntityToModel(userEntity);
	}

	public UserModel GetUser(string username, string password)
	{
        var userEntity = db.Users.Where(x => x.Name == username && x.Password == password).FirstOrDefault();
        if (userEntity == null) return null;
        return converter.UserEntityToModel(userEntity);
    }

    public ICollection<UserModel> GetUsers()
	{
		var userEntities = db.Users.ToList();
		if(userEntities == null) return null;
		return userEntities.Select(userEntity => converter.UserEntityToModel(userEntity)).ToList();
	}

	public DataModificationResponse AddUser(UserModel userModel)
	{
		var userEntity = converter.UserModelToEntity(userModel);

		var response = repository.Create(userEntity);

        if (response.IsSuccessful)
        {
            response.Message = "Successfully added the settings";
			response.Id = userEntity.Id;
        }
        else
        {
            response.Message = "Something went wrong! Could not add to settings!";
        }

        return response;
    }
}
