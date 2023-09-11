using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCourseAndEventCategoryes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseAppUsers_Courses_CourseId",
                table: "CourseAppUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppUserID",
                table: "TeacherDetails",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "EventCategoryId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CourseCategoryId",
                table: "Courses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "CourseId",
                table: "CourseAppUsers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppUserId",
                table: "CourseAppUsers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "CourseCategories",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCategories", x => x.GuId);
                });

            migrationBuilder.CreateTable(
                name: "EventCategoryies",
                columns: table => new
                {
                    GuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventCategoryies", x => x.GuId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventCategoryId",
                table: "Events",
                column: "EventCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseAppUsers_Courses_CourseId",
                table: "CourseAppUsers",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryId",
                table: "Events",
                column: "EventCategoryId",
                principalTable: "EventCategoryies",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseAppUsers_Courses_CourseId",
                table: "CourseAppUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventCategoryies_EventCategoryId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "CourseCategories");

            migrationBuilder.DropTable(
                name: "EventCategoryies");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventCategoryId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "EventCategoryId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CourseCategoryId",
                table: "Courses");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppUserID",
                table: "TeacherDetails",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CourseId",
                table: "CourseAppUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AppUserId",
                table: "CourseAppUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseAppUsers_Courses_CourseId",
                table: "CourseAppUsers",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
