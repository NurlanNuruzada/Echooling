using Echooling.Aplication.DTOs.AuthDTOs;
using FluentValidation;

namespace Echooling.Aplication.Valudators.AuthValudators
{
    public class RegisterDtoValudator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValudator()
        {
            RuleFor(X => X.phoneNumber).MaximumLength(50);
            RuleFor(X => X.email).NotNull().NotEmpty().MaximumLength(255);
            RuleFor(x => x.surname).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(x => x.name).NotNull().NotEmpty().MaximumLength(55);
            RuleFor(x=>x.Fullname).NotNull().NotEmpty().MaximumLength(255);
            RuleFor(x => x.BadgeNumber).NotNull().NotEmpty().LessThan(10000000);
        }
    }
}
