export const userRegistrationTemplate = (userName: string) => {
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
            max-width: 500px;
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
            <h1>Welcome to EventManage, ${userName}!</h1>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            <p>Thank you for registering with EventManage. We are thrilled to have you as part of our community. Our platform is dedicated to providing you with the best event management experience. Explore, create, and manage your events with ease.</p>
            <p>Best regards,
            <br>
            The EventManage Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EventManage. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  