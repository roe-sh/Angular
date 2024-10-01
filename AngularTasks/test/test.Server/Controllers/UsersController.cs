using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test.Server.DTO;
using test.Server.Models;
using test.Server.Services;

namespace test.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly PasswordHasher _passwordHasher;

        public UsersController(MyDbContext context, PasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }


        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        // POST: api/Users/Register
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterModel model)
        {
            // Check if the username or email already exists
            if (_context.Users.Any(u => u.Email == model.Email || u.Username == model.Username))
            {
                return Conflict(new { message = "User with this username or email already exists." });
            }

            // Create password hash and salt
            _passwordHasher.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            // Create new user object
            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                CreatedAt = DateTime.UtcNow,
                Role = "user",  // Default role
                IsAdmin = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return UserDto (without exposing sensitive information)
            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
          
            };

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        }

        // POST: api/Users/Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Verify password using the custom PasswordHasher
            var isPasswordValid = _passwordHasher.VerifyPasswordHash(loginModel.Password, user.PasswordHash, user.PasswordSalt);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Return UserDto (without exposing sensitive information)
            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
            
            };

            return Ok(new { message = "Login successful.", user = userDto });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            // Return UserDto (without exposing sensitive information)
            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
           
             
            };

            return Ok(userDto);
        }
    }
}
