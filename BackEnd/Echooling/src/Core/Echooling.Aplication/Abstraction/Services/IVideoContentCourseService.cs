using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecooling.Domain.Entites;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IVideoContentCourseService
    {
        Task AddVideoToCourse(Guid eventId, Guid staffId);
    }
}
