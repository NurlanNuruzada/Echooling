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
        public ICollection<Video_Course>? VideoCourse { get; set; }
        public string? VideoTitle { get; set; }
        public string? VideoUniqueName { get; set; } = null!;
    }
}
