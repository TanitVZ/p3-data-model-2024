import {Router} from "express";
import {db} from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import { z } from "zod";

const router = Router();

const idParam = z.object({
  id: z.coerce.number(),
});

router.get("/", catchErrors(async (req, res) => {
        
      const socis = await db.soci.findMany({
        orderBy: { cognoms: "asc" },
        select: {
          nom: true,
          cognoms: true,
          email: true
          
        },
      });
      send(res).ok(socis);
    
  })
);

    router.get(
      "/:id",
      catchErrors(async (req, res) => {
        const { id: sociId } = idParam.parse(req.params);
        const forum = await db.soci.findUniqueOrThrow({ where: { sociId } });
        send(res).ok(forum);
      })
    );
    




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


