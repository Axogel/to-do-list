import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count();
  if (count === 0) {
    await prisma.user.createMany({
      data: [
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
      ],
    });
    console.log('🌱 Database seeded!');
  } else {
    console.log('✅ Database already seeded');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
