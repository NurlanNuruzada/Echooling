using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.EmailDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Exceptions;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Text;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;
using System.Web;

namespace Echooling.Persistance.Implementations.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ITokenHandler _tokenHandler;
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfirmEmail _confirmEmail;
        public AuthService(UserManager<AppUser> userManager,
                           SignInManager<AppUser> signInManager,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration configuration,
                           ITokenHandler tokenHandler,
                           AppDbContext context,
                           IEmailService emailService,
                           IConfirmEmail confirmEmail)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _tokenHandler = tokenHandler;
            _context = context;
            _emailService = emailService;
            _confirmEmail = confirmEmail;
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

            var tokenResponse =  await _tokenHandler.CreateAccessToken(1 ,2, appUser);
            appUser.RefrestToken = tokenResponse.RefreshToken;
            appUser.RefrestTokenExpiration = tokenResponse.RefreshTokenExpiration;
            await _userManager.UpdateAsync(appUser);
            return tokenResponse;
        }

        public async Task Register(RegisterDto registerDto)
        {
            AppUser appUser = new()
            {
                Fullname = registerDto.surname +" "+ registerDto.name,
                PhoneNumber = registerDto.phoneNumber,
                UserName = registerDto.UserName,
                Email = registerDto.email,
                isActive = true,
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
            if (result.Succeeded)
            {
                var FrontEndBase = "http://localhost:3000";
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
                string codeHtmlVersion = HttpUtility.UrlEncode(token);
                var confirmationUrl = $"{FrontEndBase}/Auth/ConfirmEmail?userId={appUser.Id}&token={codeHtmlVersion.ToString()}";
                //var confirmationLink = $"{FrontEndBase}/confirm-email?userId={appUser.Id}&token={UrlEncoder.Default.Encode(codeHtmlVersion)}";
                //var time = DateTime.Now.ToString();
                //var userIp = GetUserIP().ToString();
                //var username = user.UserName.ToString();
                SentEmailDto ConfirmLetter = new SentEmailDto
                {
                    To = appUser.Email,
                    Subject = "Confirm Email Address",
                    body = $"<h1>Confirm Your Email</h1><p>Please confirm your email address by clicking <a href='{confirmationUrl}'>here</a>.</p>" 
                }; 
                _emailService.SendEmail(ConfirmLetter);
            }

        }
                                                        
        public Task SignOut()
        {
            throw new NotImplementedException();
        }

        public async Task<TokenResponseDto> ValidateRefreshToken(string refreshToken)
        {
            if(refreshToken is null)
            {
                throw new ArgumentNullException("Refrest token does not exist");
            }
            var user =await _context.Users.Where(u=>u.RefrestToken == (refreshToken)).FirstOrDefaultAsync();
            if (user is null)
            {
                throw new notFoundException("user not found!");
            }
            if (user.RefrestTokenExpiration < DateTime.UtcNow)
            {
                 throw new ArgumentNullException("Refrest token does not exist");
            }
            var tokenResponse = await _tokenHandler.CreateAccessToken(2,1, user);
            user.RefrestToken = tokenResponse.RefreshToken;
            user.RefrestTokenExpiration = tokenResponse.RefreshTokenExpiration;
            await _userManager.UpdateAsync(user);
            return tokenResponse;
        }
    }
}
//{
//    "phoneNumber": "string",
//  "email": "nurlan.nuruzade205@gmail.com",
//  "name": "string",
//  "surname": "string",
//  "password": "Admin123!",
//  "userName": "string"eeeee
//}