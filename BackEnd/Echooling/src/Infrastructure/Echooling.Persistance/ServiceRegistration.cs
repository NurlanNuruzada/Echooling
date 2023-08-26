﻿using Echooling.Aplication.Abstraction.Repository.SliderRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.Valudators.SliderValudators;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Helper;
using Echooling.Persistance.Implementations.Repositories.SliderRepositories;
using Echooling.Persistance.Implementations.Services;
using Echooling.Persistance.MapperProfile;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Echooling.Persistance;
public static class ServiceRegistration
{
    public static void addPersistanceServices(this IServiceCollection services)
    {
    
        //fluet valudations
        services.AddControllers();
        services.AddFluentValidationAutoValidation();
        services.AddFluentValidationClientsideAdapters();
        services.AddValidatorsFromAssemblyContaining<SliderCreateDtoValudator>();
        //auto mapper
        services.AddAutoMapper(typeof(SliderProfile).Assembly);

        //dbContext
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(Configuration.ConnetionString);
        });
        //read write repos
        services.AddReadRepositories();
        services.AddWriteRepositories();

        //services
        services.AddScoped<ISliderService, SliderServices>();
    }
    private static void AddReadRepositories(this IServiceCollection services)
    {
        //slider
        services.AddScoped<ISliderReadRepository, SliderReadRepository>();
    }
    private static void AddWriteRepositories(this IServiceCollection services)
    {
        //slider
        services.AddScoped<ISliderWriteRepository, SliderWriteRepository>();
    }
}
