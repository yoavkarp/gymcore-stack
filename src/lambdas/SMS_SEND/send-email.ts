import nodemailer from 'nodemailer';


const myMail = 'gymcoremailbox@gmail.com'
// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myMail,
        pass: 'eytz vgoi hgkb vory' // Use an App Password if 2FA is enabled
    }
});

// Send the email
export const sendEmail = (to: string, text: string) => {
    return new Promise<string>((resolve, reject) => {
        const mailOptions = {
            from: myMail,
            to: to,
            subject: 'Your verification code for Gymcore',
            text: text,
            // html: '<b>Hello from Node.js!</b>' // if you want HTML
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                return
            }
            resolve(info.response);
        });
    })
};
