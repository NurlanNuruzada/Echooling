using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.EventDTOs;
using System.Net;
using Echooling.Persistance.Implementations.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;

namespace Echooling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public readonly ICourseService _CourseService;

        public CourseController(ICourseService courseService)
        {
            _CourseService = courseService;
        }

        [HttpPost("[Action]/id")]
        public async Task<IActionResult> Create([FromForm] CourseCreateDto Course, Guid TeacherId)
        {
            await _CourseService.CreateAsync(Course, TeacherId);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpGet("id")]
        public async Task<IActionResult> get(Guid id)
        {
            CourseGetDto Course = await _CourseService.getById(id);
            return Ok(Course);
        }
    }
}
