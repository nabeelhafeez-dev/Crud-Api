using Microsoft.EntityFrameworkCore.Migrations;

namespace Crud_Api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Contact = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    DOJ = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(6)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(16)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employee");
        }
    }
}
