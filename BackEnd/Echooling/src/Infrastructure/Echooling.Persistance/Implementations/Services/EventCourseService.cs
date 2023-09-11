using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.CourseCategory;
using Echooling.Aplication.Abstraction.Repository.EventCategoryRepository;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CategoryDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class EventCourseService : IEventsCategoryService
    {
        private readonly IEventCategoryReadRepository _ReadRepository;
        private readonly IEventCategoryWriteRepository _WriteRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;

        public async Task Create(EventCategoryDto eventCategoryDto)
        {
            EventCategoryies category = _mapper.Map<EventCategoryies>(eventCategoryDto);
            await _WriteRepository.addAsync(category);
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task<List<EventCategoryDto>> GetAllAsync()
        {
            var Categoryes = await _ReadRepository.GetAll().ToListAsync();
            List<EventCategoryDto> List = _mapper.Map<List<EventCategoryDto>>(Categoryes);
            return List;
        }

        public async Task<EventCategoryDto> getById(Guid id)
        {
            EventCategoryies Category = await _ReadRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            EventCategoryDto category = _mapper.Map<EventCategoryDto>(Category);
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
            EventCategoryies categories = await _ReadRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (categories is null)
            {
                throw new notFoundException(message);
            }
            _WriteRepository.remove(categories);
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(EventCategoryDto categoryDto, Guid id)
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
