using Echooling.Persistance.Configurations;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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
    public DbSet<Staff> Staff { get; set; } = null!;
    public DbSet<StaffEvents> EventStaff { get; set; } = null!;
    public DbSet<AppUserEvents> AppUserEvents { get; set; } = null!;
    public DbSet<CourseCategories> CourseCategories { get; set; } = null!;
    public DbSet<EventCategoryies> EventCategoryies { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SliderConfiguration).Assembly);

        // Configure cascade delete for Events and EventCategoryies
        modelBuilder.Entity<events>()
            .HasOne(e => e.EventCategoryies)
            .WithMany(ec => ec.Events)
            .HasForeignKey(e => e.EventCategoryiesId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Course>()
            .HasOne(e => e.CourseCategory)
            .WithMany(cc => cc.Courses)
            .HasForeignKey(e => e.CourseCategoryId)
            .OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);
    }
}


