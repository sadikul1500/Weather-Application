using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Model.EntityModel;

namespace WeatherAppAPI.Data.ModelConfigurations;
public class ProfileConfiguration: IEntityTypeConfiguration<ProfileEntity>
{
    public void Configure(EntityTypeBuilder<ProfileEntity> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.FullName).IsRequired(false);
        builder.Property(u => u.Address).IsRequired(false);
        builder.Property(p => p.Phone).IsRequired(false);
        builder.Property(p => p.Email).IsRequired(false);

        builder.HasOne(u => u.User)
                .WithOne(p => p.Profile)
                .HasForeignKey<ProfileEntity>(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Profile_User");
    }
}
