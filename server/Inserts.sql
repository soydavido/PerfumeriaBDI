insert into add_paises (pai_nombre) values 
	('India'),
	('Grecia'),
	('Australia'),
	('Nueva Zelanda'),
	('China'),
	('Indoniesia'),
	('Japon'),
	('Korea'),
	('Singapur'),
	('Francia'),
	('Alemania'),
	('Italia'),
	('Holanda'),
	('España'),
	('Suiza'),
	('Turquia'),
	('Reino Unido'),
	('Argentina'),
	('Brazil'),
	('Chile'),
	('Colombia'),
	('Mexico'),
	('Canada'),
	('Estados Unidos');

insert into add_asociaciones_nacionales (aso_nac_nombre,aso_nac_region,aso_nac_id_pai) values
('AEFAA - Asociación Española de Fragancias y Aromas Alimentarios','Europa',14),
('DVRH - Deutscher Verband der Riechstoff','Europa',11),
('SFFIA - Swiss Flavour and Fragrance Industry Association','Europa',15),
('Prodarom','Europa',10),
('Fragrance Creators Association', 'Norte America', 24);

insert into add_proveedores (prov_nombre,prov_email,prov_pag_web,prov_direccion,prov_id_aso_nac,prov_id_pai) values 
('Firmenich','info@firmenich.com','www.firmenich.com/','Rue de la Bergère 7, 1217 Meyrin, Suiza',3,15),
('Privi','info@privi.co.in','www.privi.com/','Privi House, A-71,TTC Industrial Area,Thane Belapur Road,Kopar Khairane,Navi Mumbai - 400 709, India',null,1),
('Eternis','info@eternis.com','www.eternis.com/','1004 Peninsula Tower, Peninsula Corporate Park, G.K. Marg, Lower Parel, Mumbai 400 013 ',null,1),
('Grau Aromatics', 'info@grau.biz', 'www.grau-aromatics.de/en/','Bismarckstr. 4, 73525 Schwäbisch Gmünd', 2, 11);

insert into add_productores (prod_nombre,prod_email,prod_pag_web,prod_direccion,prod_id_aso_nac) values 
('Symrise','info@symrise.com','www.symrise.com/','Muhlenfeldstrasse 1, Holzminden, Lower Saxony 37603 DE',2),
('Perfumarte','info@perfumarte.com','www.perfumarte.com/','Pol. Industrial Picassent, Calle Cinco, nº 20.46220 Picassent (Valencia), España',1),
('Bellevue Parfums','info@bellevueparfums.com','www.bellevueparfums.com/','12/14 Rond-Point des Champs-Élysées Marcel-Dassault, 75008 Paris, France',4),
('Armaf', 'CS@armaf.co.in', 'www.armaf.co.in/', 'Bangalore', null),
('DonnaKaran DKNY', 'HELP@DONNAKARAN.COM', 'www.donnakaran.com/home.do', '550 Seventh Avenue, Manhattan, New York', 5);

insert into add_miembros_ifra (mie_ifr_fecha_ini, mie_ifr_tipo, mie_ifr_fecha_fin, mie_ifr_id_prov, mie_ifr_id_prod) values 
		('1980-05-05', 'r', null, 1, null),
		('1995-08-23', 'r', null, null, 1),
		('2000-04-10', 's', null, 2, null),
		('2001-04-25', 's', null, 3, null),
		('1982-03-01', 'mn', null, null, 2),
		('2005-01-21', 'mn', null, null, 3),
		('1994-09-06', 'mn', '2015-07-12', null, 4),
		('2003-06-20', 'mn', null, null, 5),
		('1986-11-17', 'mn', null, 4, null);

insert into add_telefonos (tel_cod_pais, tel_numero, tel_id_prod, tel_id_prov) values
		('+41', '22 780 22 11', null, 1),
		('+91', '22 33043500', null, 2),
		('+91', '22 33043600', null, 2),
		('+49', '(0)5531/90-0', 1, null),
		('+34', '961 278 559', 2, null),
		('+33','6 26 22 36 53', 3, null),
		('+91', '22 66513400', null, 3),
		('+91', '9019 859 785', 4, null),
		('+1', '866-984-2118', 5, null),
		('+49', '7171 91140', null, 4);

insert into add_ingredientes_esencias (ing_ese_ipc, ing_ese_id_prov, ing_ese_tscacas, ing_ese_nombre, ing_ese_fema, ing_ese_meses_produccion, ing_ese_dosis_recomendada, ing_ese_ocurrencia_natural, ing_ese_apariencia, ing_ese_desc_olfativa, ing_ese_beneficios, ing_ese_certificaciones, ing_ese_punto_inflamabilidad, ing_ese_estado_reglamentario, ing_ese_recomendaciones_etiquetado) values 
		(969340, 1, '68917-05-5', 'osmanthus absolute', 3750, 'Septiembre, Octubre', 3, null, 'Desde verde oscuro, hasta marrón oscuro, liquida pasta viscosa', 'Albaricoque floral, graso, afrutado', 'útil para la creación de esencias amarillas', ' Kosher Certified, Organic Suitable EU', null, 'EU: Natural, US: Natural, Other: Contact us', 'EU: Osmanthus absolute or Extract, Other: Contact us'),
		(937451, 1, '23696-85-7', 'damascenone fab', 3420, null, 2.5,'Se encuentra naturalmente en tabaco, rosa, té, membrillo, grosella negra, albaricoque, manzana cocida, uva, nectarina, maracuyá, frambuesa, café, osmanthus, camomila, cerveza, coñac, vino …', 'Líquido amarillo pálido a amarillo', 'Afrutado, amaderado, floral, membrillo,fruta cocida y notas de tabaco', 'funciona bien en todo tipo de frutas, incluidas tomate, notas alcohólicas, té y sabores florales', 'Kosher Certified, Halal Certified', '100°C', 'Regulation (EC) N° 1334/2008 Flavouring Substance', null),
		(972375, 1, '60-12-8', 'phenylethanol nat', 2858, null, 10, 'Se encuentra naturalmente en manzana, albaricoque, plátano, queso, champiñones, durazno, frambuesa, rosa, fresa y tabaco', ' Líquido incoloro a amarillo claro', 'Potente floral, rosa, miel, notas frutales', 'agrega, más allá de su típica rosa y miel perfil, una interesante nota de fondo fermentada que es excelente para sabores de chocolate. Material muy flexible, se puede utilizar a partir de queso para aplicaciones de bebidas alcohólicas', 'Kosher Certified, Halal Certified', '98°C', ' Regulation (EC) N° 1334/2008 Natural Flavouring Substance', null),
		(11210013, 2, '8002-09-3', 'Pine oil-85', 3045, null, null, null, ' Líquido transparente incoloro a amarillo pálido', 'base de hierbas, pino, cítricos frescos', null, null, '88°C', null, null),
		(12320002, 2, '28219-61-6', 'Sandal Fleur', null, null, null, null, 'Líquido transparente e incoloro', 'Leñosa, sandalia, dulce, floral.', null, null, '110°C', null, null),
		(10610004, 2, '24720-09-0', 'alpha damascone', 3659, null, null, null, 'líquido claro amarillo pálido', 'Dulce floral metálico afrutado manzana picante ciruela menta', null, null, '100°C', null, null);

--insert into add_ingredientes_otros (ing_otr_nombre, ing_otr_tipo, ing_otr_ipc, ing_otr_tsacas, ing_otr_id_prov) values 

insert into add_presentaciones_ing (pre_ing_volumen, pre_ing_precio, pre_ing_id_ing_ese, pre_ing_id_ing_otr) values
		(1, 17, 969340, null),
		(2, 34, 969340, null),
		(5, 73, 969340, null),
		(15, 182, 969340, null),
		(30, 329, 969340, null),
		(60, 601, 969340, null),
		(120, 1104, 969340, null),
		(4, 13.50, 937451, null),
		(15, 40.50, 937451, null),
		(30, 74.50, 937451, null),
		(80, 182.50, 937451, null),
		(100, 11, 972375, null),
		(1000, 44, 972375, null),
		(500, 25, 972375, null),
		(30, 13, 11210013, null),
		(950, 55, 11210013, null),
		(3785, 145, 11210013, null),
		(4, 3.25, 12320002, null),
		(15, 4, 12320002, null),
		(30, 5, 12320002, null),
		(80, 8, 12320002, null),
		(2, 3.24, 10610004, null),
		(15, 12.44, 10610004, null),
		(30, 21.14, 10610004, null),
		(80, 48.51, 10610004, null),
		(120, 71.85, 10610004, null),
		(240, 135.26, 10610004, null);

insert into add_origenes (ori_id_pai, ori_id_ing_ese) values 
		(5,969340),
		(1, 11210013),
		(1, 12320002),
		(1, 10610004);
		
insert into add_esencias_perfumes (ese_per_nombre, ese_per_tipo, ese_per_descripcion) values
		('cardamomo', 'n', null),
		('bergamota', 'n', null),
		('manzana roja', 'n', null),
		('agua de mar', 's', null),
		('esclarea', 'n', null),
		('pachulí', 'n', null),
		('almizcle', 's', null),
		('ámbar', 's', null),
		('vainilla', 'n', null),
		('cilantro', 'n', null),
		('ciprés', 'n', null),
		('vetiver', 'n', null),
		('hierba verde', 'n', null),
		('hojas de higuera', 'n', null),
		('elemí', 'n', null),
		('cedro', 'n', null),
		('madera de ciprés hinoki', 'n', null),
		('ámbar blanco', 's', null),
		('eneldo', 'n', null),
		('pimienta negra', 'n', null),
		('nuez moscada', 'n', null),
		('palisandro', 'n', null),
		('té negro', 'n', null),
		('flor de cuaba blanca (madera de amyris)', 'n', null);

insert into add_familias_olfativas (fam_olf_nombre) values
		('Verde'),
		('Citrico'),
		('Floral'),
		('Frutal'),
		('Aromatico'),
		('Helecho'),
		('Chipre'),
		('Madera'),
		('Oriental'),
		('Otro');

insert into add_fam_olf_ese_per (fam_olf_ese_per_id_fam_olf, fam_olf_ese_per_id_ese_per) values 
		(9, 1),
		(2, 2),
		(6, 2),
		(4, 3),
		(10, 4),
		(1, 5),
		(8, 6),
		(9, 7),
		(9, 8),
		(9, 9),
		(9, 10),
		(8, 11),
		(8, 12),
		(1, 13),
		(4, 14),
		(5, 15),
		(8, 16),
		(8, 17),
		(9, 18),
		(9, 19),
		(9, 20),
		(9, 21),
		(8, 22),
		(6, 23),
		(8, 24);

insert into add_fam_olf_ing_ese (fam_olf_ing_ese_id_ing_ese, fam_olf_ing_ese_id_fam_olf) values
		(969340, 3),
		(969340, 4),
		(937451, 4),
		(972375, 3),
		(11210013, 8),
		(12320002, 8),
		(10610004, 3),
		(10610004, 4);

insert into add_palabras_clave (pal_cla_palabra_unica) values
		('Diario'),
		('Trabajo'),
		('Casual');

insert into add_pal_cla_fam_olf (pal_cla_id_pal_cla, pal_cla_id_fam_olf) values
		(1, 6),
		(1, 9),
		(2, 8),
		(2, 5),
		(3, 8),
		(3, 5);


--insert into add_ing_ese_ese_per (ing_ese_ese_per_id_ing_ese, ing_ese_ese_per_id_ese_per) values
	
--insert into add_prohibidos (pro_tscacas, pro_nombre) values


insert into add_condiciones_pago (con_pag_id_prov, con_pag_descripcion, con_pag_tipo, con_pag_cuotas, con_pag_porcentaje, con_pag_meses) values
		(1, 'Pago completo previo al envio de mercancia', 'contado', 1, 100, null),
		(1, 'Pago parcial posterior a la entrega de la mercancia', 'credito',4, 25, 4),
		(2, 'Pago completo al recibir de mercancia', 'contado', 1, 100, null),
		(2, 'Pago antes del envio', 'contado', 1, 100, null),
		(3, 'Pago unico luego de recibir la mercancia', 'credito', 1, 100, 1),
		(3, 'Pagos posteriores a recibir la mercancia', 'credito', 4, 25, 4),
		(4, 'Pago en cuotas mensuales luego de recibir la mercancia', 'credito',2,50, 3),
		(4, 'Pago completo al enviar la mercancia', 'contado', 1, 100, null);

insert into add_formulas_eval (for_eva_fecha,for_eva_fk_prod,for_eva_tipo) values 
('2020-07-23',1,'i'),
('2020-07-23',2,'i'),
('2020-07-23',3,'i'),
('2020-07-23',4,'i'),
('2020-07-23',5,'i');

insert into add_variables (var_id_for_eva,var_id_prod,var_nombre,var_peso) values 
('2020-07-23',1,'Ubicacion geografica',20),
('2020-07-23',1,'Costos',40), 
('2020-07-23',1,'Alternativas de envios',20),
('2020-07-23',1,'Alternativas de pagos',20),
('2020-07-23',2,'Costos',40), 
('2020-07-23',2,'Alternativas de envios',30),
('2020-07-23',2,'Alternativas de pagos',30),
('2020-07-23',3,'Alternativas de envios',50),
('2020-07-23',3,'Costo',50),
('2020-07-23',4,'Alternativas de pagos',30),
('2020-07-23',4,'Alternativas de envios',30),
('2020-07-23',4,'Costo',40),
('2020-07-23',5,'Ubicacion geografica',60),
('2020-07-23',5,'Costo',40);;


insert into add_condiciones_envio (con_env_id_pai,con_env_id_prov,con_env_descripcion,con_env_tipo_transporte,con_env_costo) values 
(14,1,null,'a',2000),
(11,1,null,'m',1200),
(10,2,null,'a',1000),
(14,3,null,'t',1700),
(24,3,null,'t',3000),
(24,1,null,'m',2000);

insert into add_prod_pais (prod_pais_id_pai,prod_pais_id_prod) values 
(11,1),
(11,2),
(10,2),
(14,3),
(10,3),
(11,4),
(10,4),
(24,4),
(24,5);


insert into add_perfumes (per_nombre, per_edad_dirigida, per_genero, per_id_prod) values
		('Burning Ice Iceberg', 'j', 'm', 1),
		('Six Scents 3 Cosmic Wonder: Spirit of Wood', 'a', 'u', 1),
		('Six Scents 4 Gareth Pugh: Diagonal', 'a', 'u', 1);

insert into add_fam_per (fam_per_id_per, fam_per_id_fam_olf) values
		(1, 9),
		(1, 6),
		(2, 8),
		(2, 5);

insert into add_notas (not_id_per, not_id_ese_per, not_tipo, not_concentracion) values
		(1, 1, 's', null),
		(1, 2, 's', null),
		(1, 3, 's', null),
		(1, 4, 'c', null),
		(1, 5, 'c', null),
		(1, 6, 'c', null),
		(1, 7, 'f', null),
		(1, 8, 'f', null),
		(1, 9, 'f', null);

insert into add_monoliticas (mon_id_per, mon_id_ese_per) values
		(2, 10),
		(2, 11),
		(2, 12),
		(2, 13),
		(2, 14),
		(2, 15),
		(2, 16),
		(2, 17),
		(2, 18),
		(3, 7),
		(3, 19),
		(3, 20),
		(3, 21),
		(3, 22),
		(3, 23),
		(3, 24),
		(3, 18);

insert into add_intensidades (int_id_per, int_nombre, int_concentracion, int_descripcion) values
		(1, 'edt', null, null),
		(2, 'edp', null, null),
		(3, 'edp', null, null);

insert into add_presentaciones_perfumes (pre_per_id_int, pre_per_id_per, pre_per_volumen) values
		(1, 1, 100),
		(2, 2, 100),
		(3, 3, 100);

insert into add_perfumistas (perfu_nombre, perfu_apellido, perfu_genero, perfu_id_pai, perfu_nombre2, perfu_apellido2) values
		('Bernard', 'Ellena', 'm', 10, null, null),
		('Philippe', 'Paparella', 'm', 10, null, 'Paris'),
		('Emilie', 'Coppermann', 'f', 10, null, null);

insert into add_per_perfu (per_perfu_id_per, per_perfu_id_perfu) values
		(1,1),
		(2,2),
		(3,3);

insert into add_contratos (con_fecha_ini,con_exclusividad,con_id_prod,con_id_prov) values 
		('2020-01-03','s',1,1),
		('2019-12-24','n',2,2);

insert into add_con_cond_env (con_cond_env_id_con,con_cond_env_id_cond_env,con_cond_env_id_prov,con_cond_env_id_pai) values 
		(1,1,1,14);

insert into add_ingredientes_contratados (ing_con_id_con,ing_con_id_ing_ese) values 
		(1,969340);	