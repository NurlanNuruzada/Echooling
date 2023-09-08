using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.StaffRepositories;
using Echooling.Aplication.Abstraction.Repository.TeacherRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.StaffDTOs;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Enums;
using Microsoft.AspNetCore.Http;
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
        private readonly RoleManager<IdentityRole> _roleManager;
        public readonly ITeacherReadRepository _readRepo;

        public StaffService(IMapper mapper,
                            IStaffReadRepository readRepository,
                            IStaffWriteRepository writeRepository,
                            IStringLocalizer<ErrorMessages> localizer,
                            UserManager<AppUser> userManager,
                            AppDbContext context,
                            RoleManager<IdentityRole> roleManager,
                            ITeacherReadRepository readRepo)
        {
            _mapper = mapper;
            _readRepository = readRepository;
            _writeRepository = writeRepository;
            _localizer = localizer;
            _userManager = userManager;
            _roleManager = roleManager;
            _readRepo = readRepo;
        }
        public async Task CreateAsync(CreateStaffDto createStaff, Guid UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            var IsAlreadyStaff = await _readRepository.GetByExpressionAsync(S => S.AppUserID == UserId);
            var DublicatedExcetionMessage = _localizer.GetString("DublicatedExceptionMsg");
            if (IsAlreadyStaff is not null)
            {
                throw new notFoundException("this user is " + " " + DublicatedExcetionMessage);
            }
            var IsAlreadyteacher = await _readRepo.GetByExpressionAsync(S => S.AppUserID == UserId);
            if (IsAlreadyteacher is not null)
            {
                throw new notFoundException("this user is " + " " + DublicatedExcetionMessage);
            }
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (user is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            Staff staff = _mapper.Map<Staff>(createStaff);
            var result = await _userManager.AddToRoleAsync(user, Roles.Staff.ToString());
            staff.AppUserID = UserId;
            staff.PhoneNumber = user.PhoneNumber;
            staff.Fullname = user.Fullname;
            staff.emailAddress = user.Email;
            staff.Role = "Staff";
            await _writeRepository.addAsync(staff);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task<List<GetUserListDto>> GetAllAsync()
        {
            var staff = await _readRepository.GetAll().ToListAsync();
            var staffDtos = _mapper.Map<List<GetUserListDto>>(staff);

            var teachers = await _readRepo.GetAll().ToListAsync();
            var teacherDtos = _mapper.Map<List<GetUserListDto>>(teachers);

            var combinedList = staffDtos.Concat(teacherDtos).ToList();

            return combinedList;
        }
        public async Task<GetStaffDto> getById(Guid UserId)
        {
            var Staff = await _readRepository.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Staff is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            GetStaffDto FoundStaff = _mapper.Map<GetStaffDto>(Staff);
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
