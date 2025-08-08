"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// TODO: Use environment variables for these settings in production
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'testuser@example.com', // generated ethereal user
        pass: 'password', // generated ethereal password
    },
});
const sendOtpEmail = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: '"Tapsy" <noreply@tapsy.com>',
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<b>Your OTP code is ${otp}</b>`,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendOtpEmail = sendOtpEmail;
