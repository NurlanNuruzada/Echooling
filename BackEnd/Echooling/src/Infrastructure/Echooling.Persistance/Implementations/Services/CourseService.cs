using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.Couse;
using Echooling.Aplication.Abstraction.Repository.TeacherRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;

namespace Echooling.Persistance.Implementations.Services;

public class CourseService : ICourseService
{
    private readonly ICourseWriteRepository _writeRepository;
    private readonly ICourseReadRepository _readRepository;
    private readonly IMapper _mapper;
    private readonly IStringLocalizer<ErrorMessages> _localizer;
    public readonly ITeacherService _teacherService;
    public readonly ITeacherReadRepository _teacherReadrepo;
    public readonly ITeacherCourses _TeacherCoursesCreateService;
    private readonly AppDbContext _context;
    public CourseService(ICourseWriteRepository writeRepository,
                         ICourseReadRepository readRepository,
                         IMapper mapper,
                         IStringLocalizer<ErrorMessages> localizer,
                         ITeacherService teacherService,
                         ITeacherCourses teacherCoursesCreateService,
                         AppDbContext context,
                         ITeacherReadRepository teacherReadrepo)
    {
        _writeRepository = writeRepository;
        _readRepository = readRepository;
        _mapper = mapper;
        _localizer = localizer;
        _teacherService = teacherService;
        _TeacherCoursesCreateService = teacherCoursesCreateService;
        _context = context;
        _teacherReadrepo = teacherReadrepo;
    }

    public async Task CreateAsync(CourseCreateDto courseCreateDto, Guid TeacherId)
    {
        if (courseCreateDto.image == null)
        {
            throw new Exception("No image file provided.");
        }
        var teacher =  await _teacherReadrepo.GetByIdAsync(TeacherId);
        if(teacher is null || teacher.IsApproved ==false)
        {
            throw  new notFoundException("teacher not found!");
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
    public async Task<List<CourseGetDto>> GetLatestWithCategory(int take, Guid? categoryId)
    {
        var query = _context.Courses
            .Where(e => !e.IsDeleted)
            .OrderByDescending(e => e.DateCreated)
            .Take(take);

        if (categoryId.HasValue)
        {
            query = query.Where(e => e.CourseCategoryId == categoryId);
        }

        var coursesWithCategory = await query
            .Include(e => e.CourseCategory)
            .ToListAsync();

        List<CourseGetDto> list = _mapper.Map<List<CourseGetDto>>(coursesWithCategory);

        foreach (CourseGetDto courseGetDto in list)
        {
            courseGetDto.ImageRoutue = $"{courseGetDto.ImageRoutue}";
            courseGetDto.CourseCategoryId = courseGetDto.CourseCategoryId;
        }

        return list;
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

    public async Task<List<TeacherGetDto>> GetTeachersByCourseId(Guid courseId)
    {
        var teachersWithCourseId = await _context.TeacherDetails
            .Where(td => td.TeacherDetailsCourses.Any(tc => tc.CourseId == courseId))
            .ToListAsync();
        if (teachersWithCourseId.Count == 0)
        {
            string message = _localizer.GetString("NotFoundExceptionMsg");
            throw new notFoundException(message);
        }

        List<TeacherGetDto> teacherDtos = _mapper.Map<List<TeacherGetDto>>(teachersWithCourseId);
        return teacherDtos;
    }

    public async Task<List<CourseGetDto>> GetAllSearchAsync(string? courseName,
                                                            string? category,
                                                            decimal? rating)
    {
        var Course = _readRepository.GetAll().Where(e => e.IsDeleted == false);
        if (!string.IsNullOrEmpty(courseName))
        {
            Course = Course.Where(x => x.Title.ToLower().Contains(courseName));
        }
        if (!string.IsNullOrEmpty(category))
        {
            Course = Course.Where(x => x.CourseCategory.Category.ToLower() == category.ToLower());
        }
        if (rating >= 0 && rating < 6)
        {
            Course = Course.Where(x => x.Rate >= rating);
        }

        var queryList = await Course.ToListAsync();

        List<CourseGetDto> List = _mapper.Map<List<CourseGetDto>>(queryList);
        foreach (CourseGetDto courseGetDto in List)
        {
            courseGetDto.ImageRoutue = $"{courseGetDto.ImageRoutue}";
        }
        return List;
    }

}
