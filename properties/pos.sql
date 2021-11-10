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
    icon text
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
-- Name: price; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.price (
    id bigint NOT NULL,
    product_id character varying(255),
    starting_price character varying(255),
    dine_in_price character varying(255),
    take_away_price character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.price OWNER TO postgres;

--
-- Name: price_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.price_id_seq OWNER TO postgres;

--
-- Name: price_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.price_id_seq OWNED BY production.price.id;


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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    price character varying(255)
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
    trx_status character varying(255),
    total_price character varying(255),
    trx_type character varying(255)
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
-- Name: price id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.price ALTER COLUMN id SET DEFAULT nextval('production.price_id_seq'::regclass);


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
	(5, '6116679250d16bd1', 'INV-1636512014594', 'Adia', '2021-11-10 09:40:14', 'Adia', '2021-11-10 09:40:14'),
	(7, '372f80ab406758a5', 'INV-1636526506658', 'Adia', '2021-11-10 13:41:46', 'Adia', '2021-11-10 13:41:46');


--
-- Data for Name: lg_payment; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment VALUES
	(24, 'INV-1636512014594', 'CASH', '50000', '55000', 'PAID', '00', 'Adia', '2021-11-10 09:40:14', 'Adia', '2021-11-10 09:40:14', '-', '1'),
	(26, 'INV-1636526506658', 'CC', '50000', '55000', 'PAID', '00', 'Adia', '2021-11-10 13:41:46', 'Adia', '2021-11-10 13:41:46', '0118625901000100218116259000356DA BCA 2       002216001249D000002000000000002000000537941******6388                       211103084819084819000000000022160000000000000000000000000000                   000000                                                                                                                                                                        ', '1');


--
-- Data for Name: lg_payment_cash; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment_cash VALUES
	(17, 'INV-1636512014594', '50000', '55000', '5000', 'Adia', '2021-11-10 09:40:14', 'Adia', '2021-11-10 09:40:14');


--
-- Data for Name: lg_payment_edc; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment_edc VALUES
	(3, 'INV-1636526506658', '01', '18625901', '000356', 'DA BCA 2       ', '002216', 'D', '000002000000', '000002000000', '537941******6388   ', '                    211103', '084819', '084819', '000000', '00', '002216000000', '0000000000000000', '000000      ', '             000000', '      ', '                                                                                        ', 'Toko Makanan', '123', '000100218116259');


--
-- Data for Name: merchant; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.merchant VALUES
	(1, 'Nasgor Ahay', '1', 'Adia', '2021-10-27 11:11:42.91665', 'Adia', '2021-10-27 11:11:42.91665');


--
-- Data for Name: price; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.price VALUES
	(1, '1', '10000', '12000', '11000', 'Adia', '2021-11-09 11:40:24.140405', 'Adia', '2021-11-09 11:40:24.140405'),
	(2, '13', '5000', '10000', '7500', 'Adia', '2021-11-09 13:23:11.279', 'Adia', '2021-11-09 13:23:11.279'),
	(3, '2', '10000', '15000', '14500', 'Adia', '2021-11-09 13:35:31.488', 'Adia', '2021-11-09 13:34:44.886602');


--
-- Data for Name: product; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.product VALUES
	(7, 'Nasi Padang', '1', '1', 'Adia', '2021-11-05 09:34:52.653', 'Adia', '2021-11-05 09:34:52.653', '16360796926226b12cc446670.jpg', 'true'),
	(8, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-05 09:43:46.701', 'Adia', '2021-11-05 09:43:46.701', '163608022665802ee13fa8d66.jpg', 'true'),
	(12, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-08 15:48:58.063', 'Adia', '2021-11-08 15:48:58.063', '16363613379244d298355dc38.jpg', 'true'),
	(1, 'Nasi Goreng Pedas', '1', '1', 'Adia', '2021-11-05 10:32:20.28', 'Adia', '2021-10-25 16:16:13.955639', '1636082867093125fd10b923f.jpeg', 'true'),
	(13, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-09 13:23:11.279', 'Adia', '2021-11-09 13:23:11.279', '16364389888853bb505f43a2c.jpg', 'true'),
	(2, 'Soto Banjar', '1', '1', 'Adia', '2021-11-09 13:35:31.488', 'Adia', '2021-10-27 14:34:24.7', '1636095481269f06cd2658b3f.jpeg', 'true');


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
	(19, '6116679250d16bd1', '1', '5', 'Adia', '2021-11-10 09:35:47', 'Adia', '2021-11-10 09:35:47', '25000'),
	(20, '6116679250d16bd1', '2', '5', 'Adia', '2021-11-10 09:35:47', 'Adia', '2021-11-10 09:35:47', '25000'),
	(21, '372f80ab406758a5', '1', '5', 'Adia', '2021-11-10 09:57:37', 'Adia', '2021-11-10 09:57:37', '25000'),
	(22, '372f80ab406758a5', '2', '5', 'Adia', '2021-11-10 09:57:37', 'Adia', '2021-11-10 09:57:37', '25000'),
	(23, '2233b22f012b349e', '1', '5', 'Adia', '2021-11-10 15:40:33', 'Adia', '2021-11-10 15:40:33', '25000'),
	(24, '2233b22f012b349e', '2', '5', 'Adia', '2021-11-10 15:40:33', 'Adia', '2021-11-10 15:40:33', '25000'),
	(25, 'df6a40bf02dd5f3f', '1', '5', 'Adia', '2021-11-10 15:53:44', 'Adia', '2021-11-10 15:53:44', '25000'),
	(26, 'df6a40bf02dd5f3f', '2', '5', 'Adia', '2021-11-10 15:53:44', 'Adia', '2021-11-10 15:53:44', '25000');


--
-- Data for Name: transaction_header; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.transaction_header VALUES
	(21, '6116679250d16bd1', '1', 'Adia', '10', 'Adia', '2021-11-10 09:40:14', 'Adia', '2021-11-10 09:35:47', 'PAID', '50000', 'Dine In'),
	(22, '372f80ab406758a5', '1', 'Adia', '10', 'Adia', '2021-11-10 13:41:46', 'Adia', '2021-11-10 09:57:37', 'UNPAID', '50000', 'Dine In'),
	(23, '2233b22f012b349e', '1', 'Adia', '10', 'Adia', '2021-11-10 15:40:33', 'Adia', '2021-11-10 15:40:33', 'UNPAID', '50000', 'Dine In'),
	(24, 'df6a40bf02dd5f3f', '1', 'Adia', '10', 'Adia', '2021-11-10 15:53:44', 'Adia', '2021-11-10 15:53:44', 'UNPAID', '50000', 'Dine In');


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

SELECT pg_catalog.setval('production.invoice_has_trx_id_seq', 7, true);


--
-- Name: lg_payment_cash_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_cash_id_seq', 17, true);


--
-- Name: lg_payment_edc_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_edc_id_seq', 3, true);


--
-- Name: lg_payment_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_id_seq', 26, true);


--
-- Name: merchant_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.merchant_id_seq', 1, true);


--
-- Name: price_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.price_id_seq', 3, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.product_id_seq', 13, true);


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

SELECT pg_catalog.setval('production.transaction_detail_id_seq', 26, true);


--
-- Name: transaction_header_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.transaction_header_id_seq', 24, true);


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
-- Name: price price_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.price
    ADD CONSTRAINT price_pkey PRIMARY KEY (id);


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

