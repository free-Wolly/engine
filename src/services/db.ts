import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: "minimal"
  // No need to uncomment this
  // datasources: { db: { url: process.env.DATABASE_URL } }
});

export default prisma;
