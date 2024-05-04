import { Router } from "express";
import { db } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import { z } from "zod";
import { validarDNI, validarIBAN } from "./validateCustom";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const quotaBodySchema = z.object({
  quantitat: z.coerce.number().min(5),
  iban: z
    .string()
    .length(24)
    .refine((v) => validarIBAN(v), "IBAN incorrecte"),
  quotaId: z.coerce.number().max(1),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const quotes = await db.quotaSoci.findMany({
        select: {
            soci : {
                select: {
                    nom :true,
                    cognoms: true
            }
        },
        quantitat: true,
        quota : {
            select: {
                nom: true
            }
        }
    }
    });
    send(res).ok(quotes);
  })
);

export default router;