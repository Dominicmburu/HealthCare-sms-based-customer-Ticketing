// // Example using Twilio
// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendSMS = async (to: string, message: string) => {
//   try {
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });
//     console.log('SMS sent successfully');
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// };
