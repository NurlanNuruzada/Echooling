using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedVideoCouseAndVideo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CounrseContent",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "Dutation",
                table: "Courses",
                newName: "Duration");

            migrationBuilder.CreateTable(
                name: "VideoContent",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VideoRoutue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoContent", x => x.GuId);
                });

            migrationBuilder.CreateTable(
                name: "Video_Course",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    VideoContentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Video_Course", x => x.GuId);
                    table.ForeignKey(
                        name: "FK_Video_Course_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "GuId");
                    table.ForeignKey(
                        name: "FK_Video_Course_VideoContent_VideoContentId",
                        column: x => x.VideoContentId,
                        principalTable: "VideoContent",
                        principalColumn: "GuId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Video_Course_CourseId",
                table: "Video_Course",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Video_Course_VideoContentId",
                table: "Video_Course",
                column: "VideoContentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Video_Course");

            migrationBuilder.DropTable(
                name: "VideoContent");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Courses",
                newName: "Dutation");

            migrationBuilder.AddColumn<string>(
                name: "CounrseContent",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
