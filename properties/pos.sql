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
-- Name: bank_account; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.bank_account (
    id bigint NOT NULL,
    bank_name character varying(255),
    nasabah character varying(255),
    no_rekening character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.bank_account OWNER TO postgres;

--
-- Name: bank_account_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.bank_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.bank_account_id_seq OWNER TO postgres;

--
-- Name: bank_account_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.bank_account_id_seq OWNED BY production.bank_account.id;


--
-- Name: branch; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.branch (
    id bigint NOT NULL,
    location character varying(255),
    merchant_id character varying(255),
    branch_address character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    branch_number integer,
    provinsi character varying(255),
    kota character varying(255),
    kecamatan character varying(255),
    kode_pos character varying(255),
    email character varying(255),
    phone character varying(255),
    fax character varying(255),
    is_active character varying(225),
    kelurahan character varying(255)
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
    branch_id character varying(255),
    merchant_id character varying(255)
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
    approval_code character varying(255),
    bank_name character varying(255),
    amount character varying(255),
    submit_amount character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    invoice_number character varying(255)
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    merchant_code character varying(255),
    is_active character varying(255),
    npwp character varying(255),
    mc_id character varying(255),
    ba_id character varying(255),
    secret_key character varying(255)
);


ALTER TABLE production.merchant OWNER TO postgres;

--
-- Name: merchant_category; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.merchant_category (
    id bigint NOT NULL,
    name character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.merchant_category OWNER TO postgres;

--
-- Name: merchant_category_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.merchant_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.merchant_category_id_seq OWNER TO postgres;

--
-- Name: merchant_category_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.merchant_category_id_seq OWNED BY production.merchant_category.id;


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
    selling_price character varying(255),
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active character varying(255),
    level character varying(255)
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
    trx_type character varying(255),
    merchant_id character varying(255)
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
-- Name: user_branch; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.user_branch (
    id bigint NOT NULL,
    user_code character varying(255),
    hash_password character varying(255),
    branch_id character varying(255),
    role_id character varying(255),
    is_active character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    merchant_id character varying(255)
);


ALTER TABLE production.user_branch OWNER TO postgres;

--
-- Name: user_branch_id_seq; Type: SEQUENCE; Schema: production; Owner: postgres
--

CREATE SEQUENCE production.user_branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE production.user_branch_id_seq OWNER TO postgres;

--
-- Name: user_branch_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: postgres
--

ALTER SEQUENCE production.user_branch_id_seq OWNED BY production.user_branch.id;


--
-- Name: users; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.users (
    id bigint NOT NULL,
    name character varying(255),
    email character varying(255),
    role_id character varying(255),
    hash_password character varying(255),
    is_active character varying(255),
    updated_by character varying(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ktp character varying(255),
    no_hp character varying(255),
    is_otp_validate character varying(255),
    is_email_validate character varying(255)
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
-- Name: bank_account id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.bank_account ALTER COLUMN id SET DEFAULT nextval('production.bank_account_id_seq'::regclass);


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
-- Name: merchant_category id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.merchant_category ALTER COLUMN id SET DEFAULT nextval('production.merchant_category_id_seq'::regclass);


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
-- Name: user_branch id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.user_branch ALTER COLUMN id SET DEFAULT nextval('production.user_branch_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.users ALTER COLUMN id SET DEFAULT nextval('production.users_id_seq'::regclass);


--
-- Data for Name: bank_account; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.bank_account VALUES
	(5, 'BCA', 'Adia', '808090', 'Adia', '2021-11-19 10:43:32.424', 'Adia', '2021-11-19 10:43:32.424'),
	(1, 'Mandiri', 'Guntur', '789', 'Guntur', '2021-11-19 15:50:48.082', 'Guntur', '2021-11-19 15:48:31.495317');


--
-- Data for Name: branch; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.branch VALUES
	(1, 'PIM 1', '1', 'Pondok Indah Mall 1 Lantai 1', 'Adia', '2021-10-27 11:14:35.695598', 'Adia', '2021-10-27 11:14:35.695598', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(2, 'PIM 2', '1', 'Pondok Indah Mall 2 Lantai 2', 'Adia', '2021-11-08 13:32:44.470859', 'Adia', '2021-11-08 13:32:44.470859', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 'Tebet', '7', 'Jl. Tebet Timur dalam', 'Adia', '2021-11-19 10:43:32.424', 'Adia', '2021-11-19 10:43:32.424', 1, 'DKI Jakarta', 'Jakarta Selatan', 'Jakarta Selatan', '1234', 'miewaw.tebet@mail.com', '789123', '789123', 'true', 'Tebet timur');


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
	(8, 'NAH-1-211112-3', 'INV/NAH/1/211112/1', 'Adia', '2021-11-12 15:28:57', 'Adia', '2021-11-12 15:28:57'),
	(9, 'NAH-1-211112-3', 'INV/NAH/1/211112/1', 'Adia', '2021-11-12 15:32:39', 'Adia', '2021-11-12 15:32:39'),
	(10, 'NAH-1-211112-3', 'INV/NAH/1/211112/2', 'Adia', '2021-11-12 15:32:53', 'Adia', '2021-11-12 15:32:53'),
	(11, 'NAH-1-211112-3', 'INV/NAH/1/211113/1', 'Adia', '2021-11-13 10:43:25', 'Adia', '2021-11-13 10:43:25'),
	(12, 'NAH-1-211112-3', 'INV/NAH/1/211013/1', 'Adia', '2021-11-13 10:51:24', 'Adia', '2021-11-13 10:51:24'),
	(13, 'NAH-1-211112-3', 'INV/NAH/1/211113/3', 'Adia', '2021-11-13 11:13:36', 'Adia', '2021-11-13 11:13:36'),
	(14, 'NAH-1-211112-3', 'INV/NAH/1/211113/4', 'Adia', '2021-11-13 11:14:26', 'Adia', '2021-11-13 11:14:26'),
	(15, 'NAH-1-211112-3', 'INV/NAH/1/211113/5', 'Adia', '2021-11-13 04:33:57.748', 'Adia', '2021-11-13 04:33:57.748'),
	(16, 'NAH-1-211112-3', 'INV/NAH/1/211113/7', 'Adia', '2021-11-13 11:36:00', 'Adia', '2021-11-13 11:36:00');


--
-- Data for Name: lg_payment; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment VALUES
	(28, 'INV/NAH/1/211112/1', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-12 15:32:39', 'Adia', '2021-11-12 15:32:39', '1', '1'),
	(29, 'INV/NAH/1/211112/2', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-12 15:32:53', 'Adia', '2021-11-12 15:32:53', '1', '1'),
	(30, 'INV/NAH/1/211113/1', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 10:43:25', 'Adia', '2021-11-13 10:43:25', '1', '1'),
	(31, 'INV/NAH/1/211013/1', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 10:51:24', 'Adia', '2021-11-13 10:51:24', '1', '1'),
	(32, 'INV/NAH/1/211113/3', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 11:13:36.488', 'Adia', '2021-11-13 11:13:36.488', '1', '1'),
	(33, 'INV/NAH/1/211113/4', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 11:14:26.892', 'Adia', '2021-11-13 11:14:26.892', '1', '1'),
	(34, 'INV/NAH/1/211113/5', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 11:33:57.748', 'Adia', '2021-11-13 11:33:57.748', '1', '1'),
	(35, 'INV/NAH/1/211113/6', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 11:35:38.412', 'Adia', '2021-11-13 11:35:38.412', '1', '1'),
	(36, 'INV/NAH/1/211113/7', 'CC', '50000', '50000', 'PAID', '00', 'Adia', '2021-11-13 11:36:00.442', 'Adia', '2021-11-13 11:36:00.442', '1', '1');


--
-- Data for Name: lg_payment_cash; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment_cash VALUES
	(17, 'INV-1636512014594', '50000', '55000', '5000', 'Adia', '2021-11-10 09:40:14', 'Adia', '2021-11-10 09:40:14');


--
-- Data for Name: lg_payment_edc; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.lg_payment_edc VALUES
	(3, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-12 15:32:53', 'Adia', '2021-11-12 15:32:53', 'INV/NAH/1/211112/2'),
	(2, '123', 'BCA', '50000', '50000', 'Adia', '2021-11-12 15:28:57', 'Adia', '2021-11-12 15:28:57', 'INV/NAH/1/211112/1'),
	(4, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-13 10:43:25', 'Adia', '2021-11-13 10:43:25', 'INV/NAH/1/211113/1'),
	(5, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-13 10:51:24', 'Adia', '2021-11-13 10:51:24', 'INV/NAH/1/211013/1'),
	(6, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-13 11:14:26.892', 'Adia', '2021-11-13 11:14:26.892', 'INV/NAH/1/211113/4'),
	(7, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-13 11:33:57.748', 'Adia', '2021-11-13 11:33:57.748', 'INV/NAH/1/211113/5'),
	(8, '123', 'Mandiri', '50000', '50000', 'Adia', '2021-11-13 11:36:00.442', 'Adia', '2021-11-13 11:36:00.442', 'INV/NAH/1/211113/7');


--
-- Data for Name: merchant; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.merchant VALUES
	(2, 'Geprek Cihuy', '2', 'Adia', '2021-11-15 13:45:16.062696', 'Adia', '2021-11-15 13:45:16.062696', 'GPC', 'true', NULL, NULL, NULL, NULL),
	(3, 'Mie Goks', '3', 'Adia', '2021-11-15 15:41:10.962', 'Adia', '2021-11-15 14:36:58.795', 'MWK', 'true', NULL, NULL, NULL, NULL),
	(1, 'Nasgor Ahay', '1', 'Adia', '2021-10-27 11:11:42.91665', 'Adia', '2021-10-27 11:11:42.91665', 'NAH', 'true', '6789', '1', '1', 'NAH-as31k90o'),
	(7, 'Mie Wawawaw', '24', 'Adia', '2021-11-19 10:43:32.424', 'Adia', '2021-11-19 10:43:32.424', 'MWW', 'true', '123', '1', '5', 'MWW-c3af11a1');


--
-- Data for Name: merchant_category; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.merchant_category VALUES
	(1, 'FnB', 'Adia', '2021-11-19 09:56:46.827893', 'Adia', '2021-11-19 09:56:46.827893');


--
-- Data for Name: price; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.price VALUES
	(1, '1', '10000', '12000', 'Adia', '2021-11-09 11:40:24.140405', 'Adia', '2021-11-09 11:40:24.140405'),
	(2, '13', '5000', '10000', 'Adia', '2021-11-09 13:23:11.279', 'Adia', '2021-11-09 13:23:11.279'),
	(4, '14', '5000', '10000', 'Adia', '2021-11-11 14:57:30.621', 'Adia', '2021-11-11 14:57:30.621'),
	(5, '15', '5000', NULL, 'Adia', '2021-11-15 15:48:34.863', 'Adia', '2021-11-15 15:48:34.863'),
	(6, '16', '5000', '10000', 'Adia', '2021-11-15 15:50:11.753', 'Adia', '2021-11-15 15:50:11.753'),
	(7, '17', '5000', '7500', 'Adia', '2021-11-15 15:50:52.496', 'Adia', '2021-11-15 15:50:52.496'),
	(3, '2', '10000', NULL, 'Adia', '2021-11-15 16:10:20.473', 'Adia', '2021-11-09 13:34:44.886602'),
	(8, '18', '5000', '7500', 'Adia', '2021-11-15 16:24:21.01', 'Adia', '2021-11-15 16:24:21.01'),
	(9, '19', '5000', '750000', 'Adia', '2021-11-15 16:24:41.404', 'Adia', '2021-11-15 16:24:41.404'),
	(10, '20', '5000', '750000', 'Adia', '2021-11-19 09:36:06.274', 'Adia', '2021-11-19 09:36:06.274'),
	(11, '21', '5000', '750000', 'Adia', '2021-11-19 09:37:45.468', 'Adia', '2021-11-19 09:37:45.468'),
	(12, '22', '5000', '750000', 'Adia', '2021-11-19 09:39:10.257', 'Adia', '2021-11-19 09:39:10.257'),
	(13, '23', '5000', '750000', 'Adia', '2021-11-19 09:39:28.332', 'Adia', '2021-11-19 09:39:28.332'),
	(14, '24', '5000', '750000', 'Adia', '2021-11-19 09:39:38.091', 'Adia', '2021-11-19 09:39:38.091');


--
-- Data for Name: product; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.product VALUES
	(7, 'Nasi Padang', '1', '1', 'Adia', '2021-11-05 09:34:52.653', 'Adia', '2021-11-05 09:34:52.653', '16360796926226b12cc446670.jpg', 'true'),
	(8, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-05 09:43:46.701', 'Adia', '2021-11-05 09:43:46.701', '163608022665802ee13fa8d66.jpg', 'true'),
	(12, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-08 15:48:58.063', 'Adia', '2021-11-08 15:48:58.063', '16363613379244d298355dc38.jpg', 'true'),
	(1, 'Nasi Goreng Pedas', '1', '1', 'Adia', '2021-11-05 10:32:20.28', 'Adia', '2021-10-25 16:16:13.955639', '1636082867093125fd10b923f.jpeg', 'true'),
	(13, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-09 13:23:11.279', 'Adia', '2021-11-09 13:23:11.279', '16364389888853bb505f43a2c.jpg', 'true'),
	(14, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-11 14:57:30.621', 'Adia', '2021-11-11 14:57:30.621', '16366174506019020f05962ac.jpg', 'true'),
	(15, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-15 15:48:34.863', 'Adia', '2021-11-15 15:48:34.863', '1636966112215574da03aa9ee.jpg', 'true'),
	(16, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-15 15:50:11.753', 'Adia', '2021-11-15 15:50:11.753', '1636966211731b8d60ae5ecc5.jpg', 'true'),
	(17, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-15 15:50:52.496', 'Adia', '2021-11-15 15:50:52.496', '16369662524790d322b5f1b28.jpg', 'true'),
	(2, 'Soto Banjar', '1', '1', 'Adia', '2021-11-15 16:10:20.473', 'Adia', '2021-10-27 14:34:24.7', '1636095481269f06cd2658b3f.jpeg', 'true'),
	(18, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-15 16:24:21.01', 'Adia', '2021-11-15 16:24:21.01', '16369682609909aa1851fb86d.jpg', 'true'),
	(19, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-15 16:24:41.404', 'Adia', '2021-11-15 16:24:41.404', '16369682813896cafe1945cd8.jpg', 'true'),
	(20, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-19 09:36:06.274', 'Adia', '2021-11-19 09:36:06.274', '16372893662278127660d1e08.png', 'true'),
	(21, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-19 09:37:45.468', 'Adia', '2021-11-19 09:37:45.468', '16372894654259c7ed186a030.png', 'true'),
	(22, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-19 09:39:10.257', 'Adia', '2021-11-19 09:39:10.257', 'Nasi_Uduk-31239056.png', 'true'),
	(23, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-19 09:39:28.332', 'Adia', '2021-11-19 09:39:28.332', 'nasi_uduk-3509fdfc.png', 'true'),
	(24, 'Nasi Uduk', '1', '1', 'Adia', '2021-11-19 09:39:38.091', 'Adia', '2021-11-19 09:39:38.091', 'nasi_uduk_7113eefb.png', 'true');


--
-- Data for Name: role; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.role VALUES
	(2, 'Admin', 'Adia', '2021-11-15 13:12:20.179', 'Adia', '2021-11-15 11:37:47.124', 'true', '2'),
	(1, 'Superadmin', 'Adia', '2021-11-08 13:09:02.883839', 'Adia', '2021-11-08 13:09:02.883839', 'true', '1');


--
-- Data for Name: stock; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.stock VALUES
	(1, '1', '1', '100', 'Adia', '2021-10-27 11:09:58.125299', 'Adia', '2021-10-27 11:09:58.125299');


--
-- Data for Name: transaction_detail; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.transaction_detail VALUES
	(36, 'NAH-1-211112-11', '1', '5', 'Adia', '2021-11-12 11:20:09', 'Adia', '2021-11-12 11:20:09', '25000'),
	(37, 'NAH-1-211112-11', '2', '5', 'Adia', '2021-11-12 11:20:09', 'Adia', '2021-11-12 11:20:09', '25000'),
	(38, 'NAH-1-211112-3', '1', '5', 'Adia', '2021-11-12 11:21:18', 'Adia', '2021-11-12 11:21:18', '25000'),
	(39, 'NAH-1-211112-3', '2', '5', 'Adia', '2021-11-12 11:21:18', 'Adia', '2021-11-12 11:21:18', '25000'),
	(40, 'NAH-1-211113-1', '1', '5', 'Adia', '2021-11-13 11:06:09', 'Adia', '2021-11-13 11:06:09', '25000'),
	(41, 'NAH-1-211113-1', '2', '5', 'Adia', '2021-11-13 11:06:09', 'Adia', '2021-11-13 11:06:09', '25000'),
	(42, 'NAH-1-211113-2', '1', '5', 'Adia', '2021-11-13 11:14:31', 'Adia', '2021-11-13 11:14:31', '25000'),
	(43, 'NAH-1-211113-2', '2', '5', 'Adia', '2021-11-13 11:14:31', 'Adia', '2021-11-13 11:14:31', '25000'),
	(44, 'NAH-1-211110-41', '1', '2', 'Adia', '2021-11-13 06:26:28.292', 'Adia', '2021-11-13 06:26:28.292', '10000'),
	(45, 'NAH-1-211110-41', '2', '3', 'Adia', '2021-11-13 06:26:28.292', 'Adia', '2021-11-13 06:26:28.292', '25000');


--
-- Data for Name: transaction_header; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.transaction_header VALUES
	(26, 'NAH-1-211112-11', '1', 'Adia', '10', 'Adia', '2021-11-12 11:20:09', 'Adia', '2021-11-12 11:20:09', 'UNPAID', '50000', 'Dine In', '1'),
	(28, 'NAH-1-211113-1', '1', 'Adia', '10', 'Adia', '2021-11-13 11:06:09', 'Adia', '2021-11-13 11:06:09', 'UNPAID', '50000', 'Dine In', '1'),
	(29, 'NAH-1-211113-2', '1', 'Adia', '10', 'Adia', '2021-11-13 11:14:31.366', 'Adia', '2021-11-13 11:14:31.366', 'UNPAID', '50000', 'Dine In', '1'),
	(27, 'NAH-1-211112-3', '1', 'Adia', '10', 'Adia', '2021-11-13 11:36:00.442', 'Adia', '2021-11-12 11:21:18', 'PAID', '50000', 'Dine In', '1'),
	(25, 'NAH-1-211110-41', '1', 'Adia', '4', 'Adia', '2021-11-13 13:26:28.292', 'Adia', '2021-11-12 11:14:30', 'UNPAID', '35000', 'Dine In', '1');


--
-- Data for Name: user_branch; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.user_branch VALUES
	(2, 'NAH.1.1', '$2b$10$YmUYATisRcdaikSAAJ1nY.WxbR3MXc8J9yzKKL0P0aLW7V2t71fnS', '1', '2', 'true', 'Guntur', '2021-11-19 15:02:19.057', 'Adia', '2021-11-19 11:30:06.476', '1');


--
-- Data for Name: users; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.users VALUES
	(1, 'Adia', 'adia@mail.com', '1', '$2b$10$ukjUuMlfSutf/VLwDn1OnuttdVOVkMTF0hneZ1AVc/vwI4WNjKuQm', 'true', 'Adia', '2021-11-08 11:59:02.815', 'Adia', '2021-11-08 11:59:02.815', NULL, NULL, NULL, NULL),
	(17, 'Dev', 'dev@mail.com', '1', '$2b$10$1tB4qpickXMS6yeNzmFsHu1YM0XILD9HAKCpmuclNfIGIhTG8B1Zq', 'true', 'Dev', '2021-11-15 16:22:46.887', 'Dev', '2021-11-15 16:22:46.887', NULL, NULL, NULL, NULL),
	(24, 'Nana Mulyana', 'nana@mail.com', '2', '$2b$10$DeTLKQzZehmrmCc.chifeeVKU3eU9lsO4MW5TPlQRhzn31picnTNe', 'true', 'Nana', '2021-11-19 09:40:15.062', 'Nana', '2021-11-19 09:40:15.062', 'nana_mulyana_9e4bb85d.png', '08123123', 'false', 'false');


--
-- Name: bank_account_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.bank_account_id_seq', 5, true);


--
-- Name: branch_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.branch_id_seq', 4, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.category_id_seq', 5, true);


--
-- Name: invoice_has_trx_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.invoice_has_trx_id_seq', 16, true);


--
-- Name: lg_payment_cash_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_cash_id_seq', 17, true);


--
-- Name: lg_payment_edc_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_edc_id_seq', 8, true);


--
-- Name: lg_payment_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.lg_payment_id_seq', 36, true);


--
-- Name: merchant_category_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.merchant_category_id_seq', 1, true);


--
-- Name: merchant_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.merchant_id_seq', 7, true);


--
-- Name: price_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.price_id_seq', 14, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.product_id_seq', 24, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.role_id_seq', 2, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.stock_id_seq', 1, true);


--
-- Name: transaction_detail_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.transaction_detail_id_seq', 45, true);


--
-- Name: transaction_header_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.transaction_header_id_seq', 29, true);


--
-- Name: user_branch_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.user_branch_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: production; Owner: postgres
--

SELECT pg_catalog.setval('production.users_id_seq', 24, true);


--
-- Name: bank_account bank_account_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.bank_account
    ADD CONSTRAINT bank_account_pkey PRIMARY KEY (id);


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
-- Name: merchant_category merchant_category_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.merchant_category
    ADD CONSTRAINT merchant_category_pkey PRIMARY KEY (id);


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
-- Name: user_branch user_branch_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.user_branch
    ADD CONSTRAINT user_branch_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

