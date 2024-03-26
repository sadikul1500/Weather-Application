namespace WeatherAppAPI.Model.EntityModel;
public class UserEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }

    public virtual SettingsEntity Settings { get; set; }
    public virtual ProfileEntity Profile { get; set; }
}
