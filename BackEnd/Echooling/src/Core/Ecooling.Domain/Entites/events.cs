namespace Ecooling.Domain.Entites
{
    public class events:BaseEntity
    {
        public ICollection<AppUserEvents>? AppUserEvents { get; set; }
        public ICollection<StaffEvents>? StaffEvents { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventFinishDate { get; set; }
        public decimal? Cost { get; set; }
        public string? Orginazer { get; set; }
        public int? TotalSlot { get; set; }
        public string? Location { get; set; }
        public string? EventTitle { get; set; }
        public string? AboutEvent { get; set; }
        public Guid? EventCategoryiesId { get; set; }
        public EventCategoryies? EventCategoryies{ get; set; }
        public string? ImageRoutue { get; set; }
    }
}
