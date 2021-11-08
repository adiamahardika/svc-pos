--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12rc1

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
-- Name: branch; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.branch (
    id bigint NOT NULL,
    name character varying(255),
    merchant_id character varying(255),
    address character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.branch OWNER TO postgres;

--
-- Name: branch_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.branch_id_seq OWNER TO postgres;

--
-- Name: branch_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.branch_id_seq OWNED BY production.branch.id;


--
-- Name: category; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.category (
    id bigint NOT NULL,
    name character varying(255),
    merchant_id character varying(10),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active character varying(255),
    icon character varying(255)
);


ALTER TABLE production.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.category_id_seq OWNED BY production.category.id;


--
-- Name: invoice_has_trx; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.invoice_has_trx (
    id bigint NOT NULL,
    transaction_id character varying(255),
    invoice_number character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.invoice_has_trx OWNER TO postgres;

--
-- Name: invoice_has_trx_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.invoice_has_trx_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.invoice_has_trx_id_seq OWNER TO postgres;

--
-- Name: invoice_has_trx_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.invoice_has_trx_id_seq OWNED BY production.invoice_has_trx.id;


--
-- Name: lg_payment; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.lg_payment (
    id bigint NOT NULL,
    invoice_number character varying(255),
    payment_method character varying(255),
    amount character varying(255),
    submit_amount character varying(255),
    status character varying(255),
    response_code character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ecr text,
    branch_id character varying(255)
);


ALTER TABLE production.lg_payment OWNER TO postgres;

--
-- Name: lg_payment_cash; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.lg_payment_cash (
    id bigint NOT NULL,
    invoice_number character varying(255),
    amount character varying(255),
    submit_amount character varying(255),
    change character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.lg_payment_cash OWNER TO postgres;

--
-- Name: lg_payment_cash_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.lg_payment_cash_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.lg_payment_cash_id_seq OWNER TO postgres;

--
-- Name: lg_payment_cash_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.lg_payment_cash_id_seq OWNED BY production.lg_payment_cash.id;


--
-- Name: lg_payment_edc; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.lg_payment_edc (
    id bigint NOT NULL,
    invoice_number character varying(255),
    transaction_type character varying(255),
    tid character varying(255),
    batch_number character varying(255),
    issuer_name character varying(255),
    trace_number character varying(255),
    entry_mode character varying(255),
    amount character varying(255),
    total_amount character varying(255),
    card_number character varying(255),
    cardholder_name character varying(255),
    date character varying(255),
    "time" character varying(255),
    approval_code character varying(255),
    response_code character varying(255),
    ref_number character varying(255),
    billing_number character varying(255),
    balance character varying(255),
    top_up_card_number character varying(255),
    exp_date character varying(255),
    bank_filler character varying(255),
    module_name character varying(255),
    sn character varying(255),
    mid character varying(255)
);


ALTER TABLE production.lg_payment_edc OWNER TO postgres;

--
-- Name: lg_payment_edc_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.lg_payment_edc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.lg_payment_edc_id_seq OWNER TO postgres;

--
-- Name: lg_payment_edc_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.lg_payment_edc_id_seq OWNED BY production.lg_payment_edc.id;


--
-- Name: lg_payment_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.lg_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.lg_payment_id_seq OWNER TO postgres;

--
-- Name: lg_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.lg_payment_id_seq OWNED BY production.lg_payment.id;


--
-- Name: merchant; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.merchant (
    id bigint NOT NULL,
    name character varying(255),
    owner character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.merchant OWNER TO postgres;

--
-- Name: merchant_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.merchant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.merchant_id_seq OWNER TO postgres;

--
-- Name: merchant_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.merchant_id_seq OWNED BY production.merchant.id;


--
-- Name: product; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.product (
    id bigint NOT NULL,
    name character varying(255),
    merchant_id character varying(10),
    category_id character varying(10),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    image character varying(255),
    is_active character varying(255)
);


ALTER TABLE production.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.product_id_seq OWNED BY production.product.id;


--
-- Name: role; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.role (
    id bigint NOT NULL,
    name character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.role_id_seq OWNED BY production.role.id;


--
-- Name: stock; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.stock (
    id bigint NOT NULL,
    product_id character varying(255),
    branch_id character varying(255),
    quantity character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.stock OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.stock_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.stock_id_seq OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.stock_id_seq OWNED BY production.stock.id;


--
-- Name: transaction_detail; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.transaction_detail (
    id bigint NOT NULL,
    transaction_id character varying(255),
    product_id character varying(255),
    quantity character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.transaction_detail OWNER TO postgres;

--
-- Name: transaction_detail_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.transaction_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.transaction_detail_id_seq OWNER TO postgres;

--
-- Name: transaction_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.transaction_detail_id_seq OWNED BY production.transaction_detail.id;


--
-- Name: transaction_header; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.transaction_header (
    id bigint NOT NULL,
    transaction_id character varying(255),
    branch_id character varying(255),
    customer_name character varying(255),
    total_quantity character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    trx_status character varying(255)
);


ALTER TABLE production.transaction_header OWNER TO postgres;

--
-- Name: transaction_header_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.transaction_header_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.transaction_header_id_seq OWNER TO postgres;

--
-- Name: transaction_header_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.transaction_header_id_seq OWNED BY production.transaction_header.id;


--
-- Name: user_has_branch; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.user_has_branch (
    id bigint NOT NULL,
    user_id character varying(255),
    branch_id character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.user_has_branch OWNER TO postgres;

--
-- Name: user_has_branch_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.user_has_branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.user_has_branch_id_seq OWNER TO postgres;

--
-- Name: user_has_branch_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.user_has_branch_id_seq OWNED BY production.user_has_branch.id;


--
-- Name: users; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.users (
    id bigint NOT NULL,
    username character varying(255),
    name character varying(255),
    email character varying(255),
    role_id character varying(255),
    hash_password character varying(255),
    is_active character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.users_id_seq OWNED BY production.users.id;


--
-- Name: branch id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.branch ALTER COLUMN id SET DEFAULT nextval('production.branch_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.category ALTER COLUMN id SET DEFAULT nextval('production.category_id_seq'::regclass);


--
-- Name: invoice_has_trx id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.invoice_has_trx ALTER COLUMN id SET DEFAULT nextval('production.invoice_has_trx_id_seq'::regclass);


--
-- Name: lg_payment id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment ALTER COLUMN id SET DEFAULT nextval('production.lg_payment_id_seq'::regclass);


--
-- Name: lg_payment_cash id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment_cash ALTER COLUMN id SET DEFAULT nextval('production.lg_payment_cash_id_seq'::regclass);


--
-- Name: lg_payment_edc id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment_edc ALTER COLUMN id SET DEFAULT nextval('production.lg_payment_edc_id_seq'::regclass);


--
-- Name: merchant id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.merchant ALTER COLUMN id SET DEFAULT nextval('production.merchant_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.product ALTER COLUMN id SET DEFAULT nextval('production.product_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.role ALTER COLUMN id SET DEFAULT nextval('production.role_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.stock ALTER COLUMN id SET DEFAULT nextval('production.stock_id_seq'::regclass);


--
-- Name: transaction_detail id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.transaction_detail ALTER COLUMN id SET DEFAULT nextval('production.transaction_detail_id_seq'::regclass);


--
-- Name: transaction_header id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.transaction_header ALTER COLUMN id SET DEFAULT nextval('production.transaction_header_id_seq'::regclass);


--
-- Name: user_has_branch id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.user_has_branch ALTER COLUMN id SET DEFAULT nextval('production.user_has_branch_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.users ALTER COLUMN id SET DEFAULT nextval('production.users_id_seq'::regclass);


--
-- Data for Name: branch; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.branch VALUES
	(1, 'PIM 1', '1', 'Pondok Indah Mall 1 Lantai 1', 'Adia', '2021-10-27 11:14:35.695598', 'Adia', '2021-10-27 11:14:35.695598'),
	(2, 'PIM 2', '1', 'Pondok Indah Mall 2 Lantai 2', 'Adia', '2021-11-08 13:32:44.470859', 'Adia', '2021-11-08 13:32:44.470859');


--
-- Data for Name: category; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.category VALUES
	(1, 'Food', '1', 'Adia', '2021-10-25 16:17:08.343609', 'Adia', '2021-10-25 16:17:08.343609', 'true', NULL),
	(2, 'Beverages', '1', 'Adia', '2021-11-05 14:18:16.477', 'Adia', '2021-11-05 14:18:16.477', 'true', NULL),
	(4, 'Snack', '1', 'Adia', '2021-11-05 14:27:06.527', 'Adia', '2021-11-05 14:19:39.391', 'false', NULL);


--
-- Data for Name: invoice_has_trx; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.invoice_has_trx VALUES
	(1, '1', 'INV-1635924103696', 'Adia', '2021-11-03 07:21:43.696', 'Adia', '2021-11-03 07:21:43.696');


--
-- Data for Name: lg_payment; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment VALUES
	(8, 'INV-1635924030715', 'CASH', '1000', '1200', 'PAID', '00', 'Adia', '2021-11-03 14:20:30.715', 'Adia', '2021-11-03 14:20:30.715', '-', NULL),
	(9, 'INV-1635924066310', 'CASH', '1000', '1200', 'PAID', '00', 'Adia', '2021-11-03 14:21:06.31', 'Adia', '2021-11-03 14:21:06.31', '-', '1'),
	(10, 'INV-1635924103696', 'CASH', '1000', '1200', 'PAID', '00', 'Adia', '2021-11-03 14:21:43.696', 'Adia', '2021-11-03 14:21:43.696', '-', '1');


--
-- Data for Name: lg_payment_cash; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment_cash VALUES
	(3, 'INV-1635924103696', '1000', '1200', '200', 'Adia', '2021-11-03 14:21:43.696', 'Adia', '2021-11-03 14:21:43.696');


--
-- Data for Name: lg_payment_edc; Type: TABLE DATA; Schema: production; Owner: postgres
--



--
-- Data for Name: merchant; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.merchant VALUES
	(1, 'Nasgor Ahay', '1', 'Adia', '2021-10-27 11:11:42.91665', 'Adia', '2021-10-27 11:11:42.91665');


--
-- Data for Name: product; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.product VALUES
	(7, 'Nasi Padang', '1', '1', 'Adia', '2021-11-05 09:34:52.653', 'Adia', '2021-11-05 09:34:52.653', '16360796926226b12cc446670.jpg', 'true'),
	(8, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-05 09:43:46.701', 'Adia', '2021-11-05 09:43:46.701', '163608022665802ee13fa8d66.jpg', 'true'),
	(1, 'Nasi Goreng Pedas', '1', '1', 'Adia', '2021-11-05 10:32:20.28', 'Adia', '2021-10-25 16:16:13.955639', '1636082867093125fd10b923f.jpeg', 'true'),
	(2, 'Soto Banjar', '1', '1', 'Adia', '2021-11-05 13:58:03.589', 'Adia', '2021-10-27 14:34:24.7', '1636095481269f06cd2658b3f.jpeg', 'true');


--
-- Data for Name: role; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.role VALUES
	(1, 'Superadmin', 'Adia', '2021-11-08 13:09:02.883839', 'Adia', '2021-11-08 13:09:02.883839');


--
-- Data for Name: stock; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.stock VALUES
	(1, '1', '1', '100', 'Adia', '2021-10-27 11:09:58.125299', 'Adia', '2021-10-27 11:09:58.125299');


--
-- Data for Name: transaction_detail; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.transaction_detail VALUES
	(13, 'ce7c71bcc74a4a88', '1', '5', 'Adia', '2021-11-01 03:52:59.234', 'Adia', '2021-11-01 03:52:59.234'),
	(14, 'ce7c71bcc74a4a88', '2', '5', 'Adia', '2021-11-01 03:52:59.234', 'Adia', '2021-11-01 03:52:59.234'),
	(15, '06b1d0bcaaffbb9e', '1', '5', 'Adia', '2021-11-01 04:02:45.013', 'Adia', '2021-11-01 04:02:45.013'),
	(16, '06b1d0bcaaffbb9e', '2', '5', 'Adia', '2021-11-01 04:02:45.013', 'Adia', '2021-11-01 04:02:45.013');


--
-- Data for Name: transaction_header; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.transaction_header VALUES
	(10, 'ce7c71bcc74a4a88', '1', 'Adia', '10', 'Adia', '2021-11-01 10:52:59.234', 'Adia', '2021-11-01 10:52:59.234', 'SUCCESS'),
	(11, 'e7c71bcc74a4a882', '1', 'Adia', '10', 'Adia', '2021-11-01 10:55:54.105', 'Adia', '2021-11-01 10:55:54.105', 'SUCCESS'),
	(12, '0f984071d9a4024f', '1', 'Adia', '10', 'Adia', '2021-11-01 10:59:17.496', 'Adia', '2021-11-01 10:59:17.496', 'SUCCESS'),
	(13, '3d42d178cdbdad2c', '1', 'Adia', '10', 'Adia', '2021-11-01 10:59:30.763', 'Adia', '2021-11-01 10:59:30.763', 'SUCCESS'),
	(14, 'afa10bb6442490fd', '1', 'Adia', '10', 'Adia', '2021-11-01 11:00:17.565', 'Adia', '2021-11-01 11:00:17.565', 'SUCCESS'),
	(15, '399bc23306f02747', '1', 'Adia', '10', 'Adia', '2021-11-01 11:00:33.983', 'Adia', '2021-11-01 11:00:33.983', 'SUCCESS'),
	(16, '2bab7cef991ac385', '1', 'Adia', '10', 'Adia', '2021-11-01 11:01:12.261', 'Adia', '2021-11-01 11:01:12.261', 'SUCCESS'),
	(17, '5104a078ca020f83', '1', 'Adia', '10', 'Adia', '2021-11-01 11:01:33.692', 'Adia', '2021-11-01 11:01:33.692', 'SUCCESS'),
	(18, 'e06b1d0bcaaffbb9', '1', 'Adia', '10', 'Adia', '2021-11-01 11:02:35.968', 'Adia', '2021-11-01 11:02:35.968', 'SUCCESS'),
	(19, '06b1d0bcaaffbb9e', '1', 'Adia', '10', 'Adia', '2021-11-01 11:02:45.013', 'Adia', '2021-11-01 11:02:45.013', 'SUCCESS');


--
-- Data for Name: user_has_branch; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.user_has_branch VALUES
	(1, '1', '1', 'Adia', '2021-11-08 13:24:43.531934', 'Adia', '2021-11-08 13:24:43.531934'),
	(2, '1', '2', 'Adia', '2021-11-08 13:34:12.070199', 'Adia', '2021-11-08 13:34:12.070199');


--
-- Data for Name: users; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.users VALUES
	(1, 'adia', 'Adia', 'adia@mail.com', '1', '$2b$10$ukjUuMlfSutf/VLwDn1OnuttdVOVkMTF0hneZ1AVc/vwI4WNjKuQm', 'true', 'Adia', '2021-11-08 11:59:02.815', 'Adia', '2021-11-08 11:59:02.815');


--
-- Name: branch_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.branch_id_seq', 2, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.category_id_seq', 4, true);


--
-- Name: invoice_has_trx_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.invoice_has_trx_id_seq', 1, true);


--
-- Name: lg_payment_cash_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_cash_id_seq', 3, true);


--
-- Name: lg_payment_edc_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_edc_id_seq', 2, true);


--
-- Name: lg_payment_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_id_seq', 10, true);


--
-- Name: merchant_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.merchant_id_seq', 1, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.product_id_seq', 10, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.role_id_seq', 1, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.stock_id_seq', 1, true);


--
-- Name: transaction_detail_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.transaction_detail_id_seq', 16, true);


--
-- Name: transaction_header_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.transaction_header_id_seq', 19, true);


--
-- Name: user_has_branch_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.user_has_branch_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.users_id_seq', 16, true);


--
-- Name: branch branch_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: invoice_has_trx invoice_has_trx_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.invoice_has_trx
    ADD CONSTRAINT invoice_has_trx_pkey PRIMARY KEY (id);


--
-- Name: lg_payment_cash lg_payment_cash_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment_cash
    ADD CONSTRAINT lg_payment_cash_pkey PRIMARY KEY (id);


--
-- Name: lg_payment_edc lg_payment_edc_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment_edc
    ADD CONSTRAINT lg_payment_edc_pkey PRIMARY KEY (id);


--
-- Name: lg_payment lg_payment_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.lg_payment
    ADD CONSTRAINT lg_payment_pkey PRIMARY KEY (id);


--
-- Name: merchant merchant_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.merchant
    ADD CONSTRAINT merchant_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- Name: transaction_detail transaction_detail_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.transaction_detail
    ADD CONSTRAINT transaction_detail_pkey PRIMARY KEY (id);


--
-- Name: transaction_header transaction_header_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.transaction_header
    ADD CONSTRAINT transaction_header_pkey PRIMARY KEY (id);


--
-- Name: user_has_branch user_has_branch_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.user_has_branch
    ADD CONSTRAINT user_has_branch_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

