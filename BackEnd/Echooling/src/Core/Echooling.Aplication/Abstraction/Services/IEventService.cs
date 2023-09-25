using Echooling.Aplication.DTOs.EventDTOs;
using Microsoft.AspNetCore.Http;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IEventService
    {
        Task CreateAsync(EventCreateDto CreateStaffDto,Guid UsetId);
        Task<EventGetDto> getById(Guid id);
        Task<List<EventGetDto>> GetAllAsync();
        Task UpdateAsync(EventCreateDto eventUpdate, Guid id);
        Task Remove(Guid id);
        Task<List<EventGetDto>> GetAllSearchAsync(string? EventName,
                                                         string? category,
                                                         DateTime? StartDate,
                                                         DateTime? EndDate,
                                                         string? location);
    }
}
