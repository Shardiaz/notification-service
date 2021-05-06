

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using signal_r_api.Hubs;
using signal_r_api.Models;

namespace signal_r_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;

        public NotificationController(IHubContext<NotificationHub, INotificationClient> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> PushNotification([FromBody] Notification notifictaion)
        {
            await _hubContext.Clients.All.ReceiveNotification(notifictaion);
            return new OkResult();
        }
    }
}

