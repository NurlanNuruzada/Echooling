using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedAboutmeStaffAndteacher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "profecion",
                table: "TeacherDetails",
                newName: "profession");

            migrationBuilder.RenameColumn(
                name: "profecion",
                table: "Staff",
                newName: "profession");

            migrationBuilder.AddColumn<string>(
                name: "AboutMe",
                table: "TeacherDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Fullname",
                table: "TeacherDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "TeacherDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AboutMe",
                table: "Staff",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutMe",
                table: "TeacherDetails");

            migrationBuilder.DropColumn(
                name: "Fullname",
                table: "TeacherDetails");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "TeacherDetails");

            migrationBuilder.DropColumn(
                name: "AboutMe",
                table: "Staff");

            migrationBuilder.RenameColumn(
                name: "profession",
                table: "TeacherDetails",
                newName: "profecion");

            migrationBuilder.RenameColumn(
                name: "profession",
                table: "Staff",
                newName: "profecion");
        }
    }
}
