using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Greenlight
{
    public class ProgressHub : Hub
    {
        public string msg = "Loading File..";
        public int count = 100;
        public volatile int x;
        public void CallLongOperation()
        {
            
            for (x = 0; x <= count; x++)
            {
                // delay the process to see things clearly
                Thread.Sleep(100);

                if (x == 100)
                {
                    msg = "File Uploaded";
                }

                // call client-side SendMethod method
                Clients.Caller.updatePage(x, msg);
            }
        }

        public async void CancelOperation()
        {
            //mave value of x 100 in order to stop loop in CallLongOperation
            var newX = CancelProgressAsync();

            x = await newX;
            //reset x
            x = 0;
            msg = "File Upload Canceled.";

            await Clients.Caller.updatePage(x, msg);

            
        }

        private async Task<int> CancelProgressAsync()
        {
            x = 100;
            return 100;
        }
    }
}