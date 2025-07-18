import { PrismaClient } from "@prisma/client"

// Initialize a single instance and reuse it
const prisma = new PrismaClient()

// Add this for Vercel/Serverless environments
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
}

// Export the instance
export default prisma