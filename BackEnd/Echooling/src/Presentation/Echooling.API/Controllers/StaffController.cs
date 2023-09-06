using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Exceptions;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Echooling.Aplication.DTOs.StaffDTOs;

namespace Echooling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _service;

        public StaffController(IStaffService service)
        {
            _service = service;
        }
        [HttpPost("id")]
        public async Task<IActionResult> CreateTeacher([FromBody]CreateStaffDto staffDto, Guid id)
        {
            await _service.CreateAsync(staffDto, id);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> GetStaffDetails()
        {
            List<GetStaffDto> List = await _service.GetAllAsync();
            return Ok(List);
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> GetStaffUsers()
        {
            List<GetUserListDto> staffList = await _service.GetAllStaffUsers();
            return Ok(staffList);
        }
        [HttpGet("id")]
        public async Task<IActionResult> GetById(Guid id)
        {
            GetStaffDto Staff = await _service.getById(id);
            return Ok(Staff);
        }
        [HttpDelete("id")]
        public async Task<IActionResult> delete(Guid id)
        {
            try
            {
                await _service.Remove(id);
            }
            catch (notFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, new { message = ex.Message });
            }
            return Ok(new { message = "teacher details is deleted successfully." });
        }
        [HttpPut("id")]
        public async Task<IActionResult> update([FromBody] CreateStaffDto staffDto, Guid UserId)
        {
            await _service.UpdateAsync(staffDto, UserId);
            return Ok(new { message = "teacher Updated successfully." + staffDto });
        }
    }
}
