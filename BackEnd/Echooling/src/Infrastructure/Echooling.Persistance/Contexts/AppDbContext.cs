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
    public DbSet<Course_AppUser> CourseAppUsers { get; set; } = null!;
    public DbSet<events> Events { get; set; } = null!;
    public DbSet<Staff> Staff { get; set; } = null!;
    public DbSet<Staff_Events> EventStaff { get; set; } = null!;
    public DbSet<AppUser_Events> AppUserEvents { get; set; } = null!;
    public DbSet<CourseCategories> CourseCategories { get; set; } = null!;
    public DbSet<EventCategoryies> EventCategoryies { get; set; } = null!;
    public DbSet<TeacherDetails_Courses> TeachersCourses { get; set; } = null!;
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
        
        modelBuilder.Entity<events>()
            .HasMany<Staff_Events>(e => e.StaffEvents)
            .WithOne(cc => cc.events)
            .HasForeignKey(e => e.eventsId)
            .OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<teacherDetails>()
          .HasMany<TeacherDetails_Courses>(e => e.TeacherDetailsCourses)
          .WithOne(cc => cc.teacherDetails)
          .HasForeignKey(e => e.teacherDetailsId)
          .OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);

    }
}


