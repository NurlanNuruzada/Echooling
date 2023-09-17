using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.Abstraction.Repository;
using Echooling.Aplication.Abstraction.Repository.VideoContentCourseRepositories;
using Echooling.Persistance.Contexts;
using Ecooling.Domain.Entites;

namespace Echooling.Persistance.Implementations.Repositories.VideoContent_CourseRepositories
{
    public class VideoContent_CourseWriteRepository:WriteRepository<Video_Course>,IVideoContent_CourseWriteRepository
    {
        public VideoContent_CourseWriteRepository(AppDbContext context):base(context) { }
    }
}
