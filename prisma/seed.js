import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.playerStats.deleteMany(); // delete stats first because of FK constraint
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  // Create teams
  await prisma.team.createMany({
    data: [
      {
        id: 'phi',
        name: 'Philadelphia Eagles',
        logoUrl: '',
        conference: 'NFC',
        division: 'East',
      },
      {
        id: 'nyg',
        name: 'New York Giants',
        logoUrl: '',
        conference: 'NFC',
        division: 'East',
      },
    ],
  });

  // Create players and related stats
  const cooper = await prisma.player.create({
    data: {
      name: 'Cooper DeJean',
      imageFileName: 'cooper_dejean.jpg',
      number: 3,
      position: 'CB',
      teamId: 'phi',
      overall: 88,
    },
  });

  await prisma.playerStats.create({
    data: {
      playerId: cooper.id,
      gamesPlayed: 12,
      tackles: 45,
      solo: 30,
      assisted: 15,
      sack: 5,
      forcedFumble: 2,
      fumbleRecovery: 1,
      interception: 3,
      passDeflected: 8,
    },
  });

  const hurts = await prisma.player.create({
    data: {
      name: 'Jalen Hurts',
      imageFileName: 'jalen_hurts.jpg',
      number: 1,
      position: 'QB',
      teamId: 'phi',
      overall: 91,
    },
  });

  await prisma.playerStats.create({
    data: {
      playerId: hurts.id,
      gamesPlayed: 17,
      tackles: 0,
      solo: 0,
      assisted: 0,
      sack: 0,
      forcedFumble: 1,
      fumbleRecovery: 0,
      interception: 10,
      passDeflected: 0,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });