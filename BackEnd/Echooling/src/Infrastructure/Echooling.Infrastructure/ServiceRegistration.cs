using Echooling.Aplication.Abstraction.Services;
using Echooling.Infrastructure.Services.Token;
using Microsoft.Extensions.DependencyInjection;
namespace Echooling.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastuctureServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenHandler, TokenHandler>();
        }
    }
}
