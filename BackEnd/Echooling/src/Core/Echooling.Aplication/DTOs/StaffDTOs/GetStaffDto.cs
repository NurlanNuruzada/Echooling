using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.DTOs.StaffDTOs
{
    public record GetStaffDto(string? profession,
                              string? instagram,
                              string? linkedin,
                              string? AboutMe,
                              string? twitter,
                              string? Facebook,
                              string? EventCount,
                              string? LastestEvent,
                              string? TotalExperianceHours,
                              string? faculty,
                              string? hobbies,
                              string? PhoneNumber,
                              string? Fullname,
                              Guid GuId,
                              string? emailAddress,
                              Guid AppUserID);
}
