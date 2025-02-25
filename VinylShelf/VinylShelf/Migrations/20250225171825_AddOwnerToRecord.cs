using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VinylShelf.Migrations
{
    /// <inheritdoc />
    public partial class AddOwnerToRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Records",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Records_OwnerId",
                table: "Records",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Records_AspNetUsers_OwnerId",
                table: "Records",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Records_AspNetUsers_OwnerId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_OwnerId",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Records");
        }
    }
}
