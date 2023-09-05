using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class teacherDetails:BaseEntity
    {
   
        public ICollection<AppUser>? AppUser { get; set; }
        public ICollection<Course>? CreatedCourses { get; set; }
        public string? hobbies { get; set; }
        public string? faculty { get; set; }
        public string? TotalExperianceHours { get; set; }
        public string? totalOnlineCourseCount { get; set; }
        public string? totalStudentCount { get; set; }
        public string? Facebook { get; set; }
        public string? twitter { get; set; }
        public string? linkedin { get; set; }
        public string? instagram { get; set; }
        public string? profecion { get; set; }
    }
}
