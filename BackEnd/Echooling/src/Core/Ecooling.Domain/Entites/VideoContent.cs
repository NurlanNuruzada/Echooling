using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Ecooling.Domain.Entites
{
    public class VideoContent:BaseEntity
    {
        public ICollection<VideoCourse>? VideoCourse { get; set; }
        public IFormFile Video { get; set; } = null!;
        public string VideoName { get; set; }
    }
}
