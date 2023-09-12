using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCourseAndEventCategorye : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventCategoryId",
                table: "Events");

            migrationBuilder.AddColumn<Guid>(
                name: "EventCategoryiesGuId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventCategoryiesGuId",
                table: "Events",
                column: "EventCategoryiesGuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesGuId",
                table: "Events",
                column: "EventCategoryiesGuId",
                principalTable: "EventCategoryies",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryiesGuId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventCategoryiesGuId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EventCategoryiesGuId",
                table: "Events");

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventCategoryId",
                table: "Events",
                column: "EventCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryId",
                table: "Events",
                column: "EventCategoryId",
                principalTable: "EventCategoryies",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
