import {Router} from "express";
import {db} from "./db";

const router = Router();


router.get("/", async (req, res) => {
    try {
        console.log("hola");
      const socis = await db.soci.findMany({
        orderBy: { cognoms: "asc" },
        select: {
          nom: true,
          cognoms: true,
          email: true
          
        },
      });
      res.status(200).json({ socis });
    } catch (e) {
      res.status(500).json({ error: "Internal Error" });
    }
  });

export default router;
/*
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

*/


