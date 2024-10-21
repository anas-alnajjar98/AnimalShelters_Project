using AnimalShelters_Project.Server.DTOs.GharibehDtos;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Gharibeh_sController : ControllerBase
    {
        private readonly MyDbContext _db;
        public Gharibeh_sController(MyDbContext db)
        {
            _db = db;
        }


        // add post from form api
        [HttpPost("addPost")]
        public async Task<IActionResult> addPost([FromForm] PostFormDto postForm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, postForm.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                await postForm.Image.CopyToAsync(stream);

            }
            var post = new Post
            {
                UserId = postForm.UserId,
                Content = postForm.Content,
                Image = postForm.Image.FileName,
                Title = postForm.Title,

            };
            _db.Posts.Add(post);
            _db.SaveChanges();
            return Ok(post);

        }



    }
}
