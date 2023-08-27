using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Identity;

namespace Echooling.Persistance.Implementations.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;

        public AuthService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task Register(RegisterDto registerDto)
        {
            Random random = new Random();
            int randomNumber = random.Next(100000, 999999);
            AppUser appUser = new()
            {
                Fullname=registerDto.Fullname,
                PhoneNumber=registerDto.phoneNumber,
                UserName =registerDto.name,
                Email =registerDto.email,
                BadgeNumber = randomNumber,
                isActive = true
            };
            IdentityResult identityResult = await _userManager.CreateAsync(appUser,registerDto.password);
        }
    }
}
