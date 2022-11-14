using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiPuzzle.Models;

namespace WebApiPuzzle.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly PuzzleContext _context;
		public UserController(PuzzleContext context)
		{
			_context = context;
		}

		[HttpPost("authentificate")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if(userObj == null)
			{
				return BadRequest();
			}
			var user1 = await _context.Users.
				FirstOrDefaultAsync(x => x.Login == userObj.Login && x.Password == userObj.Password);

			if(user1 == null)
			{
				return NotFound(new { Message = "User not found" });
			}

			return Ok(new { Message = "Login Success"});

		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterUser([FromBody] User userObj)
		{
			if(userObj == null)
			{
				return BadRequest();
			}

			await _context.Users.AddAsync(userObj);
			await _context.SaveChangesAsync();
			return Ok(new
			{
				Message = "User register"
			});
		}
	}
}
