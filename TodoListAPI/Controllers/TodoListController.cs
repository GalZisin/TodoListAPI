using DatingAppAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.Data;
using TodoListAPI.Model;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListController : ControllerBase
    {

        private readonly TodoListDbContext todoListDbContext;

        public TodoListController(TodoListDbContext todoListDbContext)
        {
            this.todoListDbContext = todoListDbContext;
        }

        /// <summary>
        /// Get all Items
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await todoListDbContext.Items.ToArrayAsync();
            return Ok(items);
        }

        /// <summary>
        /// Get Item
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetItem")]
        public async Task<IActionResult> GetItem([FromRoute] Guid id)
        {
            var item = await todoListDbContext.Items.FirstOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                return Ok(item);
            }
            return NotFound("Item Not Found");
        }

        /// <summary>
        /// Add Item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> addItem([FromBody] Item item)
        {  
                item.Id = Guid.NewGuid();
                await todoListDbContext.Items.AddAsync(item);
                await todoListDbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        /// <summary>
        /// Update Item
        /// </summary>
        /// <param name="id"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateItem([FromRoute] Guid id, [FromBody] Item item)
        //public async Task<IActionResult> UpdateItem([FromBody] Item item)
        {
            var existingItem = await todoListDbContext.Items.FirstOrDefaultAsync(x => x.Id == id);

            if (existingItem != null)
            {
                existingItem.Title = item.Title;
           

                await todoListDbContext.SaveChangesAsync();
                return Ok(existingItem);
            }
            return NotFound("Item Not Found");
        }

        /// <summary>
        /// Delete Item
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            var existingItem = await todoListDbContext.Items.FirstOrDefaultAsync(x => x.Id == id);

            if (existingItem != null)
            {
                todoListDbContext.Remove(existingItem);
                await todoListDbContext.SaveChangesAsync();
                return Ok(existingItem);
            }
            return NotFound("Item Not Found");
        }
    }
}
