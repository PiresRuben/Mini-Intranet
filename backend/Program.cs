var builder = WebApplication.CreateBuilder(args);

// Ajoute les contrôleurs
builder.Services.AddControllers();

// Ajoute Swagger (doc auto de l'API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Ajoute CORS (pour que React sur le port 3000 puisse appeler l'API)
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

// Branche les contrôleurs
app.MapControllers();

app.Run();