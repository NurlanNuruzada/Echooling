using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class AppUserEvents:BaseEntity
    {
        public Guid? eventsId { get; set; }
        public events? events { get; set; }
        public Guid? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
    }
}
