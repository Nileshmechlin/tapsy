import prisma from '../config/db';
import { getNextStep } from '../utils/validateSteps';

export const createUser = async (userType: string) => {
  const user = await prisma.user.create({
    data: { userType, lastCompletedStep: 1 },
  });
  return user;
};

export const updateUser = async (id: string, updates: any) => {
  const updated = await prisma.user.update({
    where: { id },
    data: updates,
    include: { businessDetails: true },
  });

  const nextStep = getNextStep(updated);
  return prisma.user.update({
    where: { id },
    data: {
      lastCompletedStep: nextStep,
      status: nextStep === 7 ? 'VERIFIED' : 'ONBOARDING',
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id }, include: { businessDetails: true } });
};
