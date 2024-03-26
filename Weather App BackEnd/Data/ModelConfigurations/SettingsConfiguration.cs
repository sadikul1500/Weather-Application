using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Data.ModelConfigurations;

public class SettingsConfiguration : IEntityTypeConfiguration<SettingsEntity>
{
    public void Configure(EntityTypeBuilder<SettingsEntity> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Unit).IsRequired();

        builder.HasOne(s => s.Location)
            .WithMany(l => l.Settings)
            .HasForeignKey(s => s.LocationId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_Settings_Location");
        
        builder.Property(s => s.LocationId).IsRequired(false);

        builder.HasOne(s => s.User)
            .WithOne(l => l.Settings)
            .HasForeignKey<SettingsEntity>(s => s.UserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_Settings_User");
    }
}
