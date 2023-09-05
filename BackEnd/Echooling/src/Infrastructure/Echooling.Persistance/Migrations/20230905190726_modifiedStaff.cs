using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class modifiedStaff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Events_eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AppUserID",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "AppUserEvents",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    eventsId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AppUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AppUserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserEvents", x => x.GuId);
                    table.ForeignKey(
                        name: "FK_AppUserEvents_AspNetUsers_AppUserId1",
                        column: x => x.AppUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppUserEvents_Events_eventsId",
                        column: x => x.eventsId,
                        principalTable: "Events",
                        principalColumn: "GuId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserEvents_AppUserId1",
                table: "AppUserEvents",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserEvents_eventsId",
                table: "AppUserEvents",
                column: "eventsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserEvents");

            migrationBuilder.AddColumn<Guid>(
                name: "AppUserID",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "eventsGuId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_eventsGuId",
                table: "AspNetUsers",
                column: "eventsGuId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Events_eventsGuId",
                table: "AspNetUsers",
                column: "eventsGuId",
                principalTable: "Events",
                principalColumn: "GuId");
        }
    }
}
