﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System.Diagnostics;
using System.IO;
using System.Reflection.Emit;
using System.Runtime.Intrinsics.X86;
using WebApiPuzzle.Models;

namespace WebApiPuzzle.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly PuzzleContext _context;
		private readonly IWebHostEnvironment _webHostEnvironment;
		public UserController(PuzzleContext context, IWebHostEnvironment webHostEnvironment)
		{
			_context = context;
			_webHostEnvironment = webHostEnvironment;

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
				});
			}
			return Ok(new { check = false });
		}

		[HttpPost("authentificate")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if (userObj == null)
			{
				return BadRequest();
			}
			var user1 = await _context.Users.
				FirstOrDefaultAsync(x => x.Login == userObj.Login);

			if (user1 == null)
			{
				return NotFound(new { Message = "Игрок не найден" });
			}
			if (user1.Password != userObj.Password)
			{
				return NotFound(new { Message = "Пароли не совпадают" });
			}

			return Ok(new { Message = "Авторизирован",
				role = user1.Role });

		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterUser([FromBody] User userObj)
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

		[HttpPost("createPuzzle")]
		public async Task<IActionResult> CreatePuzzle([FromBody] Puzzle puzzle)
		{
			if (puzzle == null)
			{
				return BadRequest();
			}
			var puzzles = await _context.Puzzles.
				FirstOrDefaultAsync(x => x.NamePuzzle == puzzle.NamePuzzle);

			if (puzzles != null)
			{
				return NotFound(new
				{
					Message = "Пазл с таким именем уже есть"
				});
			}

			await _context.Puzzles.AddAsync(puzzle);
			await _context.SaveChangesAsync();

			return Ok(new
			{
				Message = "Пазл создан"
			});
		}

		[HttpPost("deletePuzzle")]
		public async Task<IActionResult> DeletePuzzle([FromBody] Puzzle puzzle)
		{
			if (puzzle == null)
			{
				return BadRequest();
			}

			var puzzles = await _context.Puzzles.
				FirstOrDefaultAsync(x => x.IdPuzzle == puzzle.IdPuzzle);

			if (puzzles == null)
			{
				return NotFound(new
				{
					Message = "Пазл не найден"
				});
			}

			_context.Puzzles.Remove(puzzles);
			await _context.SaveChangesAsync();

			return Ok(new
			{
				Message = "Пазл удален"
			});
		}

		[HttpPost("getPuzzles")]
		public async Task<IActionResult> GetPuzzles()
		{
			var puzzles = _context.Puzzles.ToList();

			return Ok(puzzles);
		}

		[HttpPost("getLevels")]
		public async Task<IActionResult> GetLevels()
		{
			var levels = _context.Levels.ToList();

			return Ok(levels);
		}

		[HttpPost("setLevel")]
		public async Task<IActionResult> SetLevel([FromBody] Level level)
		{

			if (level == null)
			{
				return BadRequest();
			}

			var lvl = await _context.Levels.
				FirstOrDefaultAsync(x => x.IdLevel == level.IdLevel);

			if (lvl == null)
			{
				return NotFound(new
				{
					Message = "Уровень не найден"
				});
			}
			lvl.Weight = level.Weight;
			lvl.Height = level.Height;

			_context.Levels.Update(lvl);
			await _context.SaveChangesAsync();

			return Ok(new
			{
				Message = "Уровень изменен"
			});
		}

		[HttpPost("getpuzzleLevel")]
		public async Task<IActionResult> GetPuzzleLevel([FromBody] Puzzle puzzle)
		{


			if (puzzle == null)
			{
				return BadRequest();
			}

			var puzzles = await _context.Puzzles.
				FirstOrDefaultAsync(x => x.IdPuzzle == puzzle.IdPuzzle);

			if (puzzles == null)
			{
				return NotFound(new
				{
					Message = "Пазл не найден"
				});
			}

			var level = _context.Levels.FirstOrDefaultAsync(x => puzzle.IdLevel == x.IdLevel);


			return Ok(new
			{
				//level.Result.IdLevel,
				Weight = level.Result.Weight,
				Height = level.Result.Height
			});
		}

		[HttpPost("getpuzzleArt")]
		public async Task<IActionResult> GetPuzzleArt([FromBody] Puzzle puzzle)
		{
			if (puzzle == null)
			{
				return BadRequest();
			}

			var puzzles = await _context.Puzzles.
				FirstOrDefaultAsync(x => x.IdPuzzle == puzzle.IdPuzzle);

			if (puzzles == null)
			{
				return NotFound(new
				{
					Message = "Пазл не найден"
				});
			}
			var art = puzzle.IdArt;

			var physicalPath = _webHostEnvironment.ContentRootPath + "/Arts/";

			DirectoryInfo dir = new DirectoryInfo(physicalPath);

			var files = dir.GetFiles(art);	

			


			return Ok(new
			{
				IdArt = files.ToList().FirstOrDefault().Name,
				base64 = Convert.ToBase64String(System.IO.File.ReadAllBytes(files.ToList().FirstOrDefault().FullName))
			});
		}

		[HttpPost("saveart")]
		public async Task<IActionResult> SaveArt([FromBody] Image img)
		{
			var downloadPath = "C:\\Users\\lisya\\Downloads\\" + img.IdArt;

			var frontPath = @"D:\Study\Magistr\ZelenkoLS\project\Puzzle\WebUI\src\assets\imgs";
			//fileName = file.ToString();
			var physicalPath = _webHostEnvironment.ContentRootPath + "/Arts/"+ img.IdArt;

			FileInfo fileInf = new FileInfo(downloadPath);

			if (fileInf.Exists)
			{
				fileInf.CopyTo(physicalPath, true);
				fileInf.CopyTo(frontPath, true);
			}
			/*using (var stream = new FileStream(physicalPath, FileMode.Create))
			{
				postedFile.CopyTo(stream);
			}*/
			return Ok(new
			{
				Message = "done"
			});
		}

		[HttpPost("addart")]
		public async Task<IActionResult> AddArt([FromBody] Image img)
		{
			try
			{
				var physicalPath = _webHostEnvironment.ContentRootPath + "/Arts/" + img.IdArt;

				System.IO.File.Delete(physicalPath);


				return new JsonResult(img);
			}
			catch (Exception)
			{
				return new JsonResult("fail");
			}
		}

		[HttpPost("deleteart")]
		public async Task<IActionResult> DeleteArt([FromBody] Image img)
		{
			try
			{
				var puzzles = _context.Puzzles.Where(x => x.IdArt == img.IdArt);

				_context.Puzzles.RemoveRange(puzzles);

				var physicalPath = _webHostEnvironment.ContentRootPath + "/Arts/" + img.IdArt;

				System.IO.File.Delete(physicalPath);


				return new JsonResult(img);
			}
			catch (Exception)
			{
				return new JsonResult("fail");
			}
		}

		[Route("getarts")]
		[HttpPost]
		public JsonResult GetArts()
		{
			try
			{
				var physicalPath = _webHostEnvironment.ContentRootPath + "/Arts/";

				DirectoryInfo dir = new DirectoryInfo(physicalPath);
				var files = dir.GetFiles().ToList();

				List<object> ts = new List<object>();

				for(var i = 0; i < files.Count; i++){
					
					ts.Add(new
					{
						IdArt = files[i].Name,
						base64 = Convert.ToBase64String(System.IO.File.ReadAllBytes(files[i].FullName))
				});
				}
				

				return new JsonResult(ts);
			}
			catch (Exception)
			{
				return new JsonResult("fail");
			}

		}
	}
}
