drop database if exists perteSing;
create database if not exists perteSing;

use perteSing;

create table accident
(
	idA int primary key auto_increment,
    nom varchar(50)
);

create table propriete
(
	idP int primary key auto_increment,
    nom varchar(50) not null,
    typeP enum ("valeur", "liste") not null
);

create table LienProp
(
	idPropParent int,
    idPropFille int,
    primary key (idPropParent, idPropFille),
    foreign key (idPropParent) references propriete (idP),
    foreign key (idPropFille) references propriete (idP)
);

create table valeur
(
	idListe int primary key auto_increment,
    valeur varchar(10),
    idAcc int,
    idProp int,
    
    foreign key (idAcc) references accident (idA),
    foreign key (idProp) references propriete (idP)
);



insert into accident (nom) values
("Coude concentrique"),
("Coude aubes directrices"),
("Coude aubes concentriques"),
("Coude en tôle"),
("Coude en U"),
("Coude en O"),
("Coude 2 plans"),
("Coude en Z"),
("Coude à 90 plissé"),
("Coude à éléments"),
("Coude à angles vifs"),
("Coudes à parois différentes"),
("Coude arrondi"),
("Coude brusque"),
("Coude brusque à 90"),
("Coude double"),
("Bifurcation"),
("Birfucation améliorée"),
("Branchement symétrique"),
("Culotte"),
("Bifurcation coude arrondi");



insert into propriete (nom, typeP) values
("Angle (°)", 1),
("Rayon de courbure (mm)", 1),
("Diametre principal (mm)", 1),
("Largeur principale (mm)", 1),
("Nombre d'aubes", 1),
("Angle des aubes", 1),
("Hauteur principale", 1),
("Largeur Bk (mm)", 1),
("Largeur IO (mm)", 1),
("Débit latéral (m^3/h)", 1),
("Débit principal (m^3/h)", 1),
("Largeur rectiligne (mm)", 1),
("Hauteur rectiligne (mm)", 1),
("Largeur latérale (mm)", 1),
("Hauteur latérale (mm)", 1),

("Type de section", 2),
("Rotation", 2),
("Types d'aubes", 2),
("Type", 2),
("Type de coude", 2),
("Angle du 1er U", 2),
("Angle du 2ème U", 2),
("Angle d'assemblage", 2),
("Angle du coude (°)", 2),
("Nombre d'éléments", 2),
("Type d'angle", 2),
("Rayon de courbure", 2),
("Niche", 2),
("Type de circuit", 2),
("Type de branche", 2),
("Type de section", 2),
("Angle bifurcation (°)", 2),
("Type d'amélioration", 2),
("Cloison", 2),
("Type de branchement", 2);



insert into LienProp values
(16, 3),
(17, 4),
(16, 4),
(16, 7),
(29, 10),
(30, 10),
(35, 34),
(35, 10),
(35, 11);

insert into valeur (valeur, idProp) values
("Circulaire", 16),
("Rectuangulaire", 16),
("Largeur", 17),
("Hauteur", 17),
("Minces", 18),
("Profilées", 18),
("Assemblé", 19),
("Ondulé", 19),
("S", 20),
("S 2 plans", 20),
("Sinueux", 20),
("En U", 20),
("45°", 21),
("90°", 21),
("45°", 22),
("90°", 22),
("30°", 23),
("90°", 23),
("3", 24),
("4", 24),
("5", 24),
("Vif", 25),
("Bisoté", 25),
("Avec", 28),
("Sans", 28),
("Soufflage", 29),
("Reprise", 29),
("Latérale", 30),
("Rectiligne", 30),
("Rectangulaire", 31),
("Circulaire", 31),
("15°", 32),
("30°", 32),
("45°", 32),
("60°", 32),
("90°", 32);

select * from accident;
select idP, nom from propriete;
select * from LienProp;