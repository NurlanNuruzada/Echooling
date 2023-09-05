using Ecooling.Domain.Entites;

namespace Ecooling.Domain.Entities
{
    public class CourseAppUser : BaseEntity
    {
        public Guid AppUserId { get; set; }
        public Guid CourseId { get; set; }
        public AppUser AppUser { get; set; }
        public Course Course { get; set; }
    }
}
