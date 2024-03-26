namespace WeatherAppAPI.Model.EntityModel;
public class ProfileEntity
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

    public int UserId { get; set; }
    public virtual UserEntity User { get; set; }
}
