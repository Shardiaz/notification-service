using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using signal_r_api.Models;

namespace signal_r_api.Hubs
{
    public interface INotificationClient
    {
        Task ReceiveNotification(Notification notification);
    }

    public class NotificationHub : Hub<INotificationClient>
    {
        public Task SendNotification(string title, string message)
        {
            return Clients.All.ReceiveNotification(new Notification()
            {
                label = title,
                message = message,
            });
        }
    }
}
