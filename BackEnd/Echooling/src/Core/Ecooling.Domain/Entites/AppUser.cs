using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecooling.Domain.Entites
{
    public class AppUser:IdentityUser
    {
        public string fullname { get; set; }
        public bool isActive { get; set; }
    }
}
