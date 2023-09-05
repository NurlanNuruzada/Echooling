using Echooling.Aplication.DTOs.EventDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IEventService
    {
        Task CreateAsync(EventCreateDto CreateStaffDto);
        Task<EventGetDto> getById(Guid id);
        Task<List<EventGetDto>> GetAllAsync();
        Task UpdateAsync(EventCreateDto eventUpdate, Guid id);
        Task Remove(Guid id);
    }
}
