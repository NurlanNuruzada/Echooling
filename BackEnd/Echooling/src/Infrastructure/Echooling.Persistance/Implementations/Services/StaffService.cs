using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.StaffRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.StaffDTOs;
using Echooling.Aplication.DTOs.StaffDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class StaffService : IStaffService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IStaffReadRepository _readRepository;
        private readonly IStaffWriteRepository _writeRepository;
        private readonly IStringLocalizer<ErrorMessages> _localizer;

        public StaffService(IMapper mapper,
                            IStaffReadRepository readRepository,
                            IStaffWriteRepository writeRepository,
                            IStringLocalizer<ErrorMessages> localizer,
                            UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _readRepository = readRepository;
            _writeRepository = writeRepository;
            _localizer = localizer;
            _userManager = userManager;
        }
        public async Task CreateAsync(CreateStaffDto createStaff, Guid UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (user is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            Staff staff = _mapper.Map<Staff>(createStaff);
            var result = await _userManager.AddToRoleAsync(user, Roles.Admin.ToString());
            staff.AppUserID = UserId; 
            await _writeRepository.addAsync(staff);
            await _writeRepository.SaveChangesAsync();
        }

        public Task CreateAsync(CreateStaffDto CreateStaffDto)
        {
            throw new NotImplementedException();
        }

        public async Task<List<CreateStaffDto>> GetAllAsync()
        {
            var Staff = await _readRepository.GetAll().ToListAsync();
            List<CreateStaffDto> List = _mapper.Map<List<CreateStaffDto>>(Staff);
            return List;
        }

        public async Task<CreateStaffDto> getById(Guid UserId)
        {
            var Staff = await _readRepository.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Staff is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            CreateStaffDto FoundStaff = _mapper.Map<CreateStaffDto>(Staff);
            return FoundStaff;
        }
        public async Task Remove(Guid UserId)
        {
            var Staff = await _readRepository.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Staff is null)
            {
                throw new notFoundException(message);
            }
            _writeRepository.remove(Staff);
            await _writeRepository.SaveChangesAsync();
        }
        public async Task UpdateAsync(CreateStaffDto updateDto, Guid UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            var Staff = await _readRepository.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Staff is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            _mapper.Map(updateDto, Staff);
            await _writeRepository.SaveChangesAsync();
        }
    }
}
