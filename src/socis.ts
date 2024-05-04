import { Router } from "express";
import { db } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import { z } from "zod";
import { validarDNI } from "./validateCustom";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const sociBodySchema = z.object({
  nom: z.string().trim().min(2).max(25),
  cognoms: z.string().trim().min(2).max(200),
  dni: z
    .string()
    .trim()
    .max(9)
    .toUpperCase()
    .refine((v) => validarDNI(v), "DNI incorrecte"),
  email: z.string().email("Email incorrecte"),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const socis = await db.soci.findMany({
      orderBy: { cognoms: "asc" },
      select: {
        sociId: true,
        nom: true,
        cognoms: true,
        dni: true,
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
    const soci = await db.soci.findUniqueOrThrow({ where: { sociId } });
    send(res).ok(soci);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const sociData = sociBodySchema.parse(req.body);
    const soci = await db.soci.create({ data: sociData });
    send(res).createOk(soci);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);

    const updateSoci = await db.soci.update({
      where: { sociId },
      data: {
        nom: req.body.nom || undefined,
        cognoms: req.body.cognoms || undefined,
        email: req.body.email || undefined,
      },
    });
    send(res).ok(updateSoci);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
    const deletedSoci = await db.soci.delete({ where: { sociId } });
    send(res).ok(deletedSoci);
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
