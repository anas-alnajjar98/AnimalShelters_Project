﻿using AnimalShelters_Project.Server.Helpers;
using AnimalShelters_Project.Server.Models;
using AnimalShelters_Project.Server.Repositories;
using hosam.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context, AuthRepository authRepository)
       : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginDto user)
        {

            var dbuser = context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (dbuser == null || !PasswordHasher.VerifyPasswordHash(user.Password, dbuser.PasswordHash, dbuser.PasswordSalt))
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(dbuser.UserId);
            return Ok(new { token = token, id = dbuser.UserId });
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] UserRegisterDto register)
        {
            if (authRepository.GetUserByEmail(register.Email) != null)
            {
                return Unauthorized("User Email Already exist");
            }
            var user = authRepository.RegisterUser(register);
            return Created();
        }

        [HttpGet("GetUser")]
        [Authorize]
        public IActionResult GetUser()
        {
            return Ok(GetCurrentUser);
        }

        private User GetCurrentUser
        {
            get
            {
                var userId = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = context.Users.Find(userId);
                return user;
            }
        }

        //[HttpGet("all")]
        //public IActionResult GetAllUsers()
        //{
        //    return Ok(authRepository.All());
        //}

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(long id)
        {
            var user = context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPut("EditUser/{id}")]
        public IActionResult EditUser(int id, [FromForm] UserPutDTO edit)
        {
            var user = context.Users.FirstOrDefault(a => a.UserId == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Email = edit.Email;
            user.UserName = edit.Username;
            context.Users.Update(user);
            context.SaveChanges();
            return Ok(user);
        }


        [HttpPut]
        public IActionResult ResetPassword([FromBody] resetPasswordDTO newpass)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == newpass.Email);
            if (user == null)
            {
                return BadRequest();
            }
            byte[] newHash, newSalt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out newHash, out newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;
            context.Users.Update(user);
            context.SaveChanges();
            return Ok(user);
        }


        [HttpPost("Google")]
        public IActionResult RegisterationFromGoogle([FromBody] RegisterGoogleDTO addUser)
        {
            var userfetch = authRepository.GetUserByEmail(addUser.email);

            if (userfetch == null)
            {
                userfetch = authRepository.RegisterUser(new UserRegisterDto
                {
                    Email = addUser.email,
                    Username = addUser.displayName,
                    Password = addUser.uid
                });

            }
            var token = generateJwt.Generate(userfetch.UserId);
            return Ok(new { token });
        }

    }
}
