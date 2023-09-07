using System;
using System.Collections.Generic;

namespace Ecooling.Domain.Entites
{
    public class teacherDetails : BaseEntity
    {
        public Guid AppUserID { get; set; }
        public ICollection<TeacherDetailsCourses>? TeacherDetailsCourses { get; set; }
        public string? hobbies { get; set; }
        public string? faculty { get; set; }
        public string? TotalExperianceHours { get; set; }
        public string? totalOnlineCourseCount { get; set; }
        public string? totalStudentCount { get; set; }
        public string? Facebook { get; set; }
        public string? twitter { get; set; }
        public string? linkedin { get; set; }
        public string? instagram { get; set; }
        public string? profession {get; set; }
        public string? PhoneNumber { get; set; }
        public string? Fullname { get; set; }
        public string? AboutMe { get; set; }
        public string? emailAddress { get; set; }
    }
}
