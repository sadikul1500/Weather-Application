namespace WeatherAppAPI.Model.EntityModel;
public class LocationEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public virtual ICollection<SettingsEntity> Settings { get; set; }
}
