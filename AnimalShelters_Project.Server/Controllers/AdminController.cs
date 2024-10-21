using AnimalShelters_Project.Server.DTOs;
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
        [HttpGet("/getAllAnimals")]
        public IActionResult GetAnimals() { 
        
        var animals=_context.Animals.ToList();
            if (animals!= null)
            {

                return Ok(animals);
            }
            return NoContent();
        
        }
        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory() {
        
        var categorys= _context.Categories.ToList();
            if (!categorys.Any()) { return NotFound("no ctaegory in our dataBase"); }
            return Ok(categorys);
        }
        [HttpPost("AddNewCategory")]
        public async Task<IActionResult> AddNewCategory([FromForm] AddCategoryDto add)
        {

            if (add.Image != null && add.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.Image.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.Image.CopyToAsync(fileStream);
                    }


                    var cat = new Category
                    {

                        Image = $"/images/{uniqueFileName}",
                        Species = add.Species

                    };


                    _context.Categories.Add(cat);
                    await _context.SaveChangesAsync();

                    return Ok(cat);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }

            }
            return BadRequest("Invalid data or missing image.");
        }

    }
}
