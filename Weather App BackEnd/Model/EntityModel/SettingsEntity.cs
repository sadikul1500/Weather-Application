namespace WeatherAppAPI.Model.EntityModel;
public class SettingsEntity
{
    public int Id { get; set; }
    public string Unit { get; set; }
    public int? LocationId { get; set; }
    public int UserId { get; set; }

    public virtual LocationEntity Location { get; set; }
    public virtual UserEntity User { get; set; }
}
