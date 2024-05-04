import { Router } from "express";
import { db } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import { z } from "zod";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const sociBodySchema = z.object({
  nom: z.string().min(2).max(25),
  cognoms : z.string().min(2).max(200),
  dni : z.string().max(9),
  email : z.string().email('Email incorrecte'),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const socis = await db.soci.findMany({
      orderBy: { cognoms: "asc" },
      select: {
        nom: true,
        cognoms: true,
        dni : true,
        email: true,
      },
    });
    send(res).ok(socis);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
    const forum = await db.soci.findUniqueOrThrow({ where: { sociId } });
    send(res).ok(forum);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = sociBodySchema.parse(req.body);
    const soci = await db.soci.create({ data });
    send(res).createOk(soci);
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
