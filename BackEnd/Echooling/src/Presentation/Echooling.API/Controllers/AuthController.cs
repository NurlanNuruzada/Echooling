using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Echooling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("[action]")] 
        public async Task<IActionResult> Login(SignInDto signInDto)
        {
            var response = await _authService.Login(signInDto); 
            return Ok(response);    
        }
        [HttpGet("[action]/token")]
        public async Task<IActionResult> RefreshToken([FromRoute]string token)
        {
            var response = await _authService.ValidateRefreshToken(token);
            return Ok(response);
        }
    }
}
