import prisma from '../config/db';

export const createUserPersonalization = async (data: {
  name: string;
  slug: string;
  screenType: string;
  sortOrder: number;
  status: boolean;
}) => {
  return prisma.userPersonalization.create({
    data,
  });
};

export const getAllUserPersonalizations = async () => {
  return prisma.userPersonalization.findMany();
};

export const getUserPersonalizationById = async (id: string) => {
  return prisma.userPersonalization.findUnique({
    where: { id },
  });
};

export const updateUserPersonalization = async (id: string, updates: any) => {
  return prisma.userPersonalization.update({
    where: { id },
    data: updates,
  });
};

export const deleteUserPersonalization = async (id: string) => {
  return prisma.userPersonalization.delete({
    where: { id },
  });
};
