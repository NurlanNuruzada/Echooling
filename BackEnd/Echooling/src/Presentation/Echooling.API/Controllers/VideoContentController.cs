﻿using System.Net;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.VideoDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Implementations.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Echooling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoContentController : ControllerBase
    {
        readonly IVideoContentService _videoContentService;

        public VideoContentController(IVideoContentService videoContentService)
        {
            _videoContentService = videoContentService;
        }
        [HttpGet("id")]
        public async Task<IActionResult> get(Guid id)
        {
            GetVideoContentDto slider = await _videoContentService.getById(id);
            return Ok(slider);
        }
        [HttpGet("[Action]")]
        public async Task<IActionResult> getAll()
        {
            List<GetVideoContentDto> List = await _videoContentService.GetAllAsync();
            return Ok(List);
        }
        [HttpDelete("[Action]/id")]
        public async Task<IActionResult> delete(Guid id)
        {
            try
            {
                await _videoContentService.Remove(id);
            }
            catch (notFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, new { message = ex.Message });
            }
            return Ok(new { message = "Video deleted successfully." });
        }
        [HttpPost("[Action]")]
        public async Task<IActionResult> Create([FromForm] CreateVIdeoContentDto VideoDto)
        {
            await _videoContentService.CreateAsync(VideoDto);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpPut("id")]
        public async Task<IActionResult> update([FromBody] CreateVIdeoContentDto VideoDto, Guid id)
        {
            await _videoContentService.UpdateAsync(VideoDto, id);
            return Ok(new { message = "Video Updated successfully." + VideoDto });
        }
    }
}
