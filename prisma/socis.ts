import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();


const socisSenseMail = await db.soci.findMany({
where: {
    email: null
    }

});

const socisTipusQuota = async (quotaId : number) => {
 
    const result = await db.quotaSoci.findMany( {
        where: {
            quotaId : quotaId
        }

    })
    
    return result;
};

const result = await socisTipusQuota(1);

console.log(result);




