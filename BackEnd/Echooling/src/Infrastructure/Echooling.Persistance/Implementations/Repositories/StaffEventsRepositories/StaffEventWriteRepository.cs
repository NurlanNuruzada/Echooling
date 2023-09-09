using Echooling.Aplication.Abstraction.Repository.EventsStaff;
using Echooling.Persistance.Contexts;
using Ecooling.Domain.Entites;
namespace Echooling.Persistance.Implementations.Repositories.StaffEventsRepositories;
public class StaffEventWriteRepository:WriteRepository<StaffEvents>,IEventStaffWriteRepository
{
    public StaffEventWriteRepository(AppDbContext context):base(context) { }
}
