namespace Echooling.Aplication.DTOs.AuthDTOs;

public record RegisterDto(string phoneNumber, string email,string name,string surname,string password,string Fullname,string UserName,bool isActive);

