using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class Logger:BaseEntity
    {
        public Guid DeletedById { get; set; }
        public DateTime DeleteTime { get; set; }
        public string DeletedEntityName { get; set; } 
        public Guid DeletedEntityId { get; set; }
    }
}
