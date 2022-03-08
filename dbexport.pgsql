--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: parseddata; Type: TABLE; Schema: public; Owner: max
--

CREATE TABLE public.parseddata (
    id integer NOT NULL,
    inflation character varying(255),
    brent character varying(255),
    baserate character varying(255)
);


ALTER TABLE public.parseddata OWNER TO max;

--
-- Name: parseddata_id_seq; Type: SEQUENCE; Schema: public; Owner: max
--

CREATE SEQUENCE public.parseddata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parseddata_id_seq OWNER TO max;

--
-- Name: parseddata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: max
--

ALTER SEQUENCE public.parseddata_id_seq OWNED BY public.parseddata.id;


--
-- Name: parseddata id; Type: DEFAULT; Schema: public; Owner: max
--

ALTER TABLE ONLY public.parseddata ALTER COLUMN id SET DEFAULT nextval('public.parseddata_id_seq'::regclass);


--
-- Data for Name: parseddata; Type: TABLE DATA; Schema: public; Owner: max
--

COPY public.parseddata (id, inflation, brent, baserate) FROM stdin;
1	8.7%	9.75%	71.63
\.


--
-- Name: parseddata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: max
--

SELECT pg_catalog.setval('public.parseddata_id_seq', 17, true);


--
-- Name: parseddata parseddata_pkey; Type: CONSTRAINT; Schema: public; Owner: max
--

ALTER TABLE ONLY public.parseddata
    ADD CONSTRAINT parseddata_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

