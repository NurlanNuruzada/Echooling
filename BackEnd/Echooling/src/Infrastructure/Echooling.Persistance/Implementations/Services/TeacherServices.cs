using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.TeacherRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Ecooling.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class TeacherServices : ITeacherService
    {
        public readonly AppDbContext _context;
        public readonly ITeacherReadRepository _readRepo;
        public readonly ITeacherWriteRepository _writeRepo;
        public readonly IMapper _mapper;
        public readonly IStringLocalizer<ErrorMessages> _stringLocalizer;
        private readonly UserManager<AppUser> _userManager;
        public TeacherServices(ITeacherReadRepository readRepo,
                               ITeacherWriteRepository writeRepo,
                               IMapper mapper,
                               IStringLocalizer<ErrorMessages> stringLocalizer,
                               AppDbContext context,
                               UserManager<AppUser> userManager)
        {
            _readRepo = readRepo;
            _writeRepo = writeRepo;
            _mapper = mapper;
            _stringLocalizer = stringLocalizer;
            _context = context;
            _userManager = userManager;
        }

        public async Task CreateAsync(TeacherCreateDto teacherCreateDto, Guid UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            string message = _stringLocalizer.GetString("NotFoundExceptionMsg");
            if (user is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            teacherDetails teacherDetails = _mapper.Map<teacherDetails>(teacherCreateDto);
            var result = await _userManager.AddToRoleAsync(user, Roles.Teacher.ToString());
            teacherDetails.AppUserID = UserId;
            await _writeRepo.addAsync(teacherDetails);
            await _writeRepo.SaveChangesAsync();
        }
        public async Task<List<TeacherGetDto>> GetAllAsync()
        {
            var teachers = await _readRepo.GetAll().ToListAsync();
            List<TeacherGetDto> List = _mapper.Map<List<TeacherGetDto>>(teachers);
            return List;
        }

        public  async Task<TeacherGetDto> getById(Guid UserId)
        {
            var teachers = await _readRepo.GetByExpressionAsync(u=>u.AppUserID == UserId);
            string message = _stringLocalizer.GetString("NotFoundExceptionMsg");
            if (teachers is null )
            {
                throw new notFoundException("user" + " " + message);
            }
            TeacherGetDto teacher = _mapper.Map<TeacherGetDto>(teachers);
            return teacher;
        }
        public async Task Remove(Guid UserId)
        {
            var teachers = await _readRepo.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _stringLocalizer.GetString("NotFoundExceptionMsg");
            if (teachers is null)
            {
                throw new notFoundException(message);
            }
            _writeRepo.remove(teachers);
            await _writeRepo.SaveChangesAsync();
        }
        public async Task UpdateAsync(TeacherUpdateDto updateDto, Guid UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            var teacher = await _readRepo.GetByExpressionAsync(u => u.AppUserID == UserId);
            string message = _stringLocalizer.GetString("NotFoundExceptionMsg");
            if (teacher is null)
            {
                throw new notFoundException("user"+" "+message);
            }
            _mapper.Map(updateDto, teacher);
            await _writeRepo.SaveChangesAsync();
        }
    }
}
