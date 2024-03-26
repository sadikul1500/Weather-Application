using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Data.ModelConfigurations;

public class LocationConfiguration : IEntityTypeConfiguration<LocationEntity>
{
    public void Configure(EntityTypeBuilder<LocationEntity> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Name).IsRequired();
        builder.Property(u => u.Latitude).IsRequired();
        builder.Property(u => u.Longitude).IsRequired();
    }
}
