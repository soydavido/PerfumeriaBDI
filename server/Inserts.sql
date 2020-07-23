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

insert into add_productores (prod_nombre,prod_email,prod_pag_web,prod_direccion,prod_id_aso_nac) values 
('Symrise','info@symrise.com','www.symrise.com/','Muhlenfeldstrasse 1, Holzminden, Lower Saxony 37603 DE',2),
('Perfumarte','info@perfumarte.com','www.perfumarte.com/','Pol. Industrial Picassent, Calle Cinco, nº 20.46220 Picassent (Valencia), España',1),
('Bellevue Parfums','info@bellevueparfums.com','www.bellevueparfums.com/','12/14 Rond-Point des Champs-Élysées Marcel-Dassault, 75008 Paris, France',4),
('Armaf', 'CS@armaf.co.in', 'www.armaf.co.in/', 'Bangalore', null),
('DonnaKaran DKNY', 'HELP@DONNAKARAN.COM', 'www.donnakaran.com/home.do', '550 Seventh Avenue, Manhattan, New York', 5);

insert into add_proveedores (prov_nombre,prov_email,prov_pag_web,prov_direccion,prov_id_aso_nac,prov_id_pai) values 
('Firmenich','info@firmenich.com','www.firmenich.com/','Rue de la Bergère 7, 1217 Meyrin, Suiza',3,15),
('Privi','info@privi.co.in','www.privi.com/','Privi House, A-71,TTC Industrial Area,Thane Belapur Road,Kopar Khairane,Navi Mumbai - 400 709, India',null,1),
('Eternis','info@eternis.com','www.eternis.com/','1004 Peninsula Tower, Peninsula Corporate Park, G.K. Marg, Lower Parel, Mumbai 400 013 ',null,1),
('Grau Aromatics', 'info@grau.biz', 'www.grau-aromatics.de/en/','Bismarckstr. 4, 73525 Schwäbisch Gmünd', 2, 11);

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

insert into add_ingredientes_esencias (ing_ese_ipc, ing_ese_id_prov, ing_ese_tscacas, ing_ese_territorio_olfativo, ing_ese_descripcion_olfativa, ing_ese_parte_procesada, ing_ese_proceso, ing_ese_descripcion_visual, ing_ese_cosecha, ing_ese_einecs, ing_ese_solubilidad, ing_ese_punto_inflamabilidad, ing_ese_ipc_alt,ing_ese_duracion) values 
		(969340, 1, '68917-05-5', 'naturaleza', 'tiene delicado y único afrutado floral facetas que recuerdan albaricoque seco y flores blancas con matiz coriáceo.', 'flores', 'Una extracción primaria con solvente volátil en fresco o rendimientos de biomasa seca a un concreto o resinoide. El Absoluto se obtiene mediante un segundo paso de purificación en el proceso.', 'naranja a marrón oscuro', '930 Kg de flores aproximadamente para producir 1 Kg de absoluto.','296-209-1','alcohol, aceite mineral','83°C', null, '24 meses'),
		(10610004, 2, '24720-09-0', 'naturaleza', 'Nota frutal floral única y sofisticada con un delicado y natural carácter de rosa. Nota de manzana compleja, menta y grosella negra con matices de ciruela.', null, null, 'Incoloro a amarillo pálido', null, '246-430-4', 'soluble en etanol 95º en todas las proporciones', '101°C', null, '2 años');

insert into add_origenes (ori_id_pai, ori_id_ing_ese) values 
		(5,969340);
		
insert into add_esencias_perfumes (ese_per_nombre, ese_per_tipo, ese_per_descripcion) values
		('osmanthus absolute', 'n', null),
		('alpha damascone', 'n', null);

insert into add_ing_ese_ese_per (ing_ese_ese_per_id_ing_ese, ing_ese_ese_per_id_ese_per) values
		(969340, 1),
		(10610004, 2);

insert into add_ingredientes_otros (ing_otr_nombre, ing_otr_tipo, ing_otr_ipc, ing_otr_tsacas, ing_otr_id_prov) values 
		('phenylethanol nat', 'n', 972375, '60-12-8', 1),
		('damascenone fab', 's', 937451, '23696-85-7', 1),
		('pine oil-20', 's', 11250013, null, 2),
		('dihydromyrcene Extra pure', 'n', 10320011, '2436-90-0', 2),
		('hexyl cinnamic aldehyde', 's', 1000000031, '165184-98-5', 3),
		('benzyl salicylate', 's',  1000000006, '118-58-1', 3),
		('hamber', 'n',  1000000022,  '54464-57-2', 3),
		('benzyl valerate', 's', 502236, '10361-39-4', 4),
		('cyclohexyl isovalerate', 's', 500686, '7774-44-9', 4),
		('Octyl butyrate', 'n', 501696, '110-39-4', 4);

insert into add_prohibidos (pro_tscacas, pro_nombre) values
		('118-58-1', 'benzyl salicylate'),
		('54464-57-2', 'hamber');

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
