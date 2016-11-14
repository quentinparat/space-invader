
function gstats_modif(key){
	if(Array.isArray(key)){
		for(var i = 0; i < key.length; i ++){
			var k = key[i];
			if(gstats[k]){
				gstats[k] = false;
			}
			else{
				gstats[k] = true;
			}
		}
	}
}

function initGame(){
	gstats.aMenu = true;
	gstats.dMenu = document.querySelectorAll("#ecranStart")[0];
	gstats.dGame = document.querySelectorAll("#container")[0];
	gstats.dPause = document.querySelectorAll("#pause")[0];
	gstats.dOver = document.querySelectorAll("#gameOver")[0];
	gstats.dScore = document.querySelectorAll("#score")[0];
	gstats.dScoreScreen = document.querySelectorAll("#scoreScreen")[0];

	gstats.dOver.style.display = "none";
	gstats.dGame.style.display = "none";
	gstats.dPause.style.display = "none";
	gstats.dScoreScreen.style.display = "none";
	
	gstats.stor = new storage();
	initMenuSelectSkin(); //on initialise le menu de choix des skins
	loadSkin(); //on charge le skin 
	changeSkinHero(); //on charge le skin pour le héro
	
	html = document.querySelectorAll("html")[0];
	
	loadSound('sound/music.mp3', 'music');
	loadSound('sound/shoot.wav', 'fire');
	loadSound('sound/invaderkilled.wav', 'killEnnemi');
	loadSound('sound/explosion.wav', 'killPlayer');
	
	stor = new storage();
	
	html.addEventListener('keydown', (function(e){
		//si on est dans le menu principal
		if(gstats.aMenu){
			//si on appuie sur la touche entrer
			if(e.keyCode == vKey['ENTRER']){
				gstats_modif(Array('aMenu', 'aGame'));
					gstats.dMenu.style.display = "none";
					gstats.dGame.style.display = "block";
			}
			
		}
		else if(gstats.aOver){
			if(e.keyCode == vKey['SPACE']){
				gstats_modif(Array('aGame', 'aOver'));
				//gstats_modif(Array('aMenu'));
				
			}				
			console.log('gameover');
		}
		else if(gstats.aScore){
		
		}
		else if(gstats.aPause){
			if(e.keyCode == vKey['PAUSE']){
				gstats_modif(Array('aPause', 'aGame'));
				gstats.dPause.style.display = "none";
				gstats.dGame.style.display = "block";	
			}
		}
		else if(gstats.aGame){
			gstats.dOver.style.display = "none";
			gstats.dPause.style.display = "none";
			gstats.dMenu.style.display = "none";
			gstats.dGame.style.display = "block";
			_game(e);
		}
		
	}));
	
}

function _game(e){
	
	if(!gstats.GameInit){
		initEnnemy();
		gstats.GameInit = true;
		moveInit();
		setInterval(moveEnemy,500);
		setInterval(weaponMove, 10);
		setInterval(shootEnnemy, 1500);
		setInterval(shootEnnemyMove, 50);
		setInterval(conditionVictoire, 50);
		setInterval(conditiondefaite, 50);
		playSound('music', true);
	}
	
	game(e);

}

function game(e){
	
		var joueur = document.getElementById('joueur');
		var container = document.getElementById('container');
		var widthCONTAINER = container.offsetWidth;
		var joueurv= joueur.offsetWidth;
	  
		//conditionVictoire();
		  var vitesse = 30;
			 if(e.keyCode == vKey['GAUCHE'] || e.keyCode == vKey['Q'])
			 {
				 /* Pour la touche gauche */
				 var i = joueur.offsetLeft;
				 if(i>10){
					joueur.style.left = (i - vitesse) + 'px';
				}
			 }
			 else if(e.keyCode == vKey['DROITE'] || e.keyCode == vKey['D'])
			 {
				 /* Pour la touche droite */
				 var i = joueur.offsetLeft;
				 if(i<(widthCONTAINER-(joueurv*1.3))){
					joueur.style.left = (i + vitesse) + 'px';
				 }
			 }
			 
			 
			 if(e.keyCode == vKey['SPACE']){
				 weaponAdd(joueur);
				 playSound('fire');
			 }
			else if(e.keyCode == vKey['PAUSE']){
				gstats_modif(Array('aPause', 'aGame'));
				gstats.dPause.style.display = "block";
				gstats.dGame.style.display = "none";
			}
}