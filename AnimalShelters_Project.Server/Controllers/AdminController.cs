using AnimalShelters_Project.Server.DTOs;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

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
        public IActionResult GetAnimals()
        {

            var animals = _context.Animals.ToList();
            if (animals != null)
            {

                return Ok(animals);
            }
            return NoContent();

        }


        [HttpGet("AnimalsbyCategoryId/{id}")]

        public IActionResult AnimalsCat(int id)
        {

            var animals = _context.Animals.Where(a => a.CategoryId == id).ToList();

            if (id <= 0)
            {
                return BadRequest();

            }
            if (animals != null)
            {
                return Ok(animals);

            }

            return NotFound();


        }

        [HttpPost("addAnimals")]
        public IActionResult addAnimal([FromForm] AnimalDto animal)
        {


            if (animal.ImageUrl != null && animal.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");



                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + animal.ImageUrl.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    animal.ImageUrl.CopyToAsync(fileStream);
                }



                var newAnimal = new Animal
                {
                    Name = animal.Name,
                    CategoryId = animal.CategoryId,
                    Breed = animal.Breed,
                    Age = animal.Age,
                    ShelterId = animal.ShelterId,
                    Size = animal.Size,
                    Temperament = animal.Temperament,
                    SpecialNeeds = animal.SpecialNeeds,
                    ImageUrl = $"/images/{uniqueFileName}",
                    AdoptionStatus = animal.AdoptionStatus
                };

                _context.Animals.Add(newAnimal);
                _context.SaveChanges();
                return Ok(newAnimal);
            }


        
            
            return BadRequest("Invalid data or missing image.");
        }


            [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory()
        {

            var categorys = _context.Categories.ToList();
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
