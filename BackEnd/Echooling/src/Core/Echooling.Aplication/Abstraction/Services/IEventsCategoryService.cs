using Echooling.Aplication.DTOs.CategoryDTOs;

namespace Echooling.Aplication.Abstraction.Services;

public interface IEventsCategoryService
{
    Task Create(EventCategoryDto eventCategoryDto);
    Task<EventCategoryDto> getById(Guid id);
    Task<List<EventCategoryDto>> GetAllAsync();
    Task UpdateAsync(EventCategoryDto eventCategoryDto, Guid id);
    Task Remove(Guid id);
}
