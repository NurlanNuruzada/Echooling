using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedStaffAndEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_Courses_CourseId",
                table: "TeacherDetailsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_TeacherDetails_teacherDetailsId",
                table: "TeacherDetailsCourses");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "TeacherDetails",
                newName: "AppUserID");

            migrationBuilder.AlterColumn<Guid>(
                name: "teacherDetailsId",
                table: "TeacherDetailsCourses",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CourseId",
                table: "TeacherDetailsCourses",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "eventsGuId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Const = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    orginazer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalSlot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventEndDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AboutEvent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.GuId);
                });

            migrationBuilder.CreateTable(
                name: "staff",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    hobbies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    faculty = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalExperianceHours = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastestEvent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventCount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Facebook = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    twitter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    linkedin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    profecion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staff", x => x.GuId);
                });

            migrationBuilder.CreateTable(
                name: "StaffEvents",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StaffId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    eventsId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffEvents", x => x.GuId);
                    table.ForeignKey(
                        name: "FK_StaffEvents_Events_eventsId",
                        column: x => x.eventsId,
                        principalTable: "Events",
                        principalColumn: "GuId");
                    table.ForeignKey(
                        name: "FK_StaffEvents_staff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "staff",
                        principalColumn: "GuId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_eventsGuId",
                table: "AspNetUsers",
                column: "eventsGuId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffEvents_eventsId",
                table: "StaffEvents",
                column: "eventsId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffEvents_StaffId",
                table: "StaffEvents",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Events_eventsGuId",
                table: "AspNetUsers",
                column: "eventsGuId",
                principalTable: "Events",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherDetailsCourses_Courses_CourseId",
                table: "TeacherDetailsCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherDetailsCourses_TeacherDetails_teacherDetailsId",
                table: "TeacherDetailsCourses",
                column: "teacherDetailsId",
                principalTable: "TeacherDetails",
                principalColumn: "GuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Events_eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_Courses_CourseId",
                table: "TeacherDetailsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_TeacherDetails_teacherDetailsId",
                table: "TeacherDetailsCourses");

            migrationBuilder.DropTable(
                name: "StaffEvents");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "staff");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "eventsGuId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "AppUserID",
                table: "TeacherDetails",
                newName: "AppUserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "teacherDetailsId",
                table: "TeacherDetailsCourses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CourseId",
                table: "TeacherDetailsCourses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherDetailsCourses_Courses_CourseId",
                table: "TeacherDetailsCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherDetailsCourses_TeacherDetails_teacherDetailsId",
                table: "TeacherDetailsCourses",
                column: "teacherDetailsId",
                principalTable: "TeacherDetails",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
