using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCascadedeleteEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff");

            migrationBuilder.AddForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff",
                column: "eventsId",
                principalTable: "Events",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff");

            migrationBuilder.AddForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff",
                column: "eventsId",
                principalTable: "Events",
                principalColumn: "GuId");
        }
    }
}
