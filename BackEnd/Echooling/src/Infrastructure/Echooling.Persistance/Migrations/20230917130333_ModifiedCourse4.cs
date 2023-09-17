using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class ModifiedCourse4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId");
        }
    }
}
