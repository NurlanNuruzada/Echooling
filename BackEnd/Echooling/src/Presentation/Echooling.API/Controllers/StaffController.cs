﻿using System.Net;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.StaffDTOs;
using Echooling.Persistance.Exceptions;
using Microsoft.AspNetCore.Mvc;

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
            List<GetUserListDto> List = await _service.GetAllAsync();
            return Ok(List);
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