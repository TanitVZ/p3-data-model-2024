import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const ecoComissio = await db.comissio.create({
  data: { nom: "Economia" },
});
console.log(`Creada comissió ${ecoComissio.nom} amd ID ${ecoComissio.comissioId}`);

const barraComissio = await db.comissio.create({
  data: { nom: "Barra" },
});
console.log(`Creada comissió ${barraComissio.nom} amd ID ${barraComissio.comissioId}`);

const activitatsComissio = await db.comissio.create({
  data: { nom: "Activitat" },
});
console.log(`Creada comissió ${activitatsComissio.nom} amd ID ${activitatsComissio.comissioId}`);

const xxssComissio = await db.comissio.create({
  data: { nom: "Xarxes Socials" },
});
console.log(`Creada comissió ${xxssComissio.nom} amd ID ${xxssComissio.comissioId}`);

const materialsComissio = await db.comissio.create({
  data: { nom: "Materials" },
});
console.log(`Creada comissió ${materialsComissio.nom} amd ID ${materialsComissio.comissioId}`);
