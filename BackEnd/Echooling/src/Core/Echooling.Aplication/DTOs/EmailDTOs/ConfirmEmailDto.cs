using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.DTOs.EmailDTOs
{
    public class ConfirmEmailDto
    {
        public string userId { get; set; }  
        public string token { get; set; }
    }
}
