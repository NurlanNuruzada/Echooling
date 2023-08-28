using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;
using Echooling.Persistance.Exceptions;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Echooling.Persistance.Implementations.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ITokenHandler _tokenHandler;
        public AuthService(UserManager<AppUser> userManager,
                           SignInManager<AppUser> signInManager,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration configuration,
                           ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _tokenHandler = tokenHandler;
        }

        public async Task<TokenResponseDto> Login(SignInDto signInDto)
        {
            AppUser appUser = await _userManager.FindByEmailAsync(signInDto.EmailOrUsername);

            if (appUser is null)
            {
                appUser = await _userManager.FindByNameAsync(signInDto.EmailOrUsername);
                if (appUser is null) { throw new SignInFailureException("sign-in Identifier or Password is Wrong!"); }
            }
            var signInResult = await _signInManager.CheckPasswordSignInAsync(appUser, signInDto.password, true);
            if (!signInResult.Succeeded)
            {
                throw new UserRegistrationException("sign-in Identifier or Password is Wrong!");
            }
            if (!appUser.isActive)
            {
                throw new UserNotActiveException("Your accound is Blocked!");
            }

            return await _tokenHandler.CreateAccessToken(120, appUser);
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
            IdentityResult identityResult = await _userManager.CreateAsync(appUser, registerDto.password);
            if (!identityResult.Succeeded)
            {
                StringBuilder err = new();
                foreach (var error in identityResult.Errors)
                {
                    err.AppendLine(error.Description);
                }
                throw new UserRegistrationException(err.ToString());
            }
            var result = await _userManager.AddToRoleAsync(appUser, Roles.Member.ToString());
            if (!result.Succeeded)
            {
                StringBuilder err = new();
                foreach (var error in result.Errors)
                {
                    err.AppendLine(error.Description);
                }
                throw new UserRegistrationException(err.ToString());
            }
        }
    }
}
