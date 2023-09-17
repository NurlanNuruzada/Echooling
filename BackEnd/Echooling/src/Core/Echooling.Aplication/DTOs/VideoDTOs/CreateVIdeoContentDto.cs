using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Echooling.Aplication.DTOs.VideoDTOs
{
    public class CreateVIdeoContentDto
    {
        public string? VideoTitle { get; set; }
        public IFormFile Video { get; set; } = null!;
    }
}
