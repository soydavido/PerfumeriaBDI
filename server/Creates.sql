create table add_paises (
	pai_id serial unique primary key,
	pai_nombre varchar (15) not null
);

create table add_asociaciones_nacionales (
	aso_nac_id serial primary key,
	aso_nac_nombre varchar (75) unique not null,
	aso_nac_region varchar (15) not null,
	aso_nac_id_pai int not null,
	constraint aso_nac_fk_pai foreign key (aso_nac_id_pai) references add_paises (pai_id)
);

create table add_proveedores (
	prov_id serial primary key,
	prov_nombre varchar (30) not null,
	prov_email varchar (30) unique not null,
	prov_pag_web varchar (30) unique not null,
	prov_direccion varchar (100) not null,
	prov_id_pai int not null,
	prov_id_aso_nac int,
	constraint prov_fk_pai foreign key (prov_id_pai) references add_paises (pai_id),
	constraint prov_fk_aso_nac foreign key (prov_id_aso_nac) references add_asociaciones_nacionales (aso_nac_id)
);

create table add_perfumistas (
	perfu_id serial primary key,
	perfu_nombre varchar (15) not null,
	perfu_apellido varchar (15) not null,
	perfu_apellido2 varchar (15) not null,
	perfu_genero char not null,
	perfu_id_pai int not null,
	perfu_nombre2 varchar (15),
	constraint perfu_fk_pai foreign key (perfu_id_pai) references add_paises (pai_id),
	constraint check_perfu_genero check (perfu_genero in ('m', 'f'))
);

create table add_condiciones_envio (
	con_env_id serial not null,
	con_env_id_pai int not null,
	con_env_id_prov int not null,
	con_env_descripcion varchar (250),
	con_env_tipo_transporte char,
	con_env_costo numeric (8,2),
	constraint pk_con_env primary key (con_env_id, con_env_id_pai, con_env_id_prov),
	constraint con_env_fk_pai foreign key (con_env_id_pai) references add_paises (pai_id),
	constraint con_env_fk_prov foreign key (con_env_id_prov) references add_proveedores (prov_id),
	constraint check_con_env_tipo_transporte check (con_env_tipo_transporte in ('t', 'm', 'a'))
);

create table add_productores (
	prod_id serial primary key,
	prod_nombre varchar (30) not null,
	prod_email varchar (30) unique not null,
	prod_pag_web varchar (30) unique not null,
	prod_direccion varchar (100) not null,
	prod_id_aso_nac int,
	constraint prod_fk_aso_nac foreign key (prod_id_aso_nac) references add_asociaciones_nacionales (aso_nac_id)
);

create table add_prod_pais (
	prod_pais_id_pai int not null,
	prod_pais_id_prod int not null,
	constraint pk_prod_pais primary key (prod_pais_id_pai, prod_pais_id_prod),
	constraint prod_pais_fk_pai foreign key (prod_pais_id_pai) references add_paises (pai_id),
	constraint prod_pais_fk_prod foreign key (prod_pais_id_prod) references add_productores (prod_id)
);

create table add_ingredientes_esencias (
	ing_ese_ipc int primary key,
	ing_ese_id_prov int not null,
	ing_ese_tscacas varchar (15),
	ing_ese_territorio_olfativo varchar (15),
	ing_ese_descripcion_olfativa varchar (250),
	ing_ese_parte_procesada varchar (20),
	ing_ese_proceso varchar (300),
	ing_ese_descripcion_visual varchar (250),
	ing_ese_cosecha varchar (100),
	ing_ese_einecs varchar (10),
	ing_ese_solubilidad varchar (200),
	ing_ese_punto_inflamabilidad varchar (5),
	ing_ese_ipc_alt int,
	ing_ese_duracion varchar (70),
	constraint ing_ese_fk_prov foreign key (ing_ese_id_prov) references add_proveedores (prov_id)
);

create table add_origenes (
	ori_id_pai int not null,
	ori_id_ing_ese int not null,
	constraint pk_ori primary key (ori_id_pai, ori_id_ing_ese),
	constraint ori_fk_pai foreign key (ori_id_pai) references add_paises (pai_id),
	constraint ori_fk_ing_ese foreign key (ori_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc)
);

create table add_ingredientes_otros (
	ing_otr_id serial primary key,
	ing_otr_nombre varchar (30) not null,
	ing_otr_tipo varchar (20) not null,
	ing_otr_ipc int,
	ing_otr_tsacas varchar (15),
	ing_otr_id_prov int,
	constraint ing_otr_fk_prov foreign key (ing_otr_id_prov) references add_proveedores (prov_id)
);

create table add_telefonos (
	tel_id serial primary key,
	tel_cod_pais varchar (4) not null,
	tel_numero varchar (15) not null,
	tel_id_prod int,
	tel_id_prov int,
	constraint tel_fk_prod foreign key (tel_id_prod) references add_productores (prod_id),
	constraint tel_fk_prov foreign key (tel_id_prov) references add_proveedores (prov_id)
);

create table add_condiciones_pago (
	con_pag_id serial not null,
	con_pag_id_prov int not null,
	con_pag_descripcion varchar (250) not null,
	con_pag_tipo varchar (20) not null,
	con_pag_cuotas int,
	con_pag_porcentaje real,
	con_pag_meses int,
	constraint pk_con_pag primary key (con_pag_id, con_pag_id_prov),
	constraint con_pag_fk_prov foreign key (con_pag_id_prov) references add_proveedores (prov_id)
);

create table add_historicos_evluaciones (
	his_eva_fecha date not null,
	his_eva_id_prod int not null,
	his_eva_id_prov int not null,
	his_eva_calificacion real not null,
	his_eva_tipo char not null,
	constraint pk_his_eva primary key (his_eva_fecha, his_eva_id_prod, his_eva_id_prov),
	constraint his_eva_fk_prod foreign key (his_eva_id_prod) references add_productores (prod_id),
	constraint his_eva_fk_prov foreign key (his_eva_id_prov) references add_proveedores (prov_id)
);

create table add_contratos (
	con_numero serial primary key,
	con_fecha_ini date not null,
	con_exclusividad char not null,
	con_id_prod int not null,
	con_id_prov int not null,
	con_cancelado boolean,
	con_fecha_canc date,
	constraint con_fk_prod foreign key (con_id_prod) references add_productores (prod_id),
	constraint con_fk_prov foreign key (con_id_prov) references add_proveedores (prov_id),
	constraint check_con_exclusividad check (con_exclusividad in ('s', 'n'))
);

create table add_con_cond_pag (
	con_cond_pag_id_con int not null,
	con_cond_pag_id_cond_pag int not null,
	con_cond_pag_id_prov int not null,
	constraint pk_con_cond_pag primary key (con_cond_pag_id_con, con_cond_pag_id_cond_pag, con_cond_pag_id_prov),
	constraint con_cond_pag_fk_con foreign key (con_cond_pag_id_con) references add_contratos (con_numero),
	constraint con_cond_pag_fk_cond_pag foreign key (con_cond_pag_id_cond_pag, con_cond_pag_id_prov) references add_condiciones_pago (con_pag_id, con_pag_id_prov)
);

create table add_con_cond_env (
	con_cond_env_id_con int not null,
	con_cond_env_id_cond_env int not null,
	con_cond_env_id_prov int not null,
	con_cond_env_id_pai int not null,
	constraint pk_con_cond_env primary key (con_cond_env_id_con, con_cond_env_id_cond_env, con_cond_env_id_prov, con_cond_env_id_pai),
	constraint con_cond_env_fk_con foreign key (con_cond_env_id_con) references add_contratos (con_numero),
	constraint con_cond_env_fk_cond_env foreign key (con_cond_env_id_cond_env, con_cond_env_id_prov, con_cond_env_id_pai) references add_condiciones_envio (con_env_id, con_env_id_prov, con_env_id_pai)
);

create table add_pedidos (
	ped_codigo serial primary key,
	ped_fecha date not null,
	ped_total numeric(8,2) not null,
	ped_status char not null,
	ped_id_prod int not null,
	ped_id_prov int not null,
	ped_id_con_pag int not null,
	ped_id_cond_pag int not null,
	ped_id_prov_pag int not null,
	ped_id_con_env int not null,
	ped_id_cond_env int not null,
	ped_id_prov_env int not null,
	ped_id_pai_env int not null,
	ped_fecha_confirma date,
	ped_nro_factura int,
	constraint ped_fk_prod foreign key (ped_id_prod) references add_productores (prod_id),
	constraint ped_fk_prov foreign key (ped_id_prov) references add_proveedores (prov_id),
	constraint ped_fk_con_cond_pag foreign key (ped_id_con_pag, ped_id_cond_pag, ped_id_prov_pag) references add_con_cond_pag (con_cond_pag_id_con, con_cond_pag_id_cond_pag, con_cond_pag_id_prov),
	constraint ped_fk_con_cond_env foreign key (ped_id_con_env, ped_id_cond_env, ped_id_prov_env, ped_id_pai_env) references add_con_cond_env (con_cond_env_id_con, con_cond_env_id_cond_env, con_cond_env_id_prov, con_cond_env_id_pai),
	constraint check_ped_status check (ped_status in ('s', 'c', 'p', 'e'))
);

create table add_miembros_ifra (
	mie_ifr_id serial primary key,
	mie_ifr_fecha_ini date not null,
	mie_ifr_tipo char(2) not null,
	mie_ifr_fecha_fin date,
	mie_ifr_id_prov int,
	mie_ifr_id_prod int,
	constraint mie_ifr_fk_prov foreign key (mie_ifr_id_prov) references add_proveedores (prov_id),
	constraint mie_ifr_fk_prod foreign key (mie_ifr_id_prod) references add_productores (prod_id),
	constraint check_mie_ifr_tipo check (mie_ifr_tipo in ('r', 's', 'mn'))
);

create table add_perfumes (
	per_id serial primary key,
	per_nombre varchar (15) not null,
	per_edad_dirigida varchar (2) not null,
	per_genero char not null,
	per_id_prod int not null,
	constraint per_fk_prod foreign key (per_id_prod) references add_productores (prod_id),
	constraint check_per_edad_dirigida check (per_edad_dirigida in ('i', 'j', 'a', 'am', 'at')),
	constraint check_per_genero check (per_genero in ('m', 'f', 'u'))
);

create table add_per_perfu (
	per_perfu_id_per int not null,
	per_perfu_id_perfu int not null,
	constraint pk_per_perfu primary key (per_perfu_id_per, per_perfu_id_perfu),
	constraint per_perfu_fk_per foreign key (per_perfu_id_per) references add_perfumes (per_id),
	constraint per_perfu_fk_perfu foreign key (per_perfu_id_perfu) references add_perfumistas (perfu_id)
);

create table add_pagos (
	pag_numero serial not null,
	pag_id_ped int not null,
	pag_id_prod int not null,
	pag_monto numeric(8,2) not null,
	pag_fecha date not null,
	constraint pk_pag primary key (pag_numero, pag_id_ped, pag_id_prod),
	constraint pag_fk_ped foreign key (pag_id_ped) references add_pedidos (ped_codigo),
	constraint pag_fk_prod foreign key (pag_id_prod) references add_productores (prod_id)
);

create table add_formulas_eval (
	for_eva_fecha date not null,
	for_eva_fk_prod int not null,
	for_eva_tipo char not null,
	for_eva_fechaf date,
	constraint pk_for_eva primary key (for_eva_fecha, for_eva_fk_prod),
	constraint for_eva_fk_prod foreign key (for_eva_fk_prod) references add_productores (prod_id),
	constraint check_for_eva_tipo check (for_eva_tipo in ('i', 'a'))
);

create table add_variables (
	var_id serial not null,
	var_id_for_eva date not null,
	var_id_prod int not null,
	var_nombre varchar (50) not null,
	var_peso real not null,
	constraint pk_var primary key (var_id, var_id_for_eva, var_id_prod),
	constraint var_id_prod foreign key (var_id_for_eva, var_id_prod) references add_formulas_eval (for_eva_fecha, for_eva_fk_prod)
);

create table add_escalas (
	esc_fecha_ini date not null,
	esc_id_prod int not null,
	esc_rango_ini int not null,
	esc_rango_fin int not null,
	esc_fecha_fin date,
	constraint pk_esc primary key (esc_fecha_ini, esc_id_prod),
	constraint esc_fk_prod foreign key (esc_id_prod) references add_productores (prod_id)
);

create table add_componentes_extras (
	comp_ext_id_ing_ese int not null,
	comp_ext_id_ing_otr int not null,
	constraint pk_comp_ext primary key (comp_ext_id_ing_ese, comp_ext_id_ing_otr),
	constraint comp_ext_fk_ing_ese foreign key (comp_ext_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc),
	constraint comp_ext_fk_ing_otr foreign key (comp_ext_id_ing_otr) references add_ingredientes_otros (ing_otr_id)
);

create table add_presentaciones_ing (
	pre_ing_id serial primary key,
	pre_ing_volumen int not null,
	pre_ing_precio numeric(7,2) not null,
	pre_ing_id_ing_ese int,
	pre_ing_id_ing_otr int,
	constraint pre_ing_fk_ing_ese foreign key (pre_ing_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc),
	constraint pre_ing_fk_ing_otr foreign key (pre_ing_id_ing_otr) references add_ingredientes_otros (ing_otr_id)
);

create table add_esencias_perfumes (
	ese_per_id serial primary key,
	ese_per_nombre varchar (50) not null,
	ese_per_tipo char not null,
	ese_per_descripcion varchar (250),
	constraint check_ese_per_tipo check (ese_per_tipo in ('n', 's'))
);

create table add_familias_olfativas (
	fam_olf_id serial primary key,
	fam_olf_nombre varchar (20) not null
);

create table add_fam_olf_ing_ese (
	fam_olf_ing_ese_id_ing_ese int not null,
	fam_olf_ing_ese_id_fam_olf int not null,
	constraint pk_fam_olf_ing_ese primary key (fam_olf_ing_ese_id_ing_ese, fam_olf_ing_ese_id_fam_olf),
	constraint fam_olf_ing_ese_fk_ing_ese foreign key (fam_olf_ing_ese_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc),
	constraint fam_olf_ing_ese_fk_fam_olf foreign key (fam_olf_ing_ese_id_fam_olf) references add_familias_olfativas (fam_olf_id)
);

create table add_ingredientes_contratados (
	ing_con_id_con int primary key,
	ing_con_id_ing_ese int,
	ing_con_id_ing_otr int,
	constraint ing_con_fk_con foreign key (ing_con_id_con) references add_contratos (con_numero),
	constraint ing_con_fk_ing_ese foreign key (ing_con_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc),
	constraint ing_con_fk_ing_otr foreign key (ing_con_id_ing_otr) references add_ingredientes_otros (ing_otr_id)
);

create table add_otros_componentes (
	otr_com_id_ing_otr int not null,
	otr_com_id_per int not null,
	constraint pk_otr_com primary key (otr_com_id_ing_otr, otr_com_id_per),
	constraint otr_com_fk_ing_otr foreign key (otr_com_id_ing_otr) references add_ingredientes_otros (ing_otr_id),
	constraint otr_com_fk_per foreign key (otr_com_id_per) references add_perfumes (per_id)
);

create table add_renovaciones (
	ren_id serial not null,
	ren_id_con int not null,
	ren_fecha date not null,
	constraint pk_ren primary key (ren_id, ren_id_con),
	constraint ren_fk_con foreign key (ren_id_con) references add_contratos (con_numero)
);

create table add_detalles (
	det_id serial not null,
	det_id_pre_ing int not null,
	det_id_ped int not null,
	det_cantidad int not null,
	constraint pk_det primary key (det_id, det_id_pre_ing, det_id_ped),
	constraint det_fk_pre_ing foreign key (det_id_pre_ing) references add_presentaciones_ing (pre_ing_id),
	constraint det_fk_ped foreign key (det_id_ped) references add_pedidos (ped_codigo)
);

create table add_intensidades (
	int_id serial not null,
	int_id_per int not null,
	int_nombre char(3) not null,
	int_concentracion real,
	int_descripcion varchar (250),
	constraint pk_int primary key (int_id, int_id_per) ,
	constraint int_fk_per foreign key (int_id_per) references add_perfumes (per_id),
	constraint check_int_nombre check (int_nombre in ('p', 'edp', 'edt', 'edc', 'eds'))
);

create table add_presentaciones_perfumes (
	pre_per_id serial not null,
	pre_per_id_int int not null,
	pre_per_id_per int not null,
	pre_per_volumen int not null,
	constraint pk_pre_per primary key (pre_per_id, pre_per_id_int, pre_per_id_per),
	constraint pre_per_fk_int foreign key (pre_per_id_int, pre_per_id_per) references add_intensidades (int_id, int_id_per)
);

create table add_monoliticas (
	mon_id serial not null,
	mon_id_per int not null,
	mon_id_ese_per int not null,
	constraint pk_mon primary key (mon_id, mon_id_per, mon_id_ese_per),
	constraint mon_fk_per foreign key (mon_id_per) references add_perfumes (per_id),
	constraint mon_fk_ese_per foreign key (mon_id_ese_per) references add_esencias_perfumes (ese_per_id)
);

create table add_notas (
	not_id_per int not null,
	not_id_ese_per int not null,
	not_tipo char not null,
	not_concentracion real,
	constraint pk_not primary key (not_id_per, not_id_ese_per),
	constraint not_fk_per foreign key (not_id_per) references add_perfumes (per_id),
	constraint not_fk_ese_per foreign key (not_id_ese_per) references add_esencias_perfumes (ese_per_id),
	constraint check_not_tipo check (not_tipo in ('s', 'c', 'f'))
);

create table add_fam_per (
	fam_per_id_per int not null,
	fam_per_id_fam_olf int not null,
	constraint pk_fam_olf primary key (fam_per_id_per, fam_per_id_fam_olf),
	constraint fam_per_fk_per foreign key (fam_per_id_per) references add_perfumes (per_id),
	constraint fam_per_fk_fam_olf foreign key (fam_per_id_fam_olf) references add_familias_olfativas (fam_olf_id)
);

create table add_palabras_clave (
	pal_cla_id serial primary key,
	pal_cla_palabra_unica varchar (20)
);

create table add_pal_cla_fam_olf (
	pal_cla_id_pal_cla int not null,
	pal_cla_id_fam_olf int not null,
	constraint pk_pal_cla_fam_olf primary key (pal_cla_id_pal_cla, pal_cla_id_fam_olf),
	constraint pal_cla_fk_pal_cla foreign key (pal_cla_id_pal_cla) references add_palabras_clave (pal_cla_id),
	constraint pal_cla_fk_fam_olf foreign key (pal_cla_id_fam_olf) references add_familias_olfativas (fam_olf_id)
);

create table add_prohibidos (
	pro_tscacas varchar (15) primary key,
	pro_nombre varchar (50) not null
);

create table add_ing_ese_ese_per (
	ing_ese_ese_per_id_ing_ese int not null,
	ing_ese_ese_per_id_ese_per int not null,
	constraint pk_ing_ese_ese_per primary key (ing_ese_ese_per_id_ing_ese, ing_ese_ese_per_id_ese_per),
	constraint ing_ese_ese_per_fk_ing_ese foreign key (ing_ese_ese_per_id_ing_ese) references add_ingredientes_esencias (ing_ese_ipc),
	constraint ing_ese_ese_per_fk_ese_per foreign key (ing_ese_ese_per_id_ese_per) references add_esencias_perfumes (ese_per_id)
);

create table add_fam_olf_ese_per (
	fam_olf_ese_per_id_fam_olf int not null,
	fam_olf_ese_per_id_ese_per int not null,
	constraint pk_fam_olf_ese_per primary key (fam_olf_ese_per_id_fam_olf, fam_olf_ese_per_id_ese_per),
	constraint fam_olf_ese_per_fk_fam_olf foreign key (fam_olf_ese_per_id_fam_olf) references add_familias_olfativas (fam_olf_id),
	constraint fam_olf_ese_per_fk_ese_per foreign key (fam_olf_ese_per_id_ese_per) references add_esencias_perfumes (ese_per_id)
);