import { faker } from '@faker-js/faker';
import type { User } from '../types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Moni', 'FairMoney'];
const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

export const generate500Users = (): User[] => {
  return Array.from({ length: 500 }).map((_, i) => {
    const genderType = faker.helpers.arrayElement(['male', 'female']) as 'male' | 'female';
    const firstName = faker.person.firstName(genderType);
    const lastName = faker.person.lastName();

    const avatar = `https://api.dicebear.com/7.x/lorelei/svg?seed=${firstName}${i}&gender=${genderType}`;

    return {
      id: faker.string.uuid(),
      orgName: faker.helpers.arrayElement(organizations),
      userName: faker.internet.username({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phoneNumber: faker.phone.number({ style: 'national' }),
      lastActiveDate: faker.date.past({ years: 3 }).toISOString(),
      category: 'Users',
      status: faker.helpers.arrayElement(statuses),
      profile: {
        firstName,
        lastName,
        avatar,
        gender: genderType.charAt(0).toUpperCase() + genderType.slice(1),
        bvn: faker.string.numeric(11),
        address: faker.location.streetAddress(),
        currency: 'NGN',
        maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
        children: faker.number.int({ min: 0, max: 5 }).toString(),
        typeOfResidence: faker.helpers.arrayElement(["Parent's Apartment", 'Rented', 'Owned'])
      },
      guarantor: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number({ style: 'national' }),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        address: faker.location.city()
      },
      socials: {
        facebook: `@${firstName.toLowerCase()}`,
        instagram: `@${firstName.toLowerCase()}`,
        twitter: `@${firstName.toLowerCase()}`
      },
      education: {
        level: faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'HND', 'PHD']),
        employmentStatus: faker.helpers.arrayElement(['Employed', 'Self-Employed', 'Unemployed']),
        sector: faker.person.jobArea(),
        duration: '2 Years',
        officeEmail: faker.internet.email({ firstName, provider: 'office.com' }),
        monthlyIncome: [
          faker.finance.amount({ min: 100000, max: 200000, dec: 0 }),
          faker.finance.amount({ min: 300000, max: 500000, dec: 0 })
        ],
        loanRepayment: faker.finance.amount({ min: 10000, max: 50000, dec: 0 })
      }
    };
  });
};
