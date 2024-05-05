--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comissio; Type: TABLE; Schema: public; Owner: ateneumaquia
--

CREATE TABLE public."Comissio" (
    "comissioId" integer NOT NULL,
    nom text NOT NULL
);


ALTER TABLE public."Comissio" OWNER TO ateneumaquia;

--
-- Name: ComissioSoci; Type: TABLE; Schema: public; Owner: ateneumaquia
--

CREATE TABLE public."ComissioSoci" (
    "comissioSocisId" integer NOT NULL,
    "comissioId" integer NOT NULL,
    "sociId" integer NOT NULL
);


ALTER TABLE public."ComissioSoci" OWNER TO ateneumaquia;

--
-- Name: ComissioSoci_comissioSocisId_seq; Type: SEQUENCE; Schema: public; Owner: ateneumaquia
--

CREATE SEQUENCE public."ComissioSoci_comissioSocisId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComissioSoci_comissioSocisId_seq" OWNER TO ateneumaquia;

--
-- Name: ComissioSoci_comissioSocisId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ateneumaquia
--

ALTER SEQUENCE public."ComissioSoci_comissioSocisId_seq" OWNED BY public."ComissioSoci"."comissioSocisId";


--
-- Name: Comissio_comissioId_seq; Type: SEQUENCE; Schema: public; Owner: ateneumaquia
--

CREATE SEQUENCE public."Comissio_comissioId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comissio_comissioId_seq" OWNER TO ateneumaquia;

--
-- Name: Comissio_comissioId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ateneumaquia
--

ALTER SEQUENCE public."Comissio_comissioId_seq" OWNED BY public."Comissio"."comissioId";


--
-- Name: Quota; Type: TABLE; Schema: public; Owner: ateneumaquia
--

CREATE TABLE public."Quota" (
    "quotaId" integer NOT NULL,
    nom text NOT NULL
);


ALTER TABLE public."Quota" OWNER TO ateneumaquia;

--
-- Name: QuotaSoci; Type: TABLE; Schema: public; Owner: ateneumaquia
--

CREATE TABLE public."QuotaSoci" (
    "quotaSociId" integer NOT NULL,
    quantitat integer NOT NULL,
    iban character varying(24) NOT NULL,
    "quotaId" integer NOT NULL,
    "sociId" integer NOT NULL
);


ALTER TABLE public."QuotaSoci" OWNER TO ateneumaquia;

--
-- Name: QuotaSoci_quotaSociId_seq; Type: SEQUENCE; Schema: public; Owner: ateneumaquia
--

CREATE SEQUENCE public."QuotaSoci_quotaSociId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."QuotaSoci_quotaSociId_seq" OWNER TO ateneumaquia;

--
-- Name: QuotaSoci_quotaSociId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ateneumaquia
--

ALTER SEQUENCE public."QuotaSoci_quotaSociId_seq" OWNED BY public."QuotaSoci"."quotaSociId";


--
-- Name: Quota_quotaId_seq; Type: SEQUENCE; Schema: public; Owner: ateneumaquia
--

CREATE SEQUENCE public."Quota_quotaId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Quota_quotaId_seq" OWNER TO ateneumaquia;

--
-- Name: Quota_quotaId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ateneumaquia
--

ALTER SEQUENCE public."Quota_quotaId_seq" OWNED BY public."Quota"."quotaId";


--
-- Name: Soci; Type: TABLE; Schema: public; Owner: ateneumaquia
--

CREATE TABLE public."Soci" (
    "sociId" integer NOT NULL,
    nom text NOT NULL,
    cognoms text NOT NULL,
    dni character varying(9) NOT NULL,
    email text,
    actiu boolean DEFAULT true NOT NULL,
    "dataAlta" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Soci" OWNER TO ateneumaquia;

--
-- Name: Soci_sociId_seq; Type: SEQUENCE; Schema: public; Owner: ateneumaquia
--

CREATE SEQUENCE public."Soci_sociId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Soci_sociId_seq" OWNER TO ateneumaquia;

--
-- Name: Soci_sociId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ateneumaquia
--

ALTER SEQUENCE public."Soci_sociId_seq" OWNED BY public."Soci"."sociId";


--
-- Name: Comissio comissioId; Type: DEFAULT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Comissio" ALTER COLUMN "comissioId" SET DEFAULT nextval('public."Comissio_comissioId_seq"'::regclass);


--
-- Name: ComissioSoci comissioSocisId; Type: DEFAULT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."ComissioSoci" ALTER COLUMN "comissioSocisId" SET DEFAULT nextval('public."ComissioSoci_comissioSocisId_seq"'::regclass);


--
-- Name: Quota quotaId; Type: DEFAULT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Quota" ALTER COLUMN "quotaId" SET DEFAULT nextval('public."Quota_quotaId_seq"'::regclass);


--
-- Name: QuotaSoci quotaSociId; Type: DEFAULT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."QuotaSoci" ALTER COLUMN "quotaSociId" SET DEFAULT nextval('public."QuotaSoci_quotaSociId_seq"'::regclass);


--
-- Name: Soci sociId; Type: DEFAULT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Soci" ALTER COLUMN "sociId" SET DEFAULT nextval('public."Soci_sociId_seq"'::regclass);


--
-- Data for Name: Comissio; Type: TABLE DATA; Schema: public; Owner: ateneumaquia
--

COPY public."Comissio" ("comissioId", nom) FROM stdin;
1	Economia
2	Barra
3	Activitats
4	Xarxes Socials
5	Materials
\.


--
-- Data for Name: ComissioSoci; Type: TABLE DATA; Schema: public; Owner: ateneumaquia
--

COPY public."ComissioSoci" ("comissioSocisId", "comissioId", "sociId") FROM stdin;
1	1	1
2	2	1
3	3	1
5	2	2
6	2	2
\.


--
-- Data for Name: Quota; Type: TABLE DATA; Schema: public; Owner: ateneumaquia
--

COPY public."Quota" ("quotaId", nom) FROM stdin;
1	Anual
2	Trimestral
3	Mensual
\.


--
-- Data for Name: QuotaSoci; Type: TABLE DATA; Schema: public; Owner: ateneumaquia
--

COPY public."QuotaSoci" ("quotaSociId", quantitat, iban, "quotaId", "sociId") FROM stdin;
2	20	ES1520854312671386290654	3	2
3	15	ES9031834039978422822928	2	3
4	15	ES1520956067347973178439	2	4
5	30	ES8502412465310302229896	2	5
1	30	ES0620952995126669338708	1	1
19	30	ES7801289845964173342132	3	22
\.


--
-- Data for Name: Soci; Type: TABLE DATA; Schema: public; Owner: ateneumaquia
--

COPY public."Soci" ("sociId", nom, cognoms, dni, email, actiu, "dataAlta") FROM stdin;
2	Laura	Rubio Planes	25783686L	laura84@hotmail.com	t	2024-05-01 14:59:43.935
3	Iván	Paris Nuñez	25783686L	ivanpn@gmail.com	t	2024-05-01 14:59:43.939
4	Raquel	Montserrat Costa	29828114N	\N	t	2024-05-01 14:59:43.941
5	Marta	Canós Iglesias	69110185S	marta.canos@gmail.com	t	2024-05-01 14:59:43.946
1	Arnau	Valls Bermúdez	55078681Y	arnau.mer@gmail.com	t	2024-05-04 09:16:44.534
22	Laia	Durán Xortó	55318423L	l.duran@gmail.com	t	2024-05-05 17:15:21.793
\.


--
-- Name: ComissioSoci_comissioSocisId_seq; Type: SEQUENCE SET; Schema: public; Owner: ateneumaquia
--

SELECT pg_catalog.setval('public."ComissioSoci_comissioSocisId_seq"', 6, true);


--
-- Name: Comissio_comissioId_seq; Type: SEQUENCE SET; Schema: public; Owner: ateneumaquia
--

SELECT pg_catalog.setval('public."Comissio_comissioId_seq"', 5, true);


--
-- Name: QuotaSoci_quotaSociId_seq; Type: SEQUENCE SET; Schema: public; Owner: ateneumaquia
--

SELECT pg_catalog.setval('public."QuotaSoci_quotaSociId_seq"', 19, true);


--
-- Name: Quota_quotaId_seq; Type: SEQUENCE SET; Schema: public; Owner: ateneumaquia
--

SELECT pg_catalog.setval('public."Quota_quotaId_seq"', 3, true);


--
-- Name: Soci_sociId_seq; Type: SEQUENCE SET; Schema: public; Owner: ateneumaquia
--

SELECT pg_catalog.setval('public."Soci_sociId_seq"', 22, true);


--
-- Name: ComissioSoci ComissioSoci_pkey; Type: CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."ComissioSoci"
    ADD CONSTRAINT "ComissioSoci_pkey" PRIMARY KEY ("comissioSocisId");


--
-- Name: Comissio Comissio_pkey; Type: CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Comissio"
    ADD CONSTRAINT "Comissio_pkey" PRIMARY KEY ("comissioId");


--
-- Name: QuotaSoci QuotaSoci_pkey; Type: CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."QuotaSoci"
    ADD CONSTRAINT "QuotaSoci_pkey" PRIMARY KEY ("quotaSociId");


--
-- Name: Quota Quota_pkey; Type: CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Quota"
    ADD CONSTRAINT "Quota_pkey" PRIMARY KEY ("quotaId");


--
-- Name: Soci Soci_pkey; Type: CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."Soci"
    ADD CONSTRAINT "Soci_pkey" PRIMARY KEY ("sociId");


--
-- Name: Comissio_nom_key; Type: INDEX; Schema: public; Owner: ateneumaquia
--

CREATE UNIQUE INDEX "Comissio_nom_key" ON public."Comissio" USING btree (nom);


--
-- Name: QuotaSoci_sociId_key; Type: INDEX; Schema: public; Owner: ateneumaquia
--

CREATE UNIQUE INDEX "QuotaSoci_sociId_key" ON public."QuotaSoci" USING btree ("sociId");


--
-- Name: Quota_nom_key; Type: INDEX; Schema: public; Owner: ateneumaquia
--

CREATE UNIQUE INDEX "Quota_nom_key" ON public."Quota" USING btree (nom);


--
-- Name: ComissioSoci ComissioSoci_comissioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."ComissioSoci"
    ADD CONSTRAINT "ComissioSoci_comissioId_fkey" FOREIGN KEY ("comissioId") REFERENCES public."Comissio"("comissioId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComissioSoci ComissioSoci_sociId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."ComissioSoci"
    ADD CONSTRAINT "ComissioSoci_sociId_fkey" FOREIGN KEY ("sociId") REFERENCES public."Soci"("sociId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: QuotaSoci QuotaSoci_quotaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."QuotaSoci"
    ADD CONSTRAINT "QuotaSoci_quotaId_fkey" FOREIGN KEY ("quotaId") REFERENCES public."Quota"("quotaId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: QuotaSoci QuotaSoci_sociId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ateneumaquia
--

ALTER TABLE ONLY public."QuotaSoci"
    ADD CONSTRAINT "QuotaSoci_sociId_fkey" FOREIGN KEY ("sociId") REFERENCES public."Soci"("sociId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

