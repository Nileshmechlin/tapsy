import prisma from '../config/db';
import { sendOtpEmail } from '../utils/mailer';
import AppError from '../utils/AppError';

export const updateBusinessDetails = async (userId: string, details: any) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  let businessDetails;
  if (user.businessDetailsId) {
    businessDetails = await prisma.businessDetails.update({
      where: { id: user.businessDetailsId },
      data: details,
    });
  } else {
    businessDetails = await prisma.businessDetails.create({
      data: { ...details, userId },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { businessDetailsId: businessDetails.id },
    });
  }

  if (details.email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await prisma.user.update({
      where: { id: userId },
      data: { otp, otpExpires },
    });

    try {
      await sendOtpEmail(details.email, otp);
    } catch (error) {
      throw new AppError('Failed to send OTP email', 500, { originalError: error });
    }
  }

  return prisma.user.findUnique({
    where: { id: userId },
    include: { businessDetails: true },
  });
};
