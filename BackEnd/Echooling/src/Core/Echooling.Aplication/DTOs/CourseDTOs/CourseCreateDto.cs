using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Echooling.Aplication.DTOs.CourseDTOs
{
    public class CourseCreateDto
    {
        public IFormFile? image { get; set; }
        public Guid CourseCategoryId { get; set; }
        public string Title { get; set; } = null!;
        public decimal Price { get; set; }
        public string Instructor { get; set; } = null!;
        public string Duration { get; set; } = null!;
        public string Languge { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public string Enrolled { get; set; } = null!;
        public string ThisCourseIncludes { get; set; } = null!;
        public string AboutCourse { get; set; } = null!;
        public string WhatWillLearn { get; set; } = null!;
    }
}
