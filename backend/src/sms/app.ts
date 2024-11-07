import AfricasTalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();

const credentials = {
    apiKey: process.env.API_KEY as string,
    username: process.env.AFRICAS_USERNAME as string,
};

const africasTalking = AfricasTalking(credentials);
const sms = africasTalking.SMS;

interface SMSOptions {
    to: string | string[];
    message: string;
    from: string;
    enqueue?: boolean;
}

export const sendSMS = async (to: string, message: string, from: string = 'AFRICASTKNG') => {
    try {
        const smsOptions: SMSOptions = {
            to,
            message,
            from: "AFRICASTKNG",
            enqueue: true,
        };

        const response = await sms.send(smsOptions);
        
        console.log('SMS sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};
