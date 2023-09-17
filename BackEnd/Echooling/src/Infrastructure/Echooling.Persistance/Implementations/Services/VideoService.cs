using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.VideoRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.VideoDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class VideoService : IVideoContentService
    {
        private readonly IMapper _mapper;
        private readonly IVideoContentReadRepository _readRepository;
        private readonly IVideoContentWriteRepository _writeRepository;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public VideoService(IMapper mapper,
                            IVideoContentReadRepository readRepository,
                            IVideoContentWriteRepository writeRepository,
                            IStringLocalizer<ErrorMessages> localizer,
                            IWebHostEnvironment hostingEnvironment)
        {
            _mapper = mapper;
            _readRepository = readRepository;
            _writeRepository = writeRepository;
            _localizer = localizer;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task CreateAsync(CreateVIdeoContentDto CreateDto)
        {
            if (CreateDto.Video == null)
            {
                throw new Exception("No image file provided.");
            }

            string uploadsDirectory = @"C:\Users\Nurlan\Desktop\FinalApp\FrontEnd\echooling\public\Uploads\Course\Videos";
            Directory.CreateDirectory(uploadsDirectory);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (CreateDto.Video is not null)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(CreateDto.Video.FileName);
                string filePath = Path.Combine(uploadsDirectory, fileName);

                using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    await CreateDto.Video.CopyToAsync(fileStream);
                }

                var Video = _mapper.Map<VideoContent>(CreateDto);
                Video.VideoUniqueName = fileName;
                await _writeRepository.addAsync(Video);
                await _writeRepository.SaveChangesAsync();
            }
            if (CreateDto.Video is null)
            {
                throw new notFoundException("video" + message);
            }
        }

        public async Task<List<GetVideoContentDto>> GetAllAsync()
        {
            var Video = await _readRepository.GetAll().ToListAsync();
            List<GetVideoContentDto> List = _mapper.Map<List<GetVideoContentDto>>(Video);

            foreach (GetVideoContentDto VideoDto in List)
            {
                VideoDto.VideoUniqueName = $"{VideoDto.VideoUniqueName}";
            }
            return List;
        }

        public async Task<GetVideoContentDto> getById(Guid id)
        {
            string message = _localizer.GetString("NotFoundExceptionMsg");
            var Video = await _readRepository.GetByIdAsync(id);
            if (Video is null)
            {
                throw new notFoundException(message);
            }
            else
            {
            GetVideoContentDto VideoDto = _mapper.Map<GetVideoContentDto>(Video);
                return VideoDto;
            }
        }

        public async Task Remove(Guid id)
        {
            VideoContent Video = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Video is null)
            {
                throw new notFoundException(message);
            }
            _writeRepository.remove(Video);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(CreateVIdeoContentDto UpdateDto, Guid id)
        {
            string message = _localizer.GetString("NotFoundExceptionMsg");
            var Video = await _readRepository.GetByIdAsync(id);
            if (Video is null)
            {
                throw new notFoundException(message);
            }
            _mapper.Map(UpdateDto, Video);
            await _writeRepository.SaveChangesAsync();
        }
    }
}
