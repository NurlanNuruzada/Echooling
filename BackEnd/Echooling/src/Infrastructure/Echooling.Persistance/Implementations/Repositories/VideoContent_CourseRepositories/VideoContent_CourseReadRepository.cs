using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.Abstraction.Repository.VideoContentCourseRepositories;
using Echooling.Persistance.Contexts;
using Ecooling.Domain.Entites;

namespace Echooling.Persistance.Implementations.Repositories.VideoContent_CourseRepositories
{
    public class VideoContent_CourseReadRepository : ReadRepository<Video_Course>, IVideoContent_CourseReadRepository
    {
        public VideoContent_CourseReadRepository(AppDbContext context) : base(context) { }
    }
}
