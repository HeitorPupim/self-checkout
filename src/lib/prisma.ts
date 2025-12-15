import {PrismaClient} from "@prisma/client";

// Garante que sempre vamos ter uma conexão com o banco de dados mesmo em dev. 


declare global {
   
  var cachedPrisma : PrismaClient ;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

// usado para chamar o banco de dados
export const db = prisma;