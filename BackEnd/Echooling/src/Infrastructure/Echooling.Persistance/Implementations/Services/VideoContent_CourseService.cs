﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.Couse;
using Echooling.Aplication.Abstraction.Repository.VideoContentCourseRepositories;
using Echooling.Aplication.Abstraction.Repository.VideoRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class VideoContent_CourseService : IVideoContentCourseService
    {
        readonly IVideoContent_CourseReadRepository _readRepository;
        readonly IVideoContent_CourseWriteRepository _writeRepository;
        readonly IVideoReadRepository _videoReadRepository;
        readonly IVideoWriteRepository _videoWriteRepository;
        readonly ICourseReadRepository _CourseReadRepository;
        readonly ICourseWriteRepository _courseWriteRepository;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        readonly IMapper _mapper;

        public async Task AddVideoToCourse(Guid eventId, Guid VideoContentId)
        {
            var Course = await _CourseReadRepository.GetByExpressionAsync(u => u.GuId == eventId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Course == null)
            {
                throw new notFoundException("Event " + message);
            }

            var VideoContent = await _videoReadRepository.GetByIdAsync(VideoContentId);
            if (VideoContent == null)
            {
                throw new notFoundException("VideoContent " + message);
            }
            if (Course.VideoCourse == null)
            {
                Course.VideoCourse = new List<Video_Course>();
            }

            var VideoCourse = new Video_Course
            {
                VideoContentId = VideoContentId,
                CourseId = eventId,
                Course = _mapper.Map<Course>(Course),
                VideoContent = _mapper.Map<VideoContent>(VideoContent)
            };

            Course.VideoCourse.Add(VideoCourse);

            await _writeRepository.SaveChangesAsync();
        }
    }
}
