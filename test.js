import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function testDB() {
  const players = await prisma.player.findMany();
  console.log('Players in the database:');
  console.log(players);
}

testDB()
  .catch((e) => {
    console.error('Error testing DB:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });