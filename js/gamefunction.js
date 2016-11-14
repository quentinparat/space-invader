//on initialise les ennemis en les affichant tous
function initEnnemy()
{
	var nb = 0;
	for (var ligne = 0; ligne < 5; ligne++){
		for (var colonne = 0; colonne < 12; colonne++){
			var myDiv = document.createElement("div");

			myDiv.classList.add('ennemy', 'ennemy-'+gstats.skin+'-'+ligne, 'en-'+ligne+'-'+colonne, 'ennemy-'+ligne, 'colenemy-'+colonne);
			myDiv.dataset.score = ligne;
			myDiv.dataset.id = nb;
			myDiv.style.padding = "2.43%";
			myDiv.style.left = colonne * 8.53 + "%";
			myDiv.style.top = ligne * 21.2 + "%";
			document.querySelectorAll('#enemis')[0].appendChild(myDiv);
			
			var m = new Monstre(true)
			listMonstre.push(m);
			nb ++;
		}
	}
}

//on ajoute le tir du joueur
function weaponAdd(origin){
	var missile=document.querySelectorAll('.Missile')

	 if(missile.length<2){
		  var myWeap = document.createElement('div');
		  myWeap.classList.add('Missile');
		  myWeap.style.left = (origin.offsetLeft + 45) + "PX";
		  myWeap.style.top = (origin.offsetTop - 12)  + "PX";
		  document.querySelectorAll('#container')[0].appendChild(myWeap);
	 }
}

//on supprime le tir du joueur
function weaponRemove(elem){
  document.querySelectorAll('#container')[0].removeChild(elem);
}

//on déplace le tir du joueur
function weaponMove(){
	if(gstats.aGame){ //on vérifie que le jeu soit lancé
		var destroy = true;
		var missile = document.querySelectorAll(".Missile");
		for( var i = 0; i < missile.length; i ++ ) {
			var posy = missile[i].offsetTop;
			if( posy >= 0){
				missile[i].style.top = (posy - 10) + "px";
				destroy = false;
			}

			if(destroy || collision(missile[i])){
				weaponRemove(missile[i]);
				
				if(destroy){
					if(vscore > 0){
						vscore -= 5;
					}
				}
			}
		}
		gstats.dScore.innerHTML = vscore;
	}
}

//collision entre le tir du joueur et les ennemis
function collision(e){

  var content = document.getElementById("blockennemi");
  var contentTop = content.offsetTop;
  var contentLeft = content.offsetLeft;

  var allEnnemy = document.querySelectorAll(".ennemy");
  var bulletX = e.offsetLeft;
  var bulletY = e.offsetTop;

  var bulletHeight = e.offsetHeight;
    for (var x = 0; x < allEnnemy.length; x ++){
		var EnSize = allEnnemy[x].offsetWidth;
      var EnnemyX = allEnnemy[x].offsetLeft + contentLeft;
      var EnnemyY = allEnnemy[x].offsetTop + contentTop;
        if( (bulletX > EnnemyX && bulletX < (EnnemyX + EnSize))
        && (bulletY  > EnnemyY && (bulletY + bulletHeight) < (EnnemyY + EnSize))   ){
          //content.removeChild(allEnnemy[x]);
		  allEnnemy[x].style.display = "none";
		  listMonstre[allEnnemy[x].dataset.id].display = false;
			playSound('killEnnemi');
			score(allEnnemy[x]);
			return true;
        }
    }

    return false;
  }

  
  //gestion des scores 
  function score(ennemy){
     var y = ennemy.dataset.score;
	
     vscore +=score_data[y];
    }


//on calcul à chaque frame le bloc ennemi en fonction des ennemis restants...
var maxligne = 11; //déplacer la variable ailleurs...
var maxligneLeft = 0;
var maxHeight = 4;

function getMaxBound()
{
		juennemi = document.getElementsByClassName('ennemy');
		
		myObj = {};
		myObj.maxRight = 0;
		myObj.maxLeft = 1000000;
		myObj.maxTop = 0;
		myObj.maxBottom = 0;
		
		
		
		
		for(var i = 0; i < juennemi.length; i++){
		var obj = juennemi[i].getBoundingClientRect();
		
		//console.log(typeof i);
		if(juennemi[i].style.display != "none"){
			if(myObj.maxLeft > obj.left){
				myObj.maxLeft = obj.left;
				myObj.maxLeftID = juennemi[i];
				
			}
			if(myObj.maxRight < obj.right){
				myObj.maxRight = obj.right;
				myObj.maxRightID = juennemi[i];
			}
			
				
				//console.log(myObj.maxRight);
				
		//console.log(myObj.maxLeft+" "+juennemi[3].offsetLeft);
				/*if(box.left < myObj.maxLeft){
					myObj.maxLeft = box.left;
					myObj.maxLeftID = juennemi[i];
				}
				if(box.left > myObj.maxLeft){
					myObj.maxLeft = box.left;
					myObj.maxLeftID = juennemi[i];
				}*/
				
			}
		}
		
		console.log("__ "+myObj.maxLeft);
		console.log("xx "+myObj.maxRight);
		return myObj;
}

function resizeBlockEnnemi(elem){
	var blockEnnemi = document.getElementById("enemis");
	
		if(elem == "RIGHT"){
			
			var nbEnnemi = document.getElementsByClassName("colenemy-"+maxligne);
			for(var x = 0; x < nbEnnemi.length; x ++){
				var display = nbEnnemi[x].style.display;
				if(display == "none"){
					count ++;
				}
			}
			
			if(count == 5){
				maxligne --;
			}
			return maxligne;
		}
		else if(elem == "LEFT"){
			
		}
		//gestion de la ligne du bas pour le déplacement 
		count = 0;
		var nbEnnemi = document.getElementsByClassName("ennemy-"+maxHeight);

		for(var x = 0; x < nbEnnemi.length; x ++){
			var display = nbEnnemi[x].style.display;
			if(display == "none"){
				count ++;
			}
		}
		
		//nbEnnemi.length
		if(count == nbEnnemi.length){
			blockEnnemi.style.height = (blockEnnemi.offsetHeight - (20 * 1.3))+"px";//(12 - i) * 8.53 + "%";
			maxHeight --;
		}
}

//la condition de vitoire
function conditionVictoire(){
	if(gstats.aGame){ //on vérifie que le jeu soit lancé	
		var nbMort = 0;
		for(var i = 0; i < listMonstre.length; i ++){
			if(!listMonstre[i].display){
				nbMort ++;
			}
		}
		
		if(nbMort == listMonstre.length){
		//if(nbMort == 1){
			gstats_modif(Array('aScore', 'aGame'));
			gstats.dScoreScreen.style.display = "block";
			gstats.dGame.style.display = "none";
			//stopSound("music");
		}
	}
}


//gestion des skins
function loadSkin(){
	var lect = gstats.stor.StorageLect('skin');
	
	if(lect != null){
		gstats.skin = lect['skin'];
	}
}

//quand le joueur selectionne un skin
function initMenuSelectSkin(){
	var item = document.getElementsByClassName("item-skin");
	
	for(var i = 0; i < item.length; i ++){
		item[i].addEventListener('click', (function(e){
			gstats.skin = this.dataset.skin;
			gstats.stor.StorageEcrit('skin', {skin:gstats.skin});
			changeSkinHero();
		}));
	}
}
//on change le skin du héro
function changeSkinHero(){
	var hero = document.getElementById("joueur");
	hero.classList.add('hero-'+gstats.skin);
}


//gestion de session storage (on sauvegarde les stats, les skins etc du joueur)
function storage(){
	this.StorageLect = function(key){
		var monobjet_json = sessionStorage.getItem(key);
		return(JSON.parse(monobjet_json));
	}
	
	this.StorageEcrit = function(key, val){
		sessionStorage.setItem(key, JSON.stringify(val));
	}
}

function conditiondefaite(){
	if(gstats.aGame){
		var block = document.getElementById("enemis");
		var blockE = document.getElementById("blockennemi");
		var container = document.getElementById("container");
		
		var blockTop = block.offsetTop;
		var tailleBlock = block.offsetHeight;

		var top = blockTop + tailleBlock + blockE.offsetTop;
		
		var lignevirtuel = (container.offsetHeight * 85) / 100; // (100 * container.offsetHeight) / 100 ;

		if (top >= lignevirtuel || pv == 0){
			gstats.aGame = false;
			gstats.aOver = true;
			gstats.dGame.style.display = "none";
			gstats.dOver.style.display = "block";
		}
	}
}


// Fonction qui fait tiré les ennemis //

	function shootEnnemy(){
	 var blockEnnemy = document.getElementById('blockennemi');
	 var shootEnnemy = document.createElement('div');
		var boucle = true;
		var shootrndLig = Math.floor(Math.random() * (5 - 1) + 1);
			 var shootrndCol= Math.floor(Math.random() * (12 - 1) + 1);
			 var ennemy = document.getElementsByClassName('en-' + shootrndLig + '-' + shootrndCol)[0];
			 

		//while(boucle){
			if(listMonstre[ennemy.dataset.id].display){
				 shootEnnemy.classList.add('missileEnnemy');
				 shootEnnemy.style.left = (ennemy.offsetLeft + blockEnnemy.offsetLeft + 10) + "px";
				 shootEnnemy.style.top = (ennemy.offsetTop + blockEnnemy.offsetTop - 12)  + "px";
				 document.getElementById('container').appendChild(shootEnnemy);
				boucle = false;
			}
		//}
	}


// Tir des ennemis
function shootEnnemyMove(){
	if(gstats.aGame){ //on vérifie que le jeu soit lancé
		var destroy = true;
		var missile = document.querySelectorAll(".missileEnnemy");
		var container=document.getElementById('container');
		for( var i = 0; i < missile.length; i ++ ) {
				var posy = missile[i].offsetTop;
			if( posy <= (container.offsetHeight - missile[i].offsetHeight - 10)){
					missile[i].style.top= (posy + 10) + "px";
					destroy = false;
				}

				if(destroy || collisionVaisseau(missile[i])){
					weaponRemove(missile[i]);

			}
			}

	}
}

function collisionVaisseau(elem){
//	if(elem.offsetLeft>=joueur.offsetLeft && elem.offsetLeft<= (joueur.offsetLeft + joueur.offsetWidth ) && elem.offsetTop==joueur.offsetTop )
	var collision = true;
	var joueur = document.getElementById('joueur');

	if(elem.offsetLeft>=joueur.offsetLeft && elem.offsetLeft<= (joueur.offsetLeft + joueur.offsetWidth ) && elem.offsetTop>=joueur.offsetTop && elem.offsetTop<=(joueur.offsetTop + joueur.offsetHeight))	{
	 	pv --;
		vie();
	}
	else{
		collision =  false;
	}

	return collision;
}

function vie(){
	
	var vie1 = document.getElementById('vie-0');
	var vie2 = document.getElementById('vie-1');
	var vie3 = document.getElementById('vie-2');

	if(pv==2){
		vie1.style.display="none";
	}
	if(pv==1){
		vie2.style.display="none";
	}
	if(pv == 0){
		vie3.style.display="none";
	}
}