﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.CourseCategory;
using Echooling.Aplication.Abstraction.Repository.EventsStaff;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CategoryDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class CourseServices : ICourseCategoryService
    {
        private readonly ICourseReadRepository _ReadRepository;
        private readonly ICourseWriteRepository _WriteRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;

        public CourseServices(ICourseReadRepository readRepository,
                              ICourseWriteRepository writeRepository,
                              IMapper mapper,
                              IStringLocalizer<ErrorMessages> localizer)
        {
            _ReadRepository = readRepository;
            _WriteRepository = writeRepository;
            _mapper = mapper;
            _localizer = localizer;
        }

        public async Task CreateCourseCategory(CourseCategoryDto courseCategoryDto)
        {
            CourseCategories category = _mapper.Map<CourseCategories>(courseCategoryDto);
            await _WriteRepository.addAsync(category);
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task<List<CourseCategoryDto>> GetAllAsync()
        {
            var Categoryes = await _ReadRepository.GetAll().ToListAsync();
            List<CourseCategoryDto> List = _mapper.Map<List<CourseCategoryDto>>(Categoryes);
            return List;
        }

        public async Task<CourseCategoryDto> GetCourseCategoryById(Guid id)
        {
            CourseCategories Category = await _ReadRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            CourseCategoryDto category = _mapper.Map<CourseCategoryDto>(Category);
            if (category is null)
            {
                throw new notFoundException(message);
            }
            else
            {
                return category;
            }
        }

        public async Task Remove(Guid id)
        {
            CourseCategories categories = await _ReadRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (categories is null)
            {
                throw new notFoundException(message);
            }
            _WriteRepository.remove(categories);
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(CourseCategoryDto categoryDto, Guid id)
        {
            var categories = await _ReadRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (categories is null)
            {
                throw new notFoundException(message);
            }
            _mapper.Map(categoryDto, categories);
            await _WriteRepository.SaveChangesAsync();
        }

    }
}