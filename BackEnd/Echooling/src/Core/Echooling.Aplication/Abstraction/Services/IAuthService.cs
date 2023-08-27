using Echooling.Aplication.DTOs.AuthDTOs;
namespace Echooling.Aplication.Abstraction.Services
{
    public interface IAuthService
    {
        Task Register(RegisterDto registerDto);
    }
}
