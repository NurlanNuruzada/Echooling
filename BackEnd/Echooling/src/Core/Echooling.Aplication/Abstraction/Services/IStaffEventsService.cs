using Ecooling.Domain.Entites;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IStaffEventsService
    {
        Task AddStaffToEventAsync(Guid eventId, Guid staffId);
        Task<StaffEvents> GetByEventOrStaffId(Guid id);
        Task<List<StaffEvents>> GetAllAsync();
        Task UpdateAsync(StaffEvents StaffEvents, Guid id);
    }
}
