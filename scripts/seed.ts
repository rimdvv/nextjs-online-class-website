const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Videography' },
        { name: 'Computer Science' },
        { name: 'English' },
        { name: 'Korean' },
        { name: 'Health' },
        { name: 'Design' },
      ],
    });
    console.log('success');
  } catch (error) {
    console.log('Error seeding the db categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
