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
        public string PhoneNumber { get; set; }
        public string Fullname { get; set; }
        public int BadgeNumber { get; set; }
        public bool isActive { get; set; }
    }
}
