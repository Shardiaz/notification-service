namespace signal_r_api.Models
{
    public class Notification
    {
        public string message { get; set; }
        public string label { get; set; }
        public string type { get; set; }
        public string origin { get; set; }
        public long date { get; set; }
    }
}