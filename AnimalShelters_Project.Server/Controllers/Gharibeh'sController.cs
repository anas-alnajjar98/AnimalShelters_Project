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


    }
}
