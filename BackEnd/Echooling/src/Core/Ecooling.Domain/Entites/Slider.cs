
namespace Ecooling.Domain.Entites;
public class Slider : BaseEntity
{
    public int Id { get; set; }
    public string ImageRoutue { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string SeccondTile { get; set; } = null!;
    public string Description { get; set; } = null!;

}
