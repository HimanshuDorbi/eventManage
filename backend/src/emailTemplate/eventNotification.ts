export const eventNotificationTemplate = (eventTitle: string, eventDate: string, eventDescription: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
        }
        .header img {
          width: 50px;
        }
        .content {
          font-size: 16px;
          line-height: 1.6;
          color: #333333;
        }
        .event-details {
          background-color: #e7f3fe;
          padding: 10px;
          border-left: 4px solid #0073e6;
          margin: 20px 0;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Event Created: ${eventTitle}</h1>
        </div>
        <div class="content">
          <p>Dear ${eventTitle} Organizer,</p>
          <p>Congratulations! You have successfully created an event on EventManage. Below are the details:</p>
          <div class="event-details">
            <h2>${eventTitle}</h2>
            <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${eventDescription}</p>
          </div>
          <p>You can check the number of attendees and other event information from your dashboard.</p>
          <p>Thank you for organizing an event with us. We look forward to a successful event!</p>
          <p>Best regards,</p>
          <p>The EventManage Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} EventManage. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
