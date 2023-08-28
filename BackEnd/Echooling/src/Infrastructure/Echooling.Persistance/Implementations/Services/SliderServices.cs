using AutoMapper;
using Echooling.Aplication.Abstraction.Repository;
using Echooling.Aplication.Abstraction.Repository.SliderRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Persistance.Implementations.Services
{
    public class SliderServices : ISliderService
    {
        private readonly IMapper _mapper;
        private readonly ISliderReadRepository _readRepository;
        private readonly ISliderWriteRepository _writeRepository;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        public SliderServices(ISliderWriteRepository writeRepository, ISliderReadRepository readRepository, IMapper mapper, IStringLocalizer<ErrorMessages> localizer)
        {

            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
        }
        public async Task CreateAsync(SliderCreateDto categoryCreateDto)
        {
            Slider newSlider = _mapper.Map<Slider>(categoryCreateDto);
            await _writeRepository.addAsync(newSlider);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task<List<SliderGetDto>> GetAllAsync()
        {
            var Sliders = await _readRepository.GetAll().ToListAsync();
            List<SliderGetDto> List = _mapper.Map<List<SliderGetDto>>(Sliders);
            return List;
        }

        public async Task<SliderGetDto> getById(Guid id)
        {
            Slider slider = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            SliderGetDto sliderGetDto = _mapper.Map<SliderGetDto>(slider);
            if (slider is null)
            {
                throw new notFoundException(message);
            }
            else
            {
                return sliderGetDto;
            }
        }
        public async Task Remove(Guid id)
        {
            Slider slider = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (slider is null)
            {
                throw new notFoundException(message);
            }
            _writeRepository.remove(slider);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(SldierUpdateDto sldierUpdateDto, Guid id)
        {
            var Slider = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Slider is null)
            {
                throw new notFoundException(message);
            }
            _mapper.Map(sldierUpdateDto, Slider);
            await _writeRepository.SaveChangesAsync();
        }
    }
}
