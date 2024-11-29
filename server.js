const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// Email Notification Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Endpoint to handle orders
app.post("/place-order", (req, res) => {
  const { orderDetails } = req.body;
  const emailRecipients = ["9731340538@gmail.com", "973340860@gmail.com"]; // Replace with real email addresses

  emailRecipients.forEach((recipient) => {
    const mailOptions = {
      from: "your-email@gmail.com",
      to: recipient,
      subject: "New Order Received",
      text: `Order Details:\n\n${orderDetails}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Failed to send email to ${recipient}:`, error);
      } else {
        console.log(`Email sent to ${recipient}:`, info.response);
      }
    });
  });

  res.status(200).send("Order placed successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
