export const otpTemplate = (otp: string): string => {
  return `
    <html>
      <head>
        <style>
          .container {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .header h1 {
            color: #007bff;
            font-size: 24px;
            margin: 0;
          }
          .content {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
          }
          .otp {
            font-size: 32px;
            color: #007bff;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            border: 1px dashed #007bff;
            border-radius: 8px;
            background-color: #f7f9fc;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #aaaaaa;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Event Management - OTP Verification</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Please use the following OTP to complete your verification:</p>
            <div class="otp">${otp}</div>
            <p>If you did not request this OTP, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you,</p>
            <p>The Event Management Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
