using Microsoft.EntityFrameworkCore;
using TodoListAPI.Model;

namespace TodoListAPI.Data
{
    public class TodoListDbContext: DbContext
    {
        public TodoListDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Item> Items { get; set; }
    }
}
