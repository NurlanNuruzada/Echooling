namespace Ecooling.Domain.Entites
{
    public class StaffEvents:BaseEntity
    {
        public Guid? StaffId { get; set; }
        public Staff? staff { get; set; }
        public Guid? eventsId { get; set; }
        public events? events { get; set; }
    }
}
