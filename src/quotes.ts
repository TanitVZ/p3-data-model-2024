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
  sociId: z.coerce.number(),
});

router.get(
  "/",
  catchErrors(async (req, res) => {
    const quotes = await db.quotaSoci.findMany({
      select: {
        soci: {
          select: {
            nom: true,
            cognoms: true,
          },
        },
        quantitat: true,
        iban : true,
        quota: {
          select: {
            nom: true,
          },
        },
      },
    });
    send(res).ok(quotes);
  })
);

router.post(
  "/:id",
  catchErrors(async (req, res) => {
    const quotaData = quotaBodySchema.parse(req.body);
    const quota = await db.quotaSoci.create({ data: quotaData });
    send(res).createOk(quota);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: quotaSociId } = idParamSchema.parse(req.params);
    console.log(`id:${quotaSociId}`);
    const updateQuota = await db.quotaSoci.update({
      where: { quotaSociId },
      data: {
        quantitat: req.body.quantitat || undefined,
        iban: req.body.iban || undefined,
        quotaId: req.body.quotaId || undefined,
      },
    });
    send(res).ok(updateQuota);
  })
);

export default router;
