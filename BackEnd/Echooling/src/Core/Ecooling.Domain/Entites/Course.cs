using System;
using System.Collections.Generic;
using Ecooling.Domain.Entities;

namespace Ecooling.Domain.Entites
{
    public class Course : BaseEntity
    {
        public ICollection<CourseAppUser>? CourseAppUser { get; set; }
        public ICollection<TeacherDetailsCourses>? TeacherDetailsCourses { get; set; }
        public string Title { get; set; } = null!;
        public string ImageRoutue { get; set; } = null!;
        public decimal Rate { get; set; }
        public decimal Price { get; set; }
        public string Instructor { get; set; } = null!;
        public string Dutation { get; set; } = null!;
        public string Languge { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public string Enrolled { get; set; } = null!;
        public string ThisCourseIncludes { get; set; } = null!;
        public string AboutCourse { get; set; } = null!;
        public string WhatWillLearn { get; set; } = null!;
        public string CounrseContent { get; set; } = null!;

        public int CourseCategoryId { get; set; }
        public CourseCategories CourseCategory { get; set; } = null!;
    }
}
