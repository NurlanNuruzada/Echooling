using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;
using Echooling.Persistance.Exceptions;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace Echooling.Persistance.Implementations.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;

        public AuthService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public Task<TokenResponseDto> Login(SignInDto signInDto)
        {
            throw new NotImplementedException();
        }

        public async Task Register(RegisterDto registerDto)
        {
            Random random = new Random();
            int randomNumber = random.Next(100000, 999999);
            AppUser appUser = new()
            {
                Fullname = registerDto.Fullname,
                PhoneNumber = registerDto.phoneNumber,
                UserName = registerDto.UserName, 
                Email = registerDto.email, 
                isActive = true
            };
            IdentityResult identityResult = await _userManager.CreateAsync(appUser,registerDto.password);
            if (!identityResult.Succeeded)
            {
                StringBuilder err = new();
                foreach (var error in identityResult.Errors)
                {
                    err.AppendLine(error.Description);
                }
                throw new UserRegistrationException(err.ToString());
            }

        }
    }
}
