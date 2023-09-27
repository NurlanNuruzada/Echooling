using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.EmailDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IAuthService
    {
        Task Register(RegisterDto registerDto);
        Task<TokenResponseDto> Login(SignInDto signInDto);
        Task<TokenResponseDto> ValidateRefreshToken(string refreshToken);
        Task ResetPassword(ResetPasswordDto resetPasswordDto);
        Task ResetPasswordLetter(Guid id);
        Task ForgetPasswordLetter(string Identifier);
        Task<IList<string>> getUserRole(Guid userId);   
    }
}
