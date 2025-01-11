import axios from 'axios';

export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await axios.post(`${process.env.SMS_SERVER_URL}/send-sms`, {
      to,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
};
