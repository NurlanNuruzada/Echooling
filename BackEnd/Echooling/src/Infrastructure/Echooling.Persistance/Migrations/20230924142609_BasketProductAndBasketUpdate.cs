using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Echooling.Persistance.Migrations
{
    public partial class BasketProductAndBasketUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketProduct_Events_EventsId",
                table: "BasketProduct");

            migrationBuilder.AlterColumn<Guid>(
                name: "EventsId",
                table: "BasketProduct",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketProduct_Events_EventsId",
                table: "BasketProduct",
                column: "EventsId",
                principalTable: "Events",
                principalColumn: "GuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketProduct_Events_EventsId",
                table: "BasketProduct");

            migrationBuilder.AlterColumn<Guid>(
                name: "EventsId",
                table: "BasketProduct",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BasketProduct_Events_EventsId",
                table: "BasketProduct",
                column: "EventsId",
                principalTable: "Events",
                principalColumn: "GuId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
