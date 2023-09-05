using Ecooling.Domain.Entites;

namespace Ecooling.Domain.Entities
{
    public class CourseAppUser : BaseEntity
    {
        public int AppUserId { get; set; }
        public int CourseId { get; set; }
        public AppUser AppUser { get; set; }
        public Course Course { get; set; }
    }
}
