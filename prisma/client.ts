import { PrismaClient } from "@/app/generated/prisma";
//
// using this instead of the line above won't work, error:
// `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`
// import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
