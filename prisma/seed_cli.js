// CLI wrapper to seed Prisma after migrations
const { PrismaClient } = require('@prisma/client');
const seed = require('./seed');

async function main() {
  const prisma = new PrismaClient();
  try {
    await seed(prisma);
  } catch (e) {
    console.error('Seed failed:', e?.message || e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
