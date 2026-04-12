const { PrismaClient } = require('@prisma/client');
const migrate = require('./prisma/migrate_from_json');

const prisma = new PrismaClient();

async function run() {
    console.log('--- STARTING MANUAL MIGRATION ---');
    try {
        console.log('Cleaning up existing data for a fresh start...');
        // Order matters due to foreign keys
        await prisma.task.deleteMany({});
        await prisma.phase.deleteMany({});
        await prisma.worker.deleteMany({});
        await prisma.expense.deleteMany({});
        await prisma.payment.deleteMany({});
        await prisma.project.deleteMany({});
        
        console.log('Database cleared. Starting import...');
        await migrate(prisma);
        
        console.log('--- MIGRATION FINISHED SUCCESSFULLY ---');
        
        const taskCount = await prisma.task.count();
        const projectCount = await prisma.project.count();
        console.log(`Verified DB Status: ${projectCount} Projects, ${taskCount} Tasks`);
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

run();
