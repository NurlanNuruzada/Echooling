using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class addedCourseTeahers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_Courses_CourseId",
                table: "TeacherDetailsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherDetailsCourses_TeacherDetails_teacherDetailsId",
                table: "TeacherDetailsCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherDetailsCourses",
                table: "TeacherDetailsCourses");

            migrationBuilder.RenameTable(
                name: "TeacherDetailsCourses",
                newName: "TeachersCourses");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherDetailsCourses_teacherDetailsId",
                table: "TeachersCourses",
                newName: "IX_TeachersCourses_teacherDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherDetailsCourses_CourseId",
                table: "TeachersCourses",
                newName: "IX_TeachersCourses_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeachersCourses",
                table: "TeachersCourses",
                column: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "GuId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachersCourses_TeacherDetails_teacherDetailsId",
                table: "TeachersCourses",
                column: "teacherDetailsId",
                principalTable: "TeacherDetails",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeachersCourses_Courses_CourseId",
                table: "TeachersCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_TeachersCourses_TeacherDetails_teacherDetailsId",
                table: "TeachersCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeachersCourses",
                table: "TeachersCourses");

            migrationBuilder.RenameTable(
                name: "TeachersCourses",
                newName: "TeacherDetailsCourses");

            migrationBuilder.RenameIndex(
                name: "IX_TeachersCourses_teacherDetailsId",
                table: "TeacherDetailsCourses",
                newName: "IX_TeacherDetailsCourses_teacherDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_TeachersCourses_CourseId",
                table: "TeacherDetailsCourses",
                newName: "IX_TeacherDetailsCourses_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherDetailsCourses",
                table: "TeacherDetailsCourses",
                column: "GuId");

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
    }
}
