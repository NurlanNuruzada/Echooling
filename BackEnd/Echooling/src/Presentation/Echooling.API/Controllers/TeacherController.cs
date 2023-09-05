﻿using System.Net;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Implementations.Services;
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
        [HttpPost("id")]
        public async Task<IActionResult> CreateTeacher(TeacherCreateDto teacherCreateDto,Guid id)
        {
            await _service.CreateAsync(teacherCreateDto,id);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> GetTeachers()
        {
            List<TeacherGetDto> List = await _service.GetAllAsync();
            return Ok(List);
        }
        [HttpGet("id")] 
        public async Task<IActionResult> GetById(Guid id)
        { 
            TeacherGetDto teacher = await _service.getById(id);
            return Ok(teacher);
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
    }
}
