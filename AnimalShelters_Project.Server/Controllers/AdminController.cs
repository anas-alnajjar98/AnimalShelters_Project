using AnimalShelters_Project.Server.DTOs;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto;
using System.Drawing;
using System.Numerics;

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

        [HttpGet("AnimalsbyShelterId/{id}")]

        public IActionResult AnimalsShelter(int id)
        {

            var animals = _context.Animals.Where(a => a.ShelterId == id).ToList();

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



        [HttpPut("updateAnimals/{id}")]
        public IActionResult updateAnimals(int id, [FromForm] AnimalDto animal)
        {
            var newedit = _context.Animals.Where(p => p.AnimalId == id).FirstOrDefault();

            if (newedit == null)
            {
                return NotFound("Animal not found.");
            }

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
                    animal.ImageUrl.CopyTo(fileStream);
                }

                
                newedit.Name = animal.Name;
                newedit.CategoryId = animal.CategoryId;
                newedit.Breed = animal.Breed;
                newedit.Age = animal.Age;
                newedit.ShelterId = animal.ShelterId;
                newedit.Size = animal.Size;
                newedit.Temperament = animal.Temperament;
                newedit.SpecialNeeds = animal.SpecialNeeds;
                newedit.ImageUrl = $"/images/{uniqueFileName}";
                newedit.AdoptionStatus = animal.AdoptionStatus;

                
                _context.Animals.Update(newedit);
                _context.SaveChanges();

                return Ok(newedit);
            }

            return BadRequest("there is an error in updated animals");
        }

        [HttpDelete("deleteAnimal/{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Where(a => a.AnimalId == id).FirstOrDefault();

            
            if (animal == null)
            {
                return NotFound("Animal not found.");
            }

            _context.Animals.Remove(animal);

            _context.SaveChanges();

            return Ok($"Animal with ID {id} was successfully deleted.");
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



        [HttpGet("/getAllAShelters")]
        public IActionResult GetShelters()
        {

            var shelter = _context.Shelters.ToList();
            if (shelter != null)
            {

                return Ok(shelter);
            }
            return NoContent();

        }


        [HttpPost("addShelters")]
        public IActionResult addShelter([FromForm] ShelterDto shelter)
        {



            var newShelter = new Shelter
            {
                Name= shelter.Name,
                Address= shelter.Address,
                Phone= shelter.Phone,
                Email= shelter.Email,
                Verified= shelter.Verified

            };

            _context.Shelters.Add(newShelter);
            _context.SaveChanges();
            return Ok(newShelter);
        }




        [HttpPut("updateShelter/{id}")]
        public IActionResult updateShelters(int id, [FromForm] ShelterDto shelter)
        {
            var newedit = _context.Shelters.Where(p => p.ShelterId == id).FirstOrDefault();

            if (newedit == null)
            {
                return NotFound("shelters not found.");
            }

           
               
                newedit.Name = shelter.Name;
               newedit.Address = shelter.Address;
               newedit.Phone = shelter.Phone;
               newedit.Email = shelter.Email;
               newedit.Verified = shelter.Verified;
              
                _context.Shelters.Update(newedit);
                _context.SaveChanges();

                return Ok(newedit);
                   
        }

        [HttpDelete("deleteShelter/{id}")]
        public IActionResult DeleteShelter(int id) {


            var shelter = _context.Shelters.Find(id);

            if (shelter != null)
            {
                var animals = _context.Animals.Where(a => a.ShelterId == id).ToList();

                if (animals.Any())
                {
                    _context.Animals.RemoveRange(animals);
                }

                _context.Shelters.Remove(shelter);
                _context.SaveChanges();

                return NoContent();
            }

            return NotFound($"there is no shelter with id {id}");



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
        [HttpPut("UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id ,[FromForm] AddCategoryDto upd) {
            if (id <= 0) { BadRequest("ID can't be less or equal 0"); }
            var Category = _context.Categories.FirstOrDefault(x => x.Id == id);
            if (Category == null) {
                return NotFound("no category under this id");
            }
            if (upd.Image != null && upd.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");



                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + upd.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    await upd.Image.CopyToAsync(fileStream);
                }
                Category.Image = $"/images/{uniqueFileName}";
                Category.Species = upd.Species ?? Category.Species;
                await _context.SaveChangesAsync();
                return Ok(Category);
            }
            else
            {
                Category.Image = Category.Image;
                Category.Species = upd.Species ?? Category.Species;
                await _context.SaveChangesAsync();
                return Ok(Category);
            }
         

        }
        [HttpDelete("DeletCategoryById/{id}")]
        public async Task<IActionResult> DeletCategoryById(int id) {
            if (id <= 0) { return BadRequest("id can't be zero or less"); }
            var category=_context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null) { return NotFound("no category found "); }
            _context.Categories.Remove(category);
            _context.SaveChanges();
            return Ok(category);
        }
    }
}