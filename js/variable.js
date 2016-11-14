var listMonstre = new Array();

function Monstre(display){
	this.display = display;
}

var vscore = 0;
var score_data ={0:100,1:80,2:60,3:40, 4:20, 5:10};

var gstats = {
	'aMenu' : false, /* action du joueur pour le menu */
	'dMenu' : false, /* div du menu */
	
	'aGame' : false, /* action du joueur dans le jeu */
	'dGame' : false, /* div de la partie */
	
	'aPause' : false, /* action du joueur dans la pause */
	'dPause' : false, /* div de la pause */
	
	'aOver' : false, /* action du joueur dans le game over */
	'dOver' : false, /* div du gamer ove */	
	
	'dScoreScreen' : false, //écran des scores/victoires
	'aScore' : false, //action de l'écran des scores/victoires
	
	'GameInit' : false, //si le jeu est déjà initialisé
	'dScore' : false, //div des scores dans le jeu
	
	'stor': null,
	'skin' : 'classic' //gestion des skins
};

pv = 3;

var vKey = {
	'Q' : 81,
	'D' : 68,
	'ENTRER' : 13,
	'GAUCHE' : 37,
	'DROITE' : 39, 
	'PAUSE' : 80,
	'SPACE' : 32,
	'ESCAPE' : 27
};

var countLastKill = 0;