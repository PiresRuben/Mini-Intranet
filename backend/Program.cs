var builder = WebApplication.CreateBuilder(args);

// Controller
builder.Services.AddControllers();

// Swagger (doc auto de l'API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Active Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Active CORS
app.UseCors();

// Branche les Controllers
app.MapControllers();

app.Run();