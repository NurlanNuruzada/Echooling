using System;
using System.Collections.Generic;
using Ecooling.Domain.Entities;

namespace Ecooling.Domain.Entites
{
    public class Course : BaseEntity
    {
        public ICollection<Course_AppUser>? CourseAppUser { get; set; }
        public ICollection<TeacherDetails_Courses>? TeacherDetailsCourses { get; set; }
        public ICollection<Video_Course>? VideoCourse { get; set; }
        public string Title { get; set; } = null!;
        public string ImageRoutue { get; set; } = null!;
        public decimal Rate { get; set; }
        public decimal Price { get; set; }
        public string Instructor { get; set; } = null!;
        public string? Duration { get; set; }
        public string Languge { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public int? Enrolled { get; set; }
        public string ThisCourseIncludes { get; set; } = null!;
        public string WhatWillLearn { get; set; } = null!;
        public string AboutCourse { get; set; } = null!;
        public Guid CourseCategoryId { get; set; }
        public CourseCategories CourseCategory { get; set; } = null!;
        public Guid CourseReviewId { get; set; }
        public CourseReview CourseReview { get; set; } = null!;
        public bool Approved { get; set; }
    }
}
