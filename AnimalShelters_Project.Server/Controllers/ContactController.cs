using AnimalShelters_Project.Server.DTOs.TuqaDTOs;
using AnimalShelters_Project.Server.Models;
using AnimalShelters_Project.Server.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly MyDbContext _db;
        private readonly EmailService _emailService;

        public ContactController(MyDbContext db, EmailService emailService)

        {
            _db = db;
            _emailService = emailService;

        }

        [HttpPost("sendContactMessage")]
        public async Task<IActionResult> SendContactMessage([FromForm] ContactDTO contactForm)
        {
            if (contactForm == null) return BadRequest("Empty form");

            var newMessage = new Contact
            {
                Name = contactForm.Name,
                Email = contactForm.Email,
                Message = contactForm.Message,
                Reply = "no reply"
            };

            _db.Contacts.Add(newMessage);
            await _db.SaveChangesAsync(); // Make the database save operation asynchronous

            await _emailService.SendEmailAsync(contactForm.Email, "Contact Received", "Thank you for reaching out to us.");

            return Ok(new { message = "Email sent successfully" });
        }


        [HttpPost("replyToContacts/{contactId}")]
        public async Task<IActionResult> ReplyToContacts(int contactId, [FromForm] ReplyFormDto replyForm)
        {
            if (replyForm == null) return BadRequest("Empty form");
            if (contactId <= 0) return BadRequest("Invalid contact ID");

            var contact = _db.Contacts.FirstOrDefault(a => a.Id == contactId);
            if (contact == null) return NotFound("Contact not found");

            contact.Reply = replyForm.Message;

            _db.Contacts.Update(contact);
            _db.SaveChanges();

            await _emailService.SendEmailAsync(contact.Email, replyForm.Subject, replyForm.Message);

            return Ok(new { message = "Reply sent successfully" });
        }

        [HttpGet("getAllContactMessages")]
        public IActionResult GetAllContactMessages()
        {
            var messages = _db.Contacts.ToArray();
            if (messages.Length == 0) return NotFound("No contact messages found");

            return Ok(messages);
        }

        [HttpGet("getContactMessageById/{contactId}")]
        public IActionResult GetContactMessageById(int contactId)
        {
            if (contactId <= 0) return BadRequest("Invalid ID");

            var contact = _db.Contacts.FirstOrDefault(x => x.Id == contactId);
            if (contact == null) return NotFound("Message not found");

            return Ok(contact);
        }

        private void SendEmail(string recipientEmail, string subject, string body)
        {
            Console.WriteLine($"Email sent to {recipientEmail} with subject '{subject}' and body '{body}'");
        }
    }
}
