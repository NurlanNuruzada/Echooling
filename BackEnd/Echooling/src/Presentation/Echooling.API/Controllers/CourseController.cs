using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.EventDTOs;
using System.Net;
using Echooling.Persistance.Implementations.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Persistance.Exceptions;

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
        [HttpGet("[Action]/id")]
        public async Task<IActionResult> get(Guid id)
        {
            CourseGetDto Course = await _CourseService.getById(id);
            return Ok(Course);
        }

        [HttpPut("[Action]/id")]
        public async Task<IActionResult> update([FromForm] CourseCreateDto Course, Guid id)
        {
            await _CourseService.UpdateAsync(Course, id);
            return Ok(new { message = "Course Updated successfully." + Course });
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> getAll()
        {
            List<CourseGetDto> List = await _CourseService.GetAllAsync();
            return Ok(List);
        }
        [HttpDelete("id")]
        public async Task<IActionResult> delete(Guid id)
        {
            try
            {
                await _CourseService.Remove(id);
            }
            catch (notFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, new { message = ex.Message });
            }
            return Ok(new { message = "Course deleted successfully." });
        }
    }
}
