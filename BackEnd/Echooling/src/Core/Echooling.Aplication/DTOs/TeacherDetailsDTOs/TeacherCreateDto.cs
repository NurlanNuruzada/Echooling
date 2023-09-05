﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecooling.Domain.Entites;

namespace Echooling.Aplication.DTOs.TeacherDetailsDTOs
{
    public record TeacherCreateDto(Guid userId,
                                   string? hobbies,
                                   string? faculty,
                                   string? TotalExperianceHours,
                                   string? totalOnlineCourseCount,
                                   string? totalStudentCount,
                                   string? Facebook,
                                   string? twitter,
                                   string? linkedin,
                                   string? instagram,
                                   string? profecion);
}
