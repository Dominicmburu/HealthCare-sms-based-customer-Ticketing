import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { sendSMS } from './app';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

console.log('API_KEY:', process.env.API_KEY);
console.log('USERNAME:', process.env.AFRICAS_USERNAME);


app.post('/send-sms', async (req: Request, res: Response) => {
    const { to, message } = req.body;

    // Validate input
    if (!to || !message) {
        res.status(400).json({ error: 'Recipient number and message are required' });
        return;
    }

    try {
        const response = await sendSMS(to, message);
        res.status(200).json({ message: 'SMS sent successfully', response });
        return;
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to send SMS', details: error.message });
        return;
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
