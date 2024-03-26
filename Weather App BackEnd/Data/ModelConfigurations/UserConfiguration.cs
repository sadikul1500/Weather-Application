using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Data.ModelConfigurations;

public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Name).IsRequired();
        builder.Property(u => u.Password).IsRequired();
        builder.Property(u => u.Token).IsRequired();

        builder.HasOne(u => u.Settings)
                .WithOne(s => s.User)
                .HasForeignKey<SettingsEntity>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Settings_User");
        
        builder.HasOne(u => u.Profile)
                .WithOne(s => s.User)
                .HasForeignKey<ProfileEntity>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Profile_User");
    }
}

