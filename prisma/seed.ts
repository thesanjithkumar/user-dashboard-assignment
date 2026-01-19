const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Create a user (password is "password123")
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        },
    })

    // Create products
    await prisma.product.createMany({
        data: [
            { name: 'Wireless Headphones', price: 99.99, description: 'Noise cancelling' },
            { name: 'Mechanical Keyboard', price: 150.00, description: 'Clicky switches' },
            { name: '4K Monitor', price: 300.00, description: '27 inch display' },
        ],
    })
}
main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })