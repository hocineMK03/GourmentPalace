--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: imagetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagetable (
    id integer NOT NULL,
    image_data bytea,
    recipe_id integer,
    file_name character varying(255),
    file_extension character varying(10)
);


ALTER TABLE public.imagetable OWNER TO postgres;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    link text,
    calories real
);


ALTER TABLE public.ingredient OWNER TO postgres;

--
-- Name: ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredient_id_seq OWNER TO postgres;

--
-- Name: ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    userid integer,
    rating integer,
    recipe_id integer
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratings_id_seq OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    instructions text,
    preparation_time real,
    cook_time real,
    ratings integer DEFAULT 3
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipe_id_seq OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;


--
-- Name: recipe_ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ingredient (
    id integer NOT NULL,
    recipe_id integer,
    ingredient_id integer,
    quantity real,
    unit character varying(50)
);


ALTER TABLE public.recipe_ingredient OWNER TO postgres;

--
-- Name: recipe_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipe_ingredient_id_seq OWNER TO postgres;

--
-- Name: recipe_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_ingredient_id_seq OWNED BY public.recipe_ingredient.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    user_id integer,
    token character varying(255) NOT NULL,
    expiration_time timestamp without time zone
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sessions_session_id_seq OWNER TO postgres;

--
-- Name: sessions_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_session_id_seq OWNED BY public.sessions.session_id;


--
-- Name: table1; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.table1 (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.table1 OWNER TO postgres;

--
-- Name: table1_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.table1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.table1_id_seq OWNER TO postgres;

--
-- Name: table1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.table1_id_seq OWNED BY public.table1.id;


--
-- Name: usertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usertable (
    userid integer NOT NULL,
    name character varying(255),
    username character varying(50),
    email character varying(255),
    password character varying(255),
    lastlogin timestamp without time zone,
    registration timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    isverified boolean DEFAULT false,
    is_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.usertable OWNER TO postgres;

--
-- Name: usertable_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usertable_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usertable_userid_seq OWNER TO postgres;

--
-- Name: usertable_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usertable_userid_seq OWNED BY public.usertable.userid;


--
-- Name: ingredient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: recipe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);


--
-- Name: recipe_ingredient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient ALTER COLUMN id SET DEFAULT nextval('public.recipe_ingredient_id_seq'::regclass);


--
-- Name: sessions session_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN session_id SET DEFAULT nextval('public.sessions_session_id_seq'::regclass);


--
-- Name: table1 id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.table1 ALTER COLUMN id SET DEFAULT nextval('public.table1_id_seq'::regclass);


--
-- Name: usertable userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable ALTER COLUMN userid SET DEFAULT nextval('public.usertable_userid_seq'::regclass);


--
-- Data for Name: imagetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagetable (id, image_data, recipe_id, file_name, file_extension) FROM stdin;
\.


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient (id, name, link, calories) FROM stdin;
12	artichoke	https://simple.wikipedia.org/wiki/Artichoke 	47
13	aubergine	https://simple.wikipedia.org/wiki/Aubergine	25
14	asparagus	https://simple.wikipedia.org/wiki/Asparagus	20
15	broccoflower	https://simple.wikipedia.org/wiki/Broccoflower	31
16	broccoli	https://simple.wikipedia.org/wiki/Broccoli	34
17	brussels sprouts	https://simple.wikipedia.org/wiki/Brussels_sprouts	43
18	cabbage	https://simple.wikipedia.org/wiki/Cabbage	25
19	kohlrabi	https://simple.wikipedia.org/wiki/Kohlrabi	27
20	Savoy cabbage	https://simple.wikipedia.org/wiki/Savoy_cabbage	27
21	red cabbage	https://simple.wikipedia.org/wiki/Red_cabbage	28
22	sour cabbage	https://simple.wikipedia.org/w/index.php?title=Sour_cabbage&action=edit&redlink=1	20
23	cauliflower	https://simple.wikipedia.org/wiki/Cauliflower	25
24	celery	https://simple.wikipedia.org/wiki/Celery	15
25	cichory	https://simple.wikipedia.org/w/index.php?title=Cichory&action=edit&redlink=1	23
26	cilantro	https://simple.wikipedia.org/wiki/Cilantro	3.68
27	dillettuce	https://simple.wikipedia.org/w/index.php?title=Dillettuce&action=edit&redlink=1	15
28	dilloriander	https://simple.wikipedia.org/w/index.php?title=Dilloriander&action=edit&redlink=1	31.07
29	eggplant	https://simple.wikipedia.org/wiki/Eggplant	25
30	endive	https://simple.wikipedia.org/wiki/Endive	17
31	fiddleheads	https://simple.wikipedia.org/wiki/Fiddleheads	34
32	frisee	https://simple.wikipedia.org/wiki/Frisee	18
33	fennel	https://simple.wikipedia.org/wiki/Fennel	31
34	greens	https://simple.wikipedia.org/wiki/Greens	23
35	beet greens	https://simple.wikipedia.org/wiki/Beet_greens	22
36	bok choy	https://simple.wikipedia.org/wiki/Bok_choy	9
37	chard	https://simple.wikipedia.org/wiki/Chard	7
38	collard greens	https://simple.wikipedia.org/wiki/Collard_greens	32
39	kale	https://simple.wikipedia.org/wiki/Kale	20
40	lettuce	https://simple.wikipedia.org/wiki/Lettuce	15
41	mustard greens	https://simple.wikipedia.org/wiki/Mustard_greens	27
42	spinach	https://simple.wikipedia.org/wiki/Spinach	23
43	alfalfa sprouts	https://simple.wikipedia.org/w/index.php?title=Alfalfa_sprouts&action=edit&redlink=1	23
44	azuki beans	https://simple.wikipedia.org/w/index.php?title=Azuki_beans&action=edit&redlink=1	329
45	bean sprouts	https://simple.wikipedia.org/wiki/Sprouting	23
46	black beans	https://simple.wikipedia.org/wiki/Black_bean	114
47	black-eyed peas	https://simple.wikipedia.org/wiki/Black-eyed_peas	116
48	borlotti bean	https://simple.wikipedia.org/wiki/Borlotti_bean	335
49	broad beans	https://simple.wikipedia.org/wiki/Fava_bean	88
50	chickpeas	https://simple.wikipedia.org/wiki/Chickpea	364
51	green beans	https://simple.wikipedia.org/wiki/Green_bean	31
52	kidney beans	https://simple.wikipedia.org/wiki/Kidney_bean	333
53	lentils	https://simple.wikipedia.org/wiki/Lentil	116
54	lima beans	https://simple.wikipedia.org/wiki/Lima_bean	115
55	mung beans	https://simple.wikipedia.org/wiki/Mung_bean	347
56	navy beans	https://simple.wikipedia.org/wiki/Navy_bean	67
57	peanuts	https://simple.wikipedia.org/wiki/Peanut	567
58	pinto beans	https://simple.wikipedia.org/wiki/Pinto_bean	347
59	runner beans	https://simple.wikipedia.org/wiki/Runner_bean	22
60	split peas	https://simple.wikipedia.org/wiki/Split_peas	341
61	soy beans	https://simple.wikipedia.org/wiki/Soy_bean	446
62	peas	https://simple.wikipedia.org/wiki/Pea	81
63	mange tout	https://simple.wikipedia.org/wiki/Mange_tout	31
64	mushrooms	https://simple.wikipedia.org/wiki/Mushrooms	22
65	nettles	https://simple.wikipedia.org/wiki/Nettle	42
66	New Zealand spinach	https://simple.wikipedia.org/wiki/New_Zealand_spinach	22
67	oca	https://simple.wikipedia.org/w/index.php?title=Oca&action=edit&redlink=1	30
68	okra	https://simple.wikipedia.org/wiki/Okra	33
69	onion sprouts	https://simple.wikipedia.org/w/index.php?title=Onion_sprouts&action=edit&redlink=1	25
70	chives	https://simple.wikipedia.org/wiki/Chives	30
71	garlic	https://simple.wikipedia.org/wiki/Garlic	13.41
72	leek	https://simple.wikipedia.org/wiki/Leek_(vegetable)	61
73	onion	https://simple.wikipedia.org/wiki/Onion	40
74	shallot	https://simple.wikipedia.org/wiki/Shallot	72
75	scallion	https://simple.wikipedia.org/wiki/Scallion	32
76	bell pepper	https://simple.wikipedia.org/wiki/Bell_pepper	20
77	chili pepper	https://simple.wikipedia.org/wiki/Chili_pepper	40
78	jalapeño	https://simple.wikipedia.org/wiki/Jalape%C3%B1o	28
79	habanero	https://simple.wikipedia.org/wiki/Habanero	18
80	paprika	https://simple.wikipedia.org/wiki/Paprika	282
81	tabasco pepper	https://simple.wikipedia.org/wiki/Tabasco_pepper	12
82	cayenne pepper	https://simple.wikipedia.org/wiki/Cayenne_pepper	318
83	radicchio	https://simple.wikipedia.org/wiki/Radicchio	23
84	rhubarb	https://simple.wikipedia.org/wiki/Rhubarb	21
85	beetroot	https://simple.wikipedia.org/wiki/Beetroot	43
86	mangelwurzel	https://simple.wikipedia.org/wiki/Mangelwurzel	44
87	carrot	https://simple.wikipedia.org/wiki/Carrot	41
88	celeriac	https://simple.wikipedia.org/wiki/Celeriac	26
89	corns	https://simple.wikipedia.org/wiki/Corm	86
90	eddoe	https://simple.wikipedia.org/w/index.php?title=Eddoe&action=edit&redlink=1	120
91	konjac	https://simple.wikipedia.org/wiki/Konjac	10
92	taro	https://simple.wikipedia.org/wiki/Taro	112
93	water chestnut	https://simple.wikipedia.org/wiki/Water_chestnut	97
94	ginger	https://simple.wikipedia.org/wiki/Ginger	80
95	parsnip	https://simple.wikipedia.org/wiki/Parsnip	75
96	rutabaga	https://simple.wikipedia.org/wiki/Rutabaga	38
97	radish	https://simple.wikipedia.org/wiki/Radish	16
98	wasabi	https://simple.wikipedia.org/wiki/Wasabi	109
99	horseradish	https://simple.wikipedia.org/wiki/Horseradish	48
100	daikon	https://simple.wikipedia.org/wiki/Daikon	0.1
101	turnip	https://simple.wikipedia.org/wiki/Turnip	28
102	tubers	https://simple.wikipedia.org/wiki/Tuber	148
103	jicama	https://simple.wikipedia.org/wiki/Pachyrhizus_erosus	38
104	jerusalem artichoke	https://simple.wikipedia.org/wiki/Jerusalem_artichoke	73
105	kumara	https://simple.wikipedia.org/w/index.php?title=Kumara&action=edit&redlink=1	86
106	potato	https://simple.wikipedia.org/wiki/Potato	87
107	sour yam	https://simple.wikipedia.org/w/index.php?title=Sour_yam&action=edit&redlink=1	107
108	sweet potato	https://simple.wikipedia.org/wiki/Sweet_potato	86
109	sweet yam	https://simple.wikipedia.org/w/index.php?title=Sweet_yam&action=edit&redlink=1	86
110	yam	https://simple.wikipedia.org/wiki/Yam	118
111	salsify	https://simple.wikipedia.org/w/index.php?title=Salsify&action=edit&redlink=1	82
112	skirret	https://simple.wikipedia.org/wiki/Skirret	361
113	succotash	https://simple.wikipedia.org/w/index.php?title=Succotash&action=edit&redlink=1	99
114	sweetcorn	https://simple.wikipedia.org/wiki/Sweetcorn	86
115	acorn squash	https://simple.wikipedia.org/wiki/Acorn_squash	40
116	bitter melon	https://simple.wikipedia.org/wiki/Momordica_charantia	34
117	butternut squash	https://simple.wikipedia.org/wiki/Butternut_squash	45
118	banana squash	https://simple.wikipedia.org/wiki/Banana_squash	27
119	courgette	https://simple.wikipedia.org/wiki/Courgette	17
120	cucumber	https://simple.wikipedia.org/wiki/Cucumber	16
121	delicata	https://simple.wikipedia.org/w/index.php?title=Delicata&action=edit&redlink=1	10
122	gem squash	https://simple.wikipedia.org/wiki/Gem_squash	25
123	hubbard squash	https://simple.wikipedia.org/wiki/Hubbard_squash	46
124	marrow	https://simple.wikipedia.org/wiki/Squash_(vegetable)	786
125	spaghetti squash	https://simple.wikipedia.org/wiki/Spaghetti_squash	31
126	tat soi	https://simple.wikipedia.org/wiki/Tat_soi	22
127	tomatillo	https://simple.wikipedia.org/w/index.php?title=Tomatillo&action=edit&redlink=1	32
128	tomato	https://simple.wikipedia.org/wiki/Tomato	33
129	watercress	https://simple.wikipedia.org/wiki/Watercress	11
130	beef	https://simple.wikipedia.org/wiki/Beef	250
131	Turkey	https://en.wikipedia.org/wiki/Turkey_meat	189
132	liver	https://en.wikipedia.org/wiki/Liver_(food)	165
133	crab	https://en.wikipedia.org/wiki/Crab	97
134	chicken	https://en.wikipedia.org/wiki/Chicken	239
135	Spaghetti	https://en.wikipedia.org/wiki/Spaghetti	158
136	salt	https://simple.wikipedia.org/wiki/Table_salt	0
137	sugar	https://en.wikipedia.org/wiki/Sugar	387
138	black Pepper	https://en.wikipedia.org/wiki/Black_pepper	6
139	red pepper	https://en.wikipedia.org/wiki/Red_pepper	20
140	Vanilla	https://en.wikipedia.org/wiki/Vanilla	288
141	Zaatar	https://en.wikipedia.org/wiki/Za%27atar	100
142	cheese	https://en.wikipedia.org/wiki/Cheese	402
143	Baguette	https://en.wikipedia.org/wiki/Baguette	289
144	olive oil	https://en.wikipedia.org/wiki/Olive_oil	884
145	egg	https://en.wikipedia.org/wiki/Egg	155
146	vegetable oil	https://en.wikipedia.org/wiki/Vegetable_oil	884
147	mozzarella	https://en.wikipedia.org/wiki/Mozzarella	280
148	basil	https://en.wikipedia.org/wiki/Basil	22
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, userid, rating, recipe_id) FROM stdin;
8	27	4	5
9	24	1	17
10	24	1	16
17	24	4	5
18	24	1	4
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe (id, name, description, instructions, preparation_time, cook_time, ratings) FROM stdin;
6	Vegetable Stir-Fry	Quick and healthy stir-fried vegetables	Stir-fry chopped vegetables with minced garlic and ginger  add soy sauce and finish with a drizzle of sesame oil.	0.25	0.17	3
7	Egg Fried Rice	Classic fried rice with eggs and vegetables	Scramble eggs stir in cooked rice add soy sauce and mix in cooked mixed vegetables. Garnish with green onions if available.	0.1	0.25	3
8	Bruschetta	Simple and delicious appetizer with tomatoes and basil	Dice tomatoes mix with minced garlic chopped basil and olive oil. Spoon onto toasted slices of bread.	0.25	0.08	3
9	Omelette	Versatile omelette with eggs cheese and vegetables 	Beat eggs pour into a hot pan add diced vegetables and cheese season with salt and pepper and fold.	0.1	0.17	3
15	recipe	Your Recipe Description	Your Recipe Instructions	0.5	0.7	3
16	recipe	Your Recipe Description	Your Recipe Instructions	0.5	0.7	3
17	test1hocine	test1hocine	test1hocine	5	2	3
5	Caprese Salad	Fresh and vibrant salad with tomatoes mozzarella and basil	Slice tomatoes and mozzarella arrange with fresh basil leaves drizzle with olive oil and optionally add balsamic glaze.	0.1	0	4
4	Pasta Aglio e Olio	Simple and flavorful pasta dish	Sauté minced garlic in olive oil  toss with cooked spaghetti add red pepper flakes and garnish with parsley.	0.1	0.25	1
\.


--
-- Data for Name: recipe_ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ingredient (id, recipe_id, ingredient_id, quantity, unit) FROM stdin;
3	4	135	200	grams
4	4	144	50	milliliters
5	4	71	4	cloves
6	4	139	0.25	teaspoon
7	5	128	4	units
8	5	147	200	grams
9	5	148	1.5	cup
10	5	144	50	milliliters
21	16	12	2	units
22	16	16	2	tbsp
23	17	47	5	units
24	17	48	2	units
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (session_id, user_id, token, expiration_time) FROM stdin;
165	19	74c2226b-fab4-46b6-895b-067ece0c8854	2024-04-01 16:42:53.275
166	19	3ef5b80d-f114-4134-b089-053de495aff6	2024-04-01 16:42:54.345
167	24	af2b4461-5535-4133-b7d9-7e03673c08b5	2024-04-03 16:37:45.715
168	19	03105660-54f9-4113-9512-a88bd289f8e3	2024-04-05 20:17:27.571
169	24	af640770-0686-4af9-80c3-ae89e268b0f2	2024-04-05 20:36:01.587
170	24	a17a3ef0-d0c6-4630-a7a4-c8e36a59dff1	2024-04-05 20:36:01.795
171	24	1a1c5aa5-249a-4e00-9bb9-b5e8902cf726	2024-04-05 20:36:01.797
172	24	b841926e-0df9-4fe7-8982-33f0b646f9d6	2024-04-05 20:36:01.8
173	24	bd4eecdf-22cb-44b4-90a1-650d7d3ade87	2024-04-05 20:36:01.984
174	24	5cdcdd89-3643-404b-85f1-41df972c79ef	2024-04-05 20:36:01.986
175	24	d4b1fe82-c426-4dc2-ac02-1a0f22682928	2024-04-05 21:37:59.82
176	24	800e1490-fce8-4a5a-a8ac-76b18231b770	2024-04-05 21:42:06.178
177	24	8ade63a7-ff6e-41ba-9db5-c8614ae0e01f	2024-04-05 23:13:27.933
178	24	d1231a40-3b51-46a4-a0b2-0e1ea1c44fa5	2024-04-06 08:26:46.347
180	24	ba21f0ef-492d-4795-97a9-290755f08579	2024-04-07 11:13:35.546
182	24	64d4433b-7844-4468-92d0-5b117a045ed3	2024-04-07 12:04:29.319
\.


--
-- Data for Name: table1; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.table1 (id, name) FROM stdin;
3	John Doe
4	John Doe
5	John Doe
6	John Doe
7	John Doe
8	John Doe
9	John Doe
1	ho
2	h\n
\.


--
-- Data for Name: usertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usertable (userid, name, username, email, password, lastlogin, registration, isverified, is_admin) FROM stdin;
24	t	t	t@gmail.com	$2b$04$6rs4y0dBaikHPRvLqxMmyeWEWWo.agwd8CwrQXMf7Rh/85W/ZA5Se	2024-03-08 11:04:29.382383	2024-02-29 13:33:27.2816	f	t
20	hohoho		hohoho@gmail.com	$2b$04$qru37Dd4RI6QKhEBzAxW7OY1e6imfX7HuK2Hum0zaKlHkuuQxaMwu	\N	2024-02-29 10:06:13.164521	f	f
27	ma	ma	ma@gmail.com	$2b$04$V93VoQW2Xx1uf5M/eCPUQOw4Hq8KQil4tQbna.2iUkf1ydHJTTf0S	\N	2024-03-02 18:47:04.428651	f	f
19	test	test	test@gmail.com	$2b$04$ycRwFDCNE6xFmRNYnrAgTelUpavJ6TwULnyKv90/3tFRKGGVbwwGm	2024-03-06 19:17:27.588807	2024-02-28 20:46:30.745781	f	f
26	a	a	a@gmail.com	$2b$04$vC6DO9Vwn6W1lwQ0uqXOcui/F4LiMiLsHkoXUQdX2AcZ2zujJ7QnK	2024-02-29 14:25:45.7227	2024-02-29 13:34:57.368496	f	f
\.


--
-- Name: ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredient_id_seq', 153, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 18, true);


--
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_id_seq', 17, true);


--
-- Name: recipe_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_ingredient_id_seq', 24, true);


--
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 182, true);


--
-- Name: table1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.table1_id_seq', 9, true);


--
-- Name: usertable_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usertable_userid_seq', 27, true);


--
-- Name: imagetable imagetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagetable
    ADD CONSTRAINT imagetable_pkey PRIMARY KEY (id);


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: recipe_ingredient recipe_ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_pkey PRIMARY KEY (id);


--
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: table1 table1_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.table1
    ADD CONSTRAINT table1_pkey PRIMARY KEY (id);


--
-- Name: usertable usertable_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_email_key UNIQUE (email);


--
-- Name: usertable usertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_pkey PRIMARY KEY (userid);


--
-- Name: usertable usertable_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_username_key UNIQUE (username);


--
-- Name: fki_fk_ingredient; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_ingredient ON public.recipe_ingredient USING btree (ingredient_id);


--
-- Name: fki_fk_recipe; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_recipe ON public.recipe_ingredient USING btree (recipe_id);


--
-- Name: recipe_ingredient fk_ingredient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT fk_ingredient FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id) ON DELETE CASCADE;


--
-- Name: recipe_ingredient fk_recipe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- Name: ratings fk_recipe_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT fk_recipe_id FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- Name: imagetable imagetable_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagetable
    ADD CONSTRAINT imagetable_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: ratings ratings_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_userid_fkey FOREIGN KEY (userid) REFERENCES public.usertable(userid);


--
-- Name: recipe_ingredient recipe_ingredient_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: recipe_ingredient recipe_ingredient_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usertable(userid);


--
-- PostgreSQL database dump complete
--

