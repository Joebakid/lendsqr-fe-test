export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
}