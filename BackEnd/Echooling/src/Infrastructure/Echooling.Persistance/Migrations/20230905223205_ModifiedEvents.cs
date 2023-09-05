using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class ModifiedEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventEndDate",
                table: "Events");

            migrationBuilder.AddColumn<DateTime>(
                name: "EventFinishDate",
                table: "Events",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventFinishDate",
                table: "Events");

            migrationBuilder.AddColumn<string>(
                name: "EventEndDate",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
