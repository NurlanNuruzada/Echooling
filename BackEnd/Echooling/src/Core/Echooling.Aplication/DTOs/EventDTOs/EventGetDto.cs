using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.DTOs.EventDTOs
{
    public record EventGetDto(DateTime? EventStartDate,
                              Guid GuId,
                              DateTime? EventFinishDate,
                              decimal? Const,
                              string? orginazer,
                              string? TotalSlot,
                              string? Location,
                              string? EventTitle,
                              string? AboutEvent);

}
