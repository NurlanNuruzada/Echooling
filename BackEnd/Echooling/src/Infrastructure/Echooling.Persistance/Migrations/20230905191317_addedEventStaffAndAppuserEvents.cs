using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedEventStaffAndAppuserEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffEvents_Events_eventsId",
                table: "StaffEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffEvents_staff_StaffId",
                table: "StaffEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_staff",
                table: "staff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StaffEvents",
                table: "StaffEvents");

            migrationBuilder.RenameTable(
                name: "staff",
                newName: "Staff");

            migrationBuilder.RenameTable(
                name: "StaffEvents",
                newName: "EventStaff");

            migrationBuilder.RenameIndex(
                name: "IX_StaffEvents_StaffId",
                table: "EventStaff",
                newName: "IX_EventStaff_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_StaffEvents_eventsId",
                table: "EventStaff",
                newName: "IX_EventStaff_eventsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Staff",
                table: "Staff",
                column: "GuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventStaff",
                table: "EventStaff",
                column: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff",
                column: "eventsId",
                principalTable: "Events",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventStaff_Staff_StaffId",
                table: "EventStaff",
                column: "StaffId",
                principalTable: "Staff",
                principalColumn: "GuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventStaff_Events_eventsId",
                table: "EventStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_EventStaff_Staff_StaffId",
                table: "EventStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Staff",
                table: "Staff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventStaff",
                table: "EventStaff");

            migrationBuilder.RenameTable(
                name: "Staff",
                newName: "staff");

            migrationBuilder.RenameTable(
                name: "EventStaff",
                newName: "StaffEvents");

            migrationBuilder.RenameIndex(
                name: "IX_EventStaff_StaffId",
                table: "StaffEvents",
                newName: "IX_StaffEvents_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_EventStaff_eventsId",
                table: "StaffEvents",
                newName: "IX_StaffEvents_eventsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_staff",
                table: "staff",
                column: "GuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StaffEvents",
                table: "StaffEvents",
                column: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffEvents_Events_eventsId",
                table: "StaffEvents",
                column: "eventsId",
                principalTable: "Events",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffEvents_staff_StaffId",
                table: "StaffEvents",
                column: "StaffId",
                principalTable: "staff",
                principalColumn: "GuId");
        }
    }
}
