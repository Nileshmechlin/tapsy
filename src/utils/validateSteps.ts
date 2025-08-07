export function getNextStep(user: any): number {
    if (!user.userType) return 1;
    if (user.userType === 'BUSINESS') {
      if (!user.businessName) return 2;
      if (!user.businessTags?.length) return 3;
      if (!user.discoveryTags?.length) return 4;
      if (!user.businessDetailsId) return 5;
    }
    if (!user.mobileNumber || !user.otpVerified) return 6;
    return 7;
  }