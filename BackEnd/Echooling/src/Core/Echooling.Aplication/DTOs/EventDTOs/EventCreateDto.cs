using Ecooling.Domain.Entites;

namespace Echooling.Aplication.DTOs.EventDTOs
{
    public class EventCreateDto
    {
        public Guid AppUserID { get; set; }
        public ICollection<StaffEvents>? StaffEvents { get; set; }
        public List<AppUser>? Atendances { get; set; }
        public DateTime? EventStartDate { get; set; }
        public decimal? Const { get; set; }
        public string? orginazer { get; set; }
        public string? TotalSlot { get; set; }
        public string? EventEndDate { get; set; }
        public string? Location { get; set; }
        public string? EventTitle { get; set; }
        public string? AboutEvent { get; set; }
    }
}
 