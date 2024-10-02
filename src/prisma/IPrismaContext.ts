import { Client, PrismaClient } from '@prisma/client';

export interface IPrismaContext {
  db: PrismaClient;
  res: any;
  req: {
    userId: string | null;
    me: Client;
  };
}
