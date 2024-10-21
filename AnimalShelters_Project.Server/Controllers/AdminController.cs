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
        public IActionResult GetAnimals() { 
        
        var animals=_context.Animals.ToList();
            if (animals!= null)
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

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, animal.ImageUrl.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                animal.ImageUrl.CopyToAsync(stream);

            }

            var newAnimal = new Animal
            {
                Name = animal.Name,
                CategoryId = animal.CategoryId,
                Breed=animal.Breed,
                Age=animal.Age,
                ShelterId= animal.ShelterId,
                Size = animal.Size,
                Temperament = animal.Temperament,
                SpecialNeeds=animal.SpecialNeeds,
                AdoptionStatus = animal.AdoptionStatus
            };

            _context.Animals.Add(newAnimal);
            _context.SaveChanges();
            return Ok(newAnimal);
        }




    }
}
