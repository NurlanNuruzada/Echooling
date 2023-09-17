using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class Video_Course : BaseEntity
    {
        public Guid? CourseId { get; set; }
        public teacherDetails? Course { get; set; }
        public Guid? VideoContentId { get; set; }
        public VideoContent? VideoContent { get; set; }
    }
}
