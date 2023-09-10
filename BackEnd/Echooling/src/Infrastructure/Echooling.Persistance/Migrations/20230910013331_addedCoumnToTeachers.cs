using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCoumnToTeachers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "userKnowledge",
                table: "TeacherDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userKnowledge",
                table: "TeacherDetails");
        }
    }
}
