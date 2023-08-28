using Echooling.API.Middlewares;
using Echooling.Persistance;
using Echooling.Persistance.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Echooling.Infrastructure;
using Microsoft.Extensions.Localization;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.addPersistanceServices();
builder.Services.AddScoped<AppDbContextInitializer>();
builder.Services.AddLocalization();
List<CultureInfo> cultures = new() {
    new CultureInfo("es-ES"),
    new CultureInfo("eN-US"),
    new CultureInfo("ru-RU"),
};
RequestLocalizationOptions localizationOptions = new()
{
    ApplyCurrentCultureToResponseHeaders = true,
    SupportedCultures = cultures,
    SupportedUICultures = cultures
};
localizationOptions.SetDefaultCulture("en-US");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecurityKey"])),
        LifetimeValidator = (_, expire, _, _) => expire > DateTime.UtcNow,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddInfrastuctureServices();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseRequestLocalization(localizationOptions);
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
