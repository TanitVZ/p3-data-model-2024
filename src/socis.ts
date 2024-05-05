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



const sociQuotaBodySchema = z.object({
  nom: z.string().trim().min(2).max(25),
  cognoms: z.string().trim().min(2).max(200),
  dni: z
    .string()
    .trim()
    .max(9)
    .toUpperCase()
    .refine((v) => validarDNI(v), "DNI incorrecte"),
  email: z.string().email("Email incorrecte"),
  quotaSoci: z.object({
    quantitat: z.coerce.number().min(5),
    iban: z
      .string()
      .length(24)
      .refine((v) => validarIBAN(v), "IBAN incorrecte"),
    quotaId: z.coerce.number(),
  }),
});

const sociComissioBodySchema = z.object({
  comissioId: z.array(z.coerce.number()),
  sociId: z.coerce.number(),
});

router.get(
  "/soci",
  catchErrors(async (req, res) => {
    const socis = await db.soci.findMany({
      orderBy: { cognoms: "asc" },
      select: {
        sociId: true,
        nom: true,
        dni: true,
        email: true,
      },
    });
    send(res).ok(socis);
  })
);

//SOCIS
router.get(
  "/soci/:id",
  catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
    const soci = await db.soci.findUniqueOrThrow({ where: { sociId } });
    send(res).ok(soci);
  })
);


router.delete(
  "/soci/:id",
  catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
    const deletedSoci = await db.soci.delete({ where: { sociId } });
    send(res).ok(deletedSoci);
  })
);

router.put(
  "/soci/:id",
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

//QUOTES

router.get(
  "/quotes",
  catchErrors(async (req, res) => {
    const quotes = await db.quotaSoci.findMany({
      select: {
        quotaSociId: true,
        soci: {
          select: {
            nom: true,
            cognoms: true,
          },
        },
        quantitat: true,
        iban: true,
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
  "/quotes",
  catchErrors(async (req, res) => {
    const sociQuotaData = sociQuotaBodySchema.parse(req.body);
    const soci = await db.soci.create({
      data: {
        nom: sociQuotaData.nom,
        cognoms: sociQuotaData.cognoms,
        dni: sociQuotaData.dni,
        email: sociQuotaData.email,

        quotaSoci: {
          create: {
            quantitat: sociQuotaData.quotaSoci.quantitat,
            iban: sociQuotaData.quotaSoci.iban,
            quotaId: sociQuotaData.quotaSoci.quotaId,
          },
        },
      },
      include: {
        quotaSoci: true,
      },
    });

    send(res).createOk(soci);
  })
);

router.put(
  "/quotes/:id",
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

//COMISSIONS

router.post(
  "/comissio",
  catchErrors(async (req, res) => {
    const sociComissioData = sociComissioBodySchema.parse(req.body);
    const sociComissioDataMap = sociComissioData.comissioId.map((c) => ({
      comissioId: c,
      sociId: sociComissioData.sociId,
    }));

    const sociComissio = await db.comissioSoci.createMany({
      data: sociComissioDataMap,
    });
    send(res).createOk(sociComissio);
  })
);

router.get(
  "/comissio",
  catchErrors(async (req, res) => {
    const comissions = await db.comissioSoci.findMany({
      select: {
        soci: {
          select: {
            nom: true,
            cognoms: true,
          },
        },
        comissio: {
          select: {
            nom: true,
          },
        },
      },
    });
    send(res).ok(comissions);
  })
);

router.delete(
  "/comissio/:id",
  catchErrors(async (req, res) => {
    const { id: comissioSocisId } = idParamSchema.parse(req.params);
    const deletedComissioSoci = await db.comissioSoci.delete({
      where: { comissioSocisId },
    });
    send(res).ok(deletedComissioSoci);
  })
);

export default router;
