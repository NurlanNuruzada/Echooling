using Ecooling.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;

namespace Ecooling.Domain.Entites
{
    public class AppUser : IdentityUser
    {
        public string? PhoneNumber { get; set; }
        public string? Fullname { get; set; }
        public bool isActive { get; set; }
        public bool? IsSendNewsConfirmed { get; set; }
        public DateTime? RefrestTokenExpiration { get; set; }
        public string? RefrestToken { get; set; }
        public ICollection<CourseAppUser>? CourseAppUser { get; set; }
        public int? teacherDetailsId { get; set; }
        public teacherDetails? teacherDetails { get; set; }
    }
}
