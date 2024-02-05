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


