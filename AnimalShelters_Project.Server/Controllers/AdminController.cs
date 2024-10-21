using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        public AdminController(MyDbContext context)
        {
            _context = context;

        }
        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory() {
        
        var categorys= _context.Categories.ToList();
            if (!categorys.Any()) { return NotFound("no ctaegory in our dataBase"); }
            return Ok(categorys);
        }
        
    }
}
