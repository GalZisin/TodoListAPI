using System.ComponentModel.DataAnnotations;

namespace TodoListAPI.Model
{
    public class Item
    {
        [Key]
        [Required]
        public Guid? Id { get; set; }
        public string? Title { get; set; }
    }
}
