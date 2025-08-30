import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('qwer1234', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
      credits: 1000, // Give admin plenty of credits
      plan: 'premium',
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
      credits: 1000,
      plan: 'premium',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created/updated:', {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    credits: admin.credits,
  })

  // Create a sample regular user for testing
  const userPassword = await bcrypt.hash('password123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {
      password: userPassword,
    },
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'user',
      credits: 10,
      plan: 'free',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Test user created/updated:', {
    id: testUser.id,
    email: testUser.email,
    name: testUser.name,
    role: testUser.role,
    credits: testUser.credits,
  })

  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Login credentials:')
  console.log('Admin: admin@example.com / qwer1234')
  console.log('User:  user@example.com / password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })