using Ecooling.Domain.Entites;

namespace Echooling.Aplication.DTOs.EventDTOs
{
    public class EventCreateDto
    {
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventFinishDate { get; set; }
        public decimal? Const { get; set; }
        public string? orginazer { get; set; }
        public string? TotalSlot { get; set; }
        public string? Location { get; set; }
        public string? EventTitle { get; set; }
        public string? AboutEvent { get; set; }
    }
}
 