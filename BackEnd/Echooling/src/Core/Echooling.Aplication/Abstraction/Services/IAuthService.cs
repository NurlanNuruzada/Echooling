﻿using Echooling.Aplication.DTOs.AuthDTOs;
using Echooling.Aplication.DTOs.ResponseDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IAuthService
    {
        Task Register(RegisterDto registerDto);
        Task<TokenResponseDto> Login(SignInDto signInDto);
    }
}
