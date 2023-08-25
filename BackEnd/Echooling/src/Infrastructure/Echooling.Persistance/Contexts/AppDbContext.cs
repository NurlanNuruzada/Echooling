using Echooling.Persistance.Configurations;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace Echooling.Persistance.Contexts;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Slider> Sliders { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SliderConfiguration).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}


