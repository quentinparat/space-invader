	
	var deplacementHorizontale = 34;
 	var deplacementVerticale = 36;
	var window = 0;
	var ennemis = 0;
	var limitGauche = 30;
	var limiteDroite = 0;
	
	var enn;	
	var enLeft = 0;
	var bout=false;
	var y = 0;
		
		
	var ___init = true;
	//on initi le mouvement 
	function moveInit(){
		var window = document.getElementById("container");
		var ennemis = document.getElementById("enemis");
		limiteDroite = window.offsetWidth;
		limiteGauche = 0;
		//limiteDroite = (window.offsetWidth - ennemis.offsetWidth) - 36;
	}

	
	var total = 0;
	var vtotale = deplacementHorizontale;
	//on déplace les ennemis sur la gauche
	 function GoLeft(){
		total = 0;
 		enn.style.left = (enLeft - deplacementHorizontale)+ 'px';
 		enLeft=enn.offsetLeft;
		
		for(var i = 0; i < listMonstre.length; i ++){
			if(!listMonstre[i].display){
				total++;

			}
		}
		if(countLastKill!=total){
			deplacementHorizontale=vtotale+countLastKill;
			countLastKill = total; 
		}
	
 	}

	//on déplace les ennemis sur la droite
 	function GoRight(){
		total = 0;
 		enn.style.left = (enLeft + deplacementHorizontale)+ 'px';
 		enLeft=enn.offsetLeft;
		for(var i = 0; i < listMonstre.length; i ++){
			if(!listMonstre[i].display){
				total++;
			}
		}

		if(countLastKill!=total){
			deplacementHorizontale=vtotale+countLastKill;
			countLastKill = total; 
		}
 	}

	//on déplace les ennemis
 	function moveEnemy(){	
		if(gstats.aGame){
			moveInit(); //on appel la fonction qui recalcul la limite droite du block ennemi
			resizeBlockEnnemi(); //on appel la fonction qui recalcul à chaque frame la taille du box qui contient ennemi
			
			container = document.getElementById('container');
			enn = document.getElementById('blockennemi');
			ennmarg = document.getElementById('enemis');
					
			var style = ennmarg.currentStyle || window.getComputedStyle(ennmarg);
			var pourcentageML = parseInt(style.marginLeft);
			
			enLeft= enn.offsetLeft;
			y =enn.offsetTop;
			limitGauche = - pourcentageML;

			myObjet = getMaxBound();
			
			if (bout==false ){

		
				if(myObjet.maxRight > limiteDroite){
					bout=true;
					enn.style.top = (y+deplacementVerticale)+ 'px';
					y = enn.offsetTop; 
					
					//limiteDroite = myObjet.maxRight;
				}
				else{
					GoRight();
				}
			}

			else {
				
				console.log("-->"+myObjet.maxLeft);
				if(myObjet.maxLeft<limitGauche){
					bout=false;
					enn.style.top = (y+deplacementVerticale)+ 'px';
					y = enn.offsetTop;
					myObjet = getMaxBound();
					limiteGauche = myObjet.maxLeft;
				}
				else{
					GoLeft();
				}	
				
				
			
			}
		}
 	}
 	


