const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    try {
        // Read residency.json
        const rawData = fs.readFileSync('residency.json');
        const residencies = JSON.parse(rawData);

        // Insert each residency into the database
        for (const residency of residencies) {
            await prisma.residency.create({
                data: {
                    // Map residency JSON fields to Prisma model fields
                    title: residency.title,
                    description: residency.description,
                    price: residency.price,
                    address: residency.address,
                    city: residency.city,
                    country: residency.country,
                    image: residency.image,
                    facilities: residency.facilities,
                    userEmail: residency.userEmail,
                    // Assuming createdAt and updatedAt are Date objects
                    createdAt: new Date(residency.createdAt.$date),
                    updatedAt: new Date(residency.updatedAt.$date),
                },
            });
        }

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
