using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherAppAPI.Migrations
{
    public partial class LocationNullableInSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Location",
                table: "Settings");

            migrationBuilder.DropForeignKey(
                name: "FK_Settings_User",
                table: "Settings");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Location",
                table: "Settings",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_User",
                table: "Settings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Location",
                table: "Settings");

            migrationBuilder.DropForeignKey(
                name: "FK_Settings_User",
                table: "Settings");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Location",
                table: "Settings",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_User",
                table: "Settings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
