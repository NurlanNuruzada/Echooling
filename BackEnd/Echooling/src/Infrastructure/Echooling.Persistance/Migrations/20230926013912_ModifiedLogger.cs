using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class ModifiedLogger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeletedEntityName",
                table: "Logger",
                newName: "ActiondEntityName");

            migrationBuilder.RenameColumn(
                name: "DeletedEntityId",
                table: "Logger",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "DeletedById",
                table: "Logger",
                newName: "ActiondEntityId");

            migrationBuilder.RenameColumn(
                name: "DeleteTime",
                table: "Logger",
                newName: "ActionTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Logger",
                newName: "DeletedEntityId");

            migrationBuilder.RenameColumn(
                name: "ActiondEntityName",
                table: "Logger",
                newName: "DeletedEntityName");

            migrationBuilder.RenameColumn(
                name: "ActiondEntityId",
                table: "Logger",
                newName: "DeletedById");

            migrationBuilder.RenameColumn(
                name: "ActionTime",
                table: "Logger",
                newName: "DeleteTime");
        }
    }
}
