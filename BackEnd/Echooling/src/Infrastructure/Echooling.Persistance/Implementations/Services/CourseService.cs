using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.Couse;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;

namespace Echooling.Persistance.Implementations.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseWriteRepository _writeRepository;
        private readonly ICourseReadRepository _readRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        public readonly ITeacherService _teacherService;
        public readonly ITeacherCourses _TeacherCoursesCreateService;

        public CourseService(ICourseWriteRepository writeRepository,
                             ICourseReadRepository readRepository,
                             IMapper mapper,
                             IStringLocalizer<ErrorMessages> localizer,
                             ITeacherService teacherService,
                             ITeacherCourses teacherCoursesCreateService)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
            _teacherService = teacherService;
            _TeacherCoursesCreateService = teacherCoursesCreateService;
        }

        public async Task CreateAsync(CourseCreateDto courseCreateDto, Guid TeacherId)
        {
            if (courseCreateDto.image == null)
            {
                throw new Exception("No image file provided.");
            }

            Course course = _mapper.Map<Course>(courseCreateDto);
            string uploadsDirectory = @"C:\Users\Nurlan\Desktop\FinalApp\FrontEnd\echooling\public\Uploads\Course";
            Directory.CreateDirectory(uploadsDirectory);
            course.Approved = false;

            if (courseCreateDto.image is not null)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(courseCreateDto.image.FileName);
                string filePath = Path.Combine(uploadsDirectory, fileName);

                using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    await courseCreateDto.image.CopyToAsync(fileStream);
                }

                course.ImageRoutue = fileName;
            }

            // Serialize the string arrays to JSON
            course.ThisCourseIncludes = JsonConvert.SerializeObject(courseCreateDto.ThisCourseIncludes);
            course.WhatWillLearn = JsonConvert.SerializeObject(courseCreateDto.WhatWillLearn);

            await _writeRepository.addAsync(course);
            await _writeRepository.SaveChangesAsync();
            await _TeacherCoursesCreateService.AddCourseToTeacherAsync(course.GuId, TeacherId);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task<List<CourseGetDto>> GetAllAsync()
        {
            var Course = await _readRepository.GetAll().Where(e => e.IsDeleted == false).ToListAsync();
            List<CourseGetDto> List = _mapper.Map<List<CourseGetDto>>(Course);
            foreach (CourseGetDto courseGetDto in List)
            {
                courseGetDto.ImageRoutue = $"{courseGetDto.ImageRoutue}";
            }
            return List;
        }

        public async Task<CourseGetDto> getById(Guid CourseId)
        {
            Course Course = await _readRepository.GetByIdAsync(CourseId);
            CourseGetDto CourseGet = _mapper.Map<CourseGetDto>(Course);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Course is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            if (Course.IsDeleted == true)
            {
                throw new notFoundException(message);
            }
            else
            {
                CourseGetDto CourseDto = _mapper.Map<CourseGetDto>(Course);
                CourseDto.ImageRoutue = Course.ImageRoutue;
                return CourseDto;
            }
        }

        public async Task Remove(Guid CourseId)
        {
            var Course = await _readRepository.GetByIdAsync(CourseId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Course is null)
            {
                throw new notFoundException(message);
            }
            Course.IsDeleted = true;
            await _writeRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(CourseCreateDto courseCreateDto, Guid CourseId)
        {
            var Course = await _readRepository.GetByIdAsync(CourseId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Course is null)
            {
                throw new notFoundException(message);
            }
            string uploadsDirectory = @"C:\Users\Nurlan\Desktop\FinalApp\FrontEnd\echooling\public\Uploads\Course";
            Directory.CreateDirectory(uploadsDirectory);
            _mapper.Map(courseCreateDto, Course);
            if (courseCreateDto.image is not null)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(courseCreateDto.image.FileName);
                string filePath = Path.Combine(uploadsDirectory, fileName);

                using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    await courseCreateDto.image.CopyToAsync(fileStream);
                }

                Course.ImageRoutue = fileName;
                Course.Approved = false;
                Course.Enrolled = 0;
            }
            await _writeRepository.SaveChangesAsync();
        }
    }
}
