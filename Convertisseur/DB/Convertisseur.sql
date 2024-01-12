drop database if exists convertisseur;
create database if not exists convertisseur;

use convertisseur;

create table Domaine
(
	id int primary key auto_increment,
    libelle varchar(40)
);

create table Valeur
(
	id int primary key,
    idDomaine int,
    libelleSym varchar(10),
    libelleComplet varchar(40),
    isValRef bool default false,
    foreign key (idDomaine) references Domaine(id)
);

create table EstEgal
(
	idValRef int,
    idValConv int,
    rapport float,
    primary key(idValRef, idValConv),
    foreign key (idValRef) references Valeur(id),
    foreign key (idValConv) references Valeur(id)
);


insert into Domaine (libelle) values
("Pression"),
("Force"),
("Energie"),
("Puissance"),
("Temperature"),
("Viscosité cinématique"),
("Viscosité dynamique"),
("Longueur");


/*Valeurs de référence*/
insert into Valeur values
(1, 1, "bar", "bar", true),
(2, 2, "N", "Newton", true),
(3, 3, "J", "Joule", true),
(4, 4, "W", "Watt", true),
(5, 5, "K", "Kelvin", true),
(6, 6, "m²/s", "Mètre carré, par seconde", true),
(7, 7, "kg/ms", "Kilogramme par mètre-seconde", true),
(8, 8, "cm", "Centimètre", true);

insert into Valeur (id, idDomaine, libelleSym, libelleComplet) values
(9, 1, "Pa", "Pascal"),
(10, 1, "atm", "Atmosphère normale"),
(11, 1, "pz", "Pieze"),
(12, 1, "mm eau", "Milimètre d'eau ... 4°C"),
(13, 1, "kgf/cm²", "Kilogramme-force par cm²"),
(14, 1, "mm mercure", "Milimètre de mercure ... 0°C"),
(15, 1, "mbar", "Milibar"),
(16, 2, "kgf", "Kilogramme-force"),
(17, 2, "dyn", "Dyne"),
(18, 2, "sn", "Sthene"),
(19, 3, "kgm", "Kilogrammètre"),
(20, 3, "Wh", "Watt-heure"),
(21, 3, "Wh", "Kilowatt-heure"),
(22, 3, "cal", "Calorie"),
(23, 3, "kcal", "Kilocalorie"),
(24, 3, "th", "Thermie"),
(25, 3, "BTU", "BTU"),
(26, 4, "kW", "Kilowatt"),
(27, 4, "kcal/h", "Kilocalorie par heure"),
(28, 4, "th/h", "Thermie par heure"),
(29, 4, "kgm/s", "Kilogrammètre par seconde"),
(30, 4, "ch", "Cheval-vapeur"),
(31, 4, "fg/h", "Frigorie"),
(32, 5, "°C", "Degré Celsius"),
(33, 5, "°F", "Degré Fahrenheit"),
(34, 6, "maSt", "Myriastoke"),
(35, 6, "St", "Stoke"),
(36, 6, "cSt", "Centistoke"),
(37, 7, "daPo", "Décapoise"),
(38, 7, "Po", "Poise"),
(39, 7, "cPo", "Centipoise"),
(40, 7, "Pl", "Poiseuille"),
(41, 8, "m", "Mètre"),
(42, 8, "km", "Kilomètre"),
(43, 8, "in", "Pouce"),
(44, 8, "ft", "Pied"),
(45, 8, "yard", "Yard"),
(46, 8, "mile", "Mile");


insert into EstEgal values
(1, 9, 100000.0000000),
(1, 10, 0.9869232667),
(1, 11, 100.0000000),
(1, 12, 10197.1621000),
(1, 13, 1.01971621),
(1, 14, 750.0615000),
(1, 15, 1000.0000000),
(2, 16, 0.101971621),
(2, 17, 100000.0000000),
(2, 18, 0.0010000),
(3, 19, 0.101971621),
(3, 20, 0.00027777777),
(3, 21, 0.00000027777777),
(3, 22, 0.2390057),
(3, 23, 0.0002390057),
(3, 24, 0.0000002390057),
(3, 25, 0.000947831362),
(4, 26, 0.0010000),
(4, 27, 0.86042065),
(4, 28, 0.00086042065),
(4, 29, 0.101971621),
(4, 30, 0.0013600),
(4, 31, 0.86042065),
(5, 32, -272.1500000), /*ATTENTION :*/
(5, 33, -457.8700000), /*Soustraction, pas multiplication*/
(6, 34, 1.0000000),
(6, 35, 1000.0000000),
(6, 36, 100000.0000000),
(7, 37, 1.0000000),
(7, 38, 10.0000000),
(7, 39, 1000.0000000),
(7, 40, 1.0000000),
(8, 41, 0.0100000),
(8, 42, 0.0000100),
(8, 43, 0.393700787),
(8, 44, 0.0328084),
(8, 45, 0.010936133),
(8, 46, 0.000006213711932);


select * from Domaine;
select * from EstEgal;
select id, libelleComplet as "Valeur de référence" from Valeur where isValRef = true;
select id, libelleComplet as "Valeur à convertir" from Valeur where isValRef = false;