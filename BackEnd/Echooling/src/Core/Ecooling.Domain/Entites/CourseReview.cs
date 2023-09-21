using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class CourseReview:BaseEntity
    {
        public string? Comment { get; set; }
        public int rate { get; set; }
        public string? Fullname { get; set; }
        public ICollection<Course>? Courses { get; set; } = new List<Course>();
    }
}
 