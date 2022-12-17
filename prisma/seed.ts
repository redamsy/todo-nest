// prisma/seed.ts

import { v4 as uuidV4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';
import { defaultUsers } from './utils/constants';

const dateToday = moment.utc(new Date().toUTCString());
const dateTomorrow = moment.utc(new Date().toUTCString()).add(1, 'day');
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const d1 = await prisma.toDo.deleteMany();
  const d2 = await prisma.userPassword.deleteMany();
  const d3 = await prisma.userProfile.deleteMany();

  // create dummy users
  function profile(userId: string, email: string, name: string) {
    return {
      userId,
      email,
      name,
    };
  }

  const profiles = defaultUsers.map((user) => {
    return profile(user.userId, user.email, user.name);
  });

  const profileResult = await prisma.userProfile.createMany({
    data: profiles,
    skipDuplicates: true, // Skip 'Bobo'
  });

  // create dummy userPasswords
  function password(userId: string, email: string, password: string) {
    return {
      userId,
      email,
      password,
    };
  }
  const userPassowords = defaultUsers.map((user) => {
    return password(user.userId, user.email, user.password);
  });
  const passwordResult = await prisma.userPassword.createMany({
    data: userPassowords,
    skipDuplicates: true, // Skip 'Bobo'
  });

  // create two dummy todos
  const id1 = uuidV4();
  const id2 = uuidV4();
  const todoResult = await prisma.toDo.createMany({
    data: [
      {
        id: '604ea235-7471-4c16-b508-3243880457a8',
        title: 'task1',
        description:
          "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
        priority: 'A',
        completed: false,
        date: dateToday.toDate(),
        createdBy: 'user3',
      },
      {
        id: 'e1cf4cdd-60ae-4c0c-bbe8-b95d695bdc41',
        title: 'task2',
        description:
          "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
        priority: 'B',
        completed: false,
        date: dateTomorrow.toDate(),
        createdBy: 'user3',
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({ profileResult, todoResult, passwordResult });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
