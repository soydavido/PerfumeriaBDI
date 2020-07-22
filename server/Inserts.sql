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
('Prodarom','Europa',10);

insert into add_productores (prod_nombre,prod_email,prod_pag_web,prod_direccion,prod_id_aso_nac) values 
('Symrise','info@symrise.com','www.symrise.com/','Muhlenfeldstrasse 1, Holzminden, Lower Saxony 37603 DE',2),
('Perfumarte','info@perfumarte.com','www.perfumarte.com/','Pol. Industrial Picassent, Calle Cinco, nº 20.46220 Picassent (Valencia), España',1),
('Bellevue Parfums','info@bellevueparfums.com','www.bellevueparfums.com/','12/14 Rond-Point des Champs-Élysées Marcel-Dassault, 75008 Paris, France',4);

insert into add_proveedores (prov_nombre,prov_email,prov_pag_web,prov_direccion,prov_id_aso_nac,prov_id_pai) values 
('Firmenich','info@firmenich.com','www.firmenich.com/','Rue de la Bergère 7, 1217 Meyrin, Suiza',3,15),
('Privi','info@privi.co.in','www.privi.com/','Privi House, A-71,TTC Industrial Area,Thane Belapur Road,Kopar Khairane,Navi Mumbai - 400 709, India',null,1);

insert into add_telefonos (tel_cod_pais, tel_numero, tel_id_prod, tel_id_prov) values
		('+41', '22 780 22 11', null, 1),
		('+91', '22 33043500', null, 2),
		('+91', '22 33043600', null, 2),
		('+49', '(0)5531/90-0', 1, null),
		('+34', '961 278 559', 2, null),
		('+33','6 26 22 36 53', 3, null);
