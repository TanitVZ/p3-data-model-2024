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
  data: { nom: "Activitats" },
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


const anualQuota = await db.quota.create({
    data : { nom: "Anual"}
});

const trimestralQuota = await db.quota.create({
    data : { nom: "Trimestral"}
});

const mensualQuota = await db.quota.create({
    data : { nom: "Mensual"}
});

console.log(`Creades tipus quotes`);

const arnauSoci = await db.soci.create({
    data: { nom: "Arnau", cognoms: "Valls Bermúdez", dni: "55078681Y", email: "arnau.valls@gmail.com"}

});

const lauraSoci = await db.soci.create({
    data: { nom: "Laura", cognoms: "Rubio Planes", dni: "25783686L", email: "laura84@hotmail.com"}

});

const ivanSoci = await db.soci.create({
    data: { nom: "Iván", cognoms: "Paris Nuñez", dni: "25783686L", email: "ivanpn@gmail.com"}

});

const raquelSoci = await db.soci.create({
    data: { nom: "Raquel", cognoms: "Montserrat Costa", dni: "29828114N"}

});

const martaSoci = await db.soci.create({
    data: { nom: "Marta", cognoms: "Canós Iglesias", dni: "69110185S", email: "marta.canos@gmail.com"}

});

console.log (`Creats socis`);

const arnauQuota = await db.quotaSoci.create({
    data: { quotaId : anualQuota.quotaId, quantitat: 60, iban: "ES4302378064573129048238", sociId: arnauSoci.sociId }

})

const lauraQuota = await db.quotaSoci.create({
    data: { quotaId : mensualQuota.quotaId, quantitat: 20, iban: "ES1520854312671386290654", sociId: lauraSoci.sociId }

})

const ivanQuota = await db.quotaSoci.create({
    data: { quotaId : trimestralQuota.quotaId, quantitat: 15, iban: "ES9031834039978422822928", sociId: ivanSoci.sociId }

})

const raquelQuota = await db.quotaSoci.create({
    data: { quotaId : trimestralQuota.quotaId, quantitat: 15, iban: "ES1520956067347973178439", sociId: raquelSoci.sociId }

})

const martaQuota = await db.quotaSoci.create({
    data: { quotaId : trimestralQuota.quotaId, quantitat: 30, iban: "ES8502412465310302229896", sociId: martaSoci.sociId }

})



 
