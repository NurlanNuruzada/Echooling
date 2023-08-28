using Echooling.Aplication.DTOs.ResponseDTOs;
using Ecooling.Domain.Entites;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface ITokenHandler
    {
        public Task<TokenResponseDto> CreateAccessToken(int addminutes,AppUser user);
    }
}
