import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendCustomerEmail = async (booking) => {
  const message = `
Hi ${booking.customerData.fullName},

Your booking has been confirmed!

Reference: ${booking.reference}
Date: ${booking.date}
Start Time: ${booking.startTime}
Duration: ${booking.hours} hours
Deposit Paid: £${booking.depositPaid}

Thank you for booking with Abibaby Event Rentals!
`;

  await transporter.sendMail({
    from: `"Abibaby Rentals" <${process.env.EMAIL_USER}>`,
    to: booking.customerData.email,
    subject: `Booking Confirmation - ${booking.reference}`,
    text: message
  });
};

export const sendAdminEmail = async (booking) => {
  const message = `
New booking received!

Reference: ${booking.reference}
Customer: ${booking.customerData.fullName}
Email: ${booking.customerData.email}
Phone: ${booking.customerData.phone}

Total Items: ${booking.items.length}
Deposit Paid: £${booking.depositPaid}
`;

  await transporter.sendMail({
    from: `"Abibaby System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${booking.reference}`,
    text: message
  });
};