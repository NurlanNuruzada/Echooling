using Echooling.Persistance.Configurations;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Echooling.Persistance.Contexts;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Slider> Sliders { get; set; } = null!;
    public DbSet<teacherDetails> TeacherDetails { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;
    public DbSet<CourseAppUser> CourseAppUsers { get; set; } = null!;
    public DbSet<events> Events { get; set; } = null!;
    public DbSet<Staff> Staff {  get; set; } = null!;   
    public DbSet<StaffEvents> EventStaff {  get; set; } = null!;   
    public DbSet<AppUserEvents> AppUserEvents {  get; set; } = null!;   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SliderConfiguration).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}


