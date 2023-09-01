using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.EmailDTOs;
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
        [HttpGet("[action]")]
        public async Task<IActionResult> RefreshToken([FromQuery] string token)
        {
            var response = await _authService.ValidateRefreshToken(token);
            return Ok(response);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            await _authService.Register(registerDto);
            return Ok("User registered successfully");
        }
        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> ResetPasswordLetter(Guid id)
        {
            await _authService.ResetPasswordLetter(id);
            return Ok("Lettter sent!");
        }
        [HttpPost("[action]/{mailAdress}")]
        public async Task<IActionResult> ForgetPasswordLetter(string mailAdress)
        {
            await _authService.ForgetPasswordLetter(mailAdress);
            return Ok("Lettter sent!");
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            await _authService.ResetPassword(resetPasswordDto);
            return Ok("password Changed!");
        }
    }
}
