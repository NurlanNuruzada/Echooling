using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.CourseCategory;
using Echooling.Aplication.Abstraction.Repository.CourseReviewRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CourseReviewDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class CourseReviewService : ICourseReviewServices
    {
        private readonly ICourseReviewWriteRepository _WriteRepository ;
        private readonly ICourseReviewReadRepository _ReadRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;

        public CourseReviewService(ICourseReviewWriteRepository writeRepository,
                                   ICourseReviewReadRepository readRepository,
                                   IMapper mapper,
                                   IStringLocalizer<ErrorMessages> localizer)
        {
            _WriteRepository = writeRepository;
            _ReadRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
        }

        public async Task AddReview(CreateCourseReviewDto review)
        {
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (review is null)
            {
                throw new notFoundException("review" + " " + message);
            }
            var CreateReview = _mapper.Map<CourseReview>(review);
            CreateReview.IsDeleted = false;
            await _WriteRepository.addAsync(CreateReview);
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task Delete(Guid ReviewId, Guid userId)
        {
            var review = await _ReadRepository.GetByIdAsync(ReviewId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (review is null)
            {
                throw new notFoundException("review" + " " + message);
            }
            if (review.UserId != userId)
            {
                throw new NoAcsessException("this review can't be deleted by this user!");
            }
            review.IsDeleted = true;
            await _WriteRepository.SaveChangesAsync();
        }

        public async Task<GetCourseReviewDto> getbyId(Guid CourseId)
        {
            var review = await _ReadRepository.GetByIdAsync(CourseId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (review is null && review.isEdited == true)
            {
                throw new notFoundException("review" + " " + message);
            }
            var fountReview =  _mapper.Map<GetCourseReviewDto>(review);
            return fountReview;
        }

        public async Task<List<GetCourseReviewDto>> getReviewsOfCourseById(Guid CourseId)
        {
            var review = await _ReadRepository.GetAll()
                .Where(r => r.IsDeleted == false && r.CourseId == CourseId)
                .ToListAsync();
            var List = _mapper.Map<List<GetCourseReviewDto>>(review);
            return List;
        }

        public async Task UpdateAsync(CreateCourseReviewDto reviewDto, Guid ReviewId, Guid userId)
        {
            var Review = await _ReadRepository.GetByIdAsync(ReviewId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Review is null && Review.isEdited == true)
            {
                throw new notFoundException("review" + " " + message);
            }
            _mapper.Map(reviewDto, Review);
            Review.isEdited = true;
            await _WriteRepository.SaveChangesAsync();
        }
    }
}
