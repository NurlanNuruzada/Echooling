using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class modifiedAppuserRelationswithTeacher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "teacherDetailsGuId",
                table: "Course",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "teacherDetailsId",
                table: "Course",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Course_teacherDetailsGuId",
                table: "Course",
                column: "teacherDetailsGuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_teacherDetails_teacherDetailsGuId",
                table: "Course",
                column: "teacherDetailsGuId",
                principalTable: "teacherDetails",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_teacherDetails_teacherDetailsGuId",
                table: "Course");

            migrationBuilder.DropIndex(
                name: "IX_Course_teacherDetailsGuId",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "teacherDetailsGuId",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "teacherDetailsId",
                table: "Course");
        }
    }
}
