using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.DTOs.StaffDTOs
{
    public record GetStaffDto(string? profecion,
                              string? instagram,
                              string? linkedin,
                              string? twitter,
                              string? Facebook,
                              string? EventCount,
                              string? LastestEvent,
                              string? TotalExperianceHours,
                              string? faculty,
                              string? hobbies,
                              Guid GuId,
                              Guid AppUserID);
}
