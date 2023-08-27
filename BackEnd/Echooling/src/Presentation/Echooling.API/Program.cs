using Echooling.API.Middlewares;
using Echooling.Persistance;
using Echooling.Persistance.Contexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.addPersistanceServices();
builder.Services.AddScoped<AppDbContextInitializer>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
using (var init = app.Services.CreateScope())
{
    var instance = init.ServiceProvider.GetRequiredService<AppDbContextInitializer>();
    await instance.AppInitializer();
    await instance.RoleSeedAsync();
    await instance.CreateUserSeed();
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.useCustomExceptionHandler();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
