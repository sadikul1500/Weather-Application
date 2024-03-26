using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data.ModelConfigurations;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Data;

public class WeatherAppAPIDbContext: DbContext
{
    public WeatherAppAPIDbContext(DbContextOptions<WeatherAppAPIDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new UserConfiguration());
        builder.ApplyConfiguration(new LocationConfiguration());
        builder.ApplyConfiguration(new SettingsConfiguration());
        builder.ApplyConfiguration(new ProfileConfiguration());
    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<LocationEntity> Locations { get; set; }
    public DbSet<SettingsEntity> Settings { get; set; }
    public DbSet<ProfileEntity> Profiles { get; set; }
}
