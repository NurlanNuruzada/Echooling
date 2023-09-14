using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class AddedEventImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "orginazer",
                table: "Events",
                newName: "Orginazer");

            migrationBuilder.AlterColumn<string>(
                name: "ImageRoutue",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Orginazer",
                table: "Events",
                newName: "orginazer");

            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageRoutue",
                table: "Events",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
