// Seed function — only creates the default project on first run.
// Admin and client credentials are managed via environment variables (ADMIN_EMAIL, ADMIN_PASSWORD_HASH, etc.)
// and are checked directly in the login route without touching the DB.
async function seed(prismaInstance) {
  const usingProvided = !!prismaInstance;
  const prisma = prismaInstance || new (require('@prisma/client').PrismaClient)();
  try {
    const existingProj = await prisma.project.findUnique({ where: { id: 'default' } });
    if (!existingProj) {
      await prisma.project.create({ data: { id: 'default', title: 'My Renovation' } });
      console.log('Created default project.');
    }
  } finally {
    if (!usingProvided) {
      try { await prisma.$disconnect(); } catch { /* ignore */ }
    }
  }
}

module.exports = seed;
