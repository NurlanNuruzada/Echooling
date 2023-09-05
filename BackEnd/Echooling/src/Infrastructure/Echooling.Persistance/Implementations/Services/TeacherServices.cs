using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.TeacherRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class TeacherServices : ITeacherService
    {
        public readonly ITeacherReadRepository _readRepo;
        public readonly ITeacherWriteRepository _writeRepo;
        public readonly IMapper _mapper;
        public readonly IStringLocalizer<ErrorMessages> _stringLocalizer;

        public TeacherServices(ITeacherReadRepository readRepo,
                               ITeacherWriteRepository writeRepo,
                               IMapper mapper,
                               IStringLocalizer<ErrorMessages> stringLocalizer)
        {
            _readRepo = readRepo;
            _writeRepo = writeRepo;
            _mapper = mapper;
            _stringLocalizer = stringLocalizer;
        }

        public async Task CreateAsync(TeacherCreateDto teacherCreateDto)
        {
            if(teacherCreateDto is null)
            {
                throw new ArgumentNullException("teacherDto is null!");
            }
            teacherDetails teacherDetails = _mapper.Map<teacherDetails>(teacherCreateDto);
            await _writeRepo.addAsync(teacherDetails);
            await _writeRepo.SaveChangesAsync();
        }
        public async Task<List<TeacherGetDto>> GetAllAsync()
        {
            var teachers =await _readRepo.GetAll().ToListAsync();
           List<TeacherGetDto> list= _mapper.Map<List<TeacherGetDto>>(teachers);
            return list;
        }
    }
}
