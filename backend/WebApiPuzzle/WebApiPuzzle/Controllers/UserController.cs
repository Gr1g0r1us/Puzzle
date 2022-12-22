using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.X86;
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

		[HttpPost("checkLogin")]
		public async Task<IActionResult> CheckLogin([FromBody] User userObj)
		{
			if (userObj == null)
			{
				return BadRequest();
			}
			var user = await _context.Users.
				FirstOrDefaultAsync(x => x.Login == userObj.Login);
			if (user != null)
			{
				return NotFound(new
				{
					Message = "Игрок с таким логином уже есть!",
					check = true
				}) ;
			}
			return Ok(new {check = false});
		}

		[HttpPost("authentificate")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if(userObj == null)
			{
				return BadRequest();
			}
			var user1 = await _context.Users.
				FirstOrDefaultAsync(x => x.Login == userObj.Login);

			if(user1 == null)
			{
				return NotFound(new { Message = "Игрок не найден" });
			}
			if(user1.Password != userObj.Password)
			{
				return NotFound(new { Message = "Пароли не совпадают" });
			}

			return Ok(new { Message = "Авторизирован",
							role = user1.Role});

		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterUser([FromBody] User userObj)
		{
			if(userObj == null)
			{
				return BadRequest();
			}
			var user = await _context.Users.
				FirstOrDefaultAsync(x => x.Login == userObj.Login);

			if(user != null)
			{
				return NotFound(new
				{
					Message = "Игрок с таким логином уже есть"
				});
			}
			await _context.Users.AddAsync(userObj);
			await _context.SaveChangesAsync();
			return Ok(new
			{
				Message = "Игрок зарегистрирован"
			});
		}
	}
}
