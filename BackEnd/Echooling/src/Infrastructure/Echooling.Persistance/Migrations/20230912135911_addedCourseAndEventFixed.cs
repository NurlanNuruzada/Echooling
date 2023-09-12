using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCourseAndEventFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesGuId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EventCategoryId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "EventCategoryiesGuId",
                table: "Events",
                newName: "EventCategoryiesId");

            migrationBuilder.RenameIndex(
                name: "IX_Events_EventCategoryiesGuId",
                table: "Events",
                newName: "IX_Events_EventCategoryiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesId",
                table: "Events",
                column: "EventCategoryiesId",
                principalTable: "EventCategoryies",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "EventCategoryiesId",
                table: "Events",
                newName: "EventCategoryiesGuId");

            migrationBuilder.RenameIndex(
                name: "IX_Events_EventCategoryiesId",
                table: "Events",
                newName: "IX_Events_EventCategoryiesGuId");

            migrationBuilder.AddColumn<Guid>(
                name: "EventCategoryId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesGuId",
                table: "Events",
                column: "EventCategoryiesGuId",
                principalTable: "EventCategoryies",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
