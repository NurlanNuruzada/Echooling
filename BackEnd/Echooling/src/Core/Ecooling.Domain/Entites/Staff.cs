namespace Ecooling.Domain.Entites
{
    public class Staff:BaseEntity
    {
        public Guid AppUserID { get; set; }
        public ICollection<StaffEvents>? StaffEvents { get; set; }
        public string? hobbies { get; set; }
        public string? faculty { get; set; }
        public string? TotalExperianceHours { get; set; }
        public string? LastestEvent { get; set; }
        public string? EventCount { get; set; }
        public string? Facebook { get; set; }
        public string? twitter { get; set; }
        public string? linkedin { get; set; }
        public string? instagram { get; set; }
        public string? profecion { get; set; }
    }
}
