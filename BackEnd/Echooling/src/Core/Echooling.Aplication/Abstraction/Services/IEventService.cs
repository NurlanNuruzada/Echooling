using Echooling.Aplication.DTOs.EventDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IEventService
    {
        Task CreateAsync(EventCreateDto CreateStaffDto);
        Task<EventCreateDto> getById(Guid id);
        Task<List<EventCreateDto>> GetAllAsync();
        Task UpdateAsync(EventCreateDto StaffUpdateDto, Guid id);
        Task Remove(Guid id);
    }
}
