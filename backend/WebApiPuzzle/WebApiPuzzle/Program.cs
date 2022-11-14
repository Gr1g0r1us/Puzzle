using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using WebApiPuzzle;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PuzzleContext>(option =>
{
	option.UseNpgsql(builder.Configuration.GetConnectionString("PuzzleAppConn"));
});

builder.Services.AddCors(c =>
{
	c.AddPolicy("AllowOrigin", options => options.
	AllowAnyOrigin().
	AllowAnyMethod().
	AllowAnyHeader());
});

builder.Services.AddControllersWithViews()
	.AddNewtonsoftJson(options =>
	options.SerializerSettings.ReferenceLoopHandling = Newtonsoft
	.Json.ReferenceLoopHandling.Ignore)
	.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
	= new DefaultContractResolver());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(
		Path.Combine(Directory.GetCurrentDirectory(), "Arts")),
	RequestPath = "/Arts"
});


app.Run();
