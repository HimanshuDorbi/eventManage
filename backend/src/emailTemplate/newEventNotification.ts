export const newEventNotification = (eventTitle: string, eventDate: string, eventDescription: string) => `
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
      background-color: #ffffff;
      margin: 50px auto;
      padding: 20px;
      max-width: 600px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;
    }
    .header h1 {
      color: #333333;
    }
    .content {
      padding: 20px;
    }
    .content p {
      color: #666666;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      border-top: 1px solid #eeeeee;
      padding-top: 10px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Event Alert!</h1>
    </div>
    <div class="content">
      <p>A new event, <strong>${eventTitle}</strong>, has been added to EventManage!</p>
      <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
      <p><strong>Description:</strong> ${eventDescription}</p>
      <p>Explore it to see if it's something for you!</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EventManage</p>
    </div>
  </div>
</body>
</html>
`;
