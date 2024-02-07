create database pisolejo;

create table categorias(
	id serial primary key,
  descricao text not null 
);

insert into categorias (descricao) values ('Tijolo'),
('Argamassas'), ('Pisos e revestimentos'),('Areia'),
('Materiais hidráulicos'),('Materiais elétricos'),
('Ferramentas em geral'),('Madeiras'),
('Impermeabilizantes'),('Paineis e pias')

create table funcionarios(
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null 
);


create table produtos(
	id serial primary key,
  descricao text not null,
  quantidade_estoque int not null default 0,
  valor int not null default 0,
	categoria_id int references categorias(id)
);

create table clientes(
	id serial primary key,
	nome text not null, 
	email text not null unique,
	cpf varchar(11) not null unique,
	cep text,
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado text
);