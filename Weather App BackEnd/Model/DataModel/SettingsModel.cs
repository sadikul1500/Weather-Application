namespace WeatherAppAPI.Model.DataModel;

public class SettingsModel
{
    public int Id { get; set; }
    public string Unit { get; set; }
    public int? LocationId { get; set; }
    public int UserId { get; set; }
}
