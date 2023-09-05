using System.Net;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Echooling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _service;

        public TeacherController(ITeacherService service)
        {
            _service = service;
        }
        [HttpPost("[Action]")]
        public async Task<IActionResult> CreateTeacher(TeacherCreateDto teacherCreateDto)
        {
            await _service.CreateAsync(teacherCreateDto);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> GetTeachers()
        {
            List<TeacherGetDto> List = await _service.GetAllAsync();
            return Ok(List);
        }
    }
}
