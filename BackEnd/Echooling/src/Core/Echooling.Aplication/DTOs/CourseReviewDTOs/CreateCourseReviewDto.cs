using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.DTOs.CourseReviewDTOs
{
    public class CreateCourseReviewDto
    {
        public string Comment { get; set; } = null!;
        public int rate { get; set; }
        public string Fullname { get; set; } = null!;
    }
}
