function findFromID( list, id ){
	for( var item of list ){
		if( item.id == id ) return item;
	}
}

function calculate( isVillage, monster_id, monsterRank, weapon_id, challenge, attUp, song, elementalAttkUp, weak, sharpness, shp1, constructWeapon ){
	
	//The Monster
	var monster = monsterList[ monster_id ];
	
	//The Weapon
	var weapon
	if( weapon_id < 0 ){
		weapon = constructWeapon
	} else {
		weapon = findFromID( weaponList, weapon_id );
	}
	
	//Event modifier
	var eventModifier = isVillage ? 1 : 0.7;
	
	//Total Base Modifier
	var baseMod = 0;
	
	//Challenge Modifier
	switch( challenge ){
		case "base":
			break;
		case "c1":
			baseMod += 10;
			break;
		case "c2":
			baseMod += 25;
			break;
		case "pf":
			baseMod += 20;
	}
	
	//Add to Attack Up modifier
	switch( attUp ){
		case "au0":
			break;
		case "au10":
			baseMod += 10;
			break;
		case "au15":
			baseMod += 15;
			break;
		case "au20":
			baseMod += 20;
			break;
		case "au25":
			baseMod += 25;
			break;
	}
	
	//Hunting Horn Song multiplier
	var baseMultiplier = 1;
	switch( song ){
		case "au10":
			baseMultiplier += 0.1;
			break;
		case "au15":
			baseMultiplier += 0.15;
			break;
		case "au20":
			baseMultiplier += 0.2;
			break;
	}
	
	//Elemental Atatck Up
	var elementUp = 0;
	var elementMultiplier = 1;
	switch( elementalAttkUp ){
		case "+0":
			break;
		case "+1":
			elementUp = 40;
			elementMultiplier = 1.05;
			break;
		case "+2":
			elementUp = 60;
			elementMultiplier = 1.1;
			break;
		case "+3":
			elementUp = 90;
			elementMultiplier = 1.15;
			break;
	}
	
	//Sharpness mods
	var physSharpMod = 1;
	var eleSharpMod = 1;
	switch( sharpness ){
		case "yellow":
			physSharpMod = 1;
			eleSharpMod = 0.75;
			if( shp1 ){
				shp1 = false;
			} else {
				break;
			}
		case "green":
			physSharpMod = 1.05;
			eleSharpMod = 1;
			if( shp1 ){
				shp1 = false;
			} else {
				break;
			}
		case "blue":
			physSharpMod = 1.2;
			eleSharpMod = 1.06;
			if( shp1 ){
				shp1 = false;
			} else {
				break;
			}
		case "white":
			physSharpMod = 1.32;
			eleSharpMod = 1.12;
			if( shp1 ){
				shp1 = false;
			} else {
				break;
			}
		case "purple":
			physSharpMod = 1.44;
			eleSharpMod = 1.2;
			break;
	}
		
	
	//Physical Damage Setup
	var weaponType = findFromID( weaponTypes, weapon.class );
	
	//Find Weapon modifier
	var modifier = weaponType.modifier;
	
	//Find weapon power (after modifier)
	var rawPower = ( ( weapon.attack / modifier ) + baseMod ) * baseMultiplier;
	
	//Find expected value (with affinity)
	var expectedPower = rawPower;
	if( weapon.affinity !== 0 ){
		expectedPower += rawPower * ( 0.25 * ( weapon.affinity / 100 ) );
	}
	
	
	//Find outcome of each attack
	var attackOutcomes = [ ];
	var highestOutcome = 0;
	
	//Iterate for each motion
	for( var motionIteration = 0; motionIteration < weaponType.motions.length; motionIteration++ ){
		
		var motion = weaponType.motions[motionIteration];
		
		if( motion.type[0] == -1 ) continue;
		
		//Iterate for each damage type (default, enraged, invisible etc.)
		for( var damageState = 0; damageState < monster.damage_states.length; damageState++ ){
			
			var typeOfDamage = monster.damage_states[ damageState ];
			
			//Iterate for each body part
			for( var bodyPart = 0; bodyPart < monster['damage_' + typeOfDamage.name].length; bodyPart++ ){
				
				//Set the bodyPart
				var part = monster[ 'damage_' + typeOfDamage.name ][ bodyPart ];
				
				//Iterate through number of hits
				for( var hit = 0; hit < motion.power.length; hit++ ){
					
					//Physical Damge
					
					
					//Setting Weapon Damage Type
					var weaponDamageType = motion.type[hit];
					
					//Special Case for Lance and GunLance
					if( weaponType.id == 7 || weaponType.id == 8 ){
						weaponDamageType = part.damage[ 1 ] > part.damage[ 0 ] ? 1 : 0;
					}
					
					//Final Calculation
					var physicalOutput = expectedPower * ( motion.power[ hit ] / 100 ) * physSharpMod * ( part.damage[ weaponDamageType ] / 100 );
					
					
					
					
					
					
					
					//Elemental Damage
					var elementalDamage = 0;
					
					if( weapon.elements.length !== 0 ){
						
						var weaponElements = weapon.elements;
						
						//Select the correct element on a weapon if it has more than 1
						var elementSelection = weaponElements[0];
						if( motion.hasOwnProperty( "element" ) ){
							if( motion.element[ hit ] == 1 && !weaponElements[ 1 ]){
								elementSelection = weaponElements[0];
							} else {
								elementSelection = weaponElements[ motion.element[ hit ] ];
							}
						}
						
						//Select the correct emod if it matters
						var emod = 1;
						if( motion.hasOwnProperty( "emod" ) ){
							emod = motion.emod[ hit ];
						}
						
						//Effectiveness of the element against this specific monster bodypart
						var elementalEffectiveness = 0;
						if( elementSelection.id < 6 ){
							elementalEffectiveness = part.damage[ 2 + elementSelection.id ];
						}

						
						//Final Calculation
						elementalDamage = ( elementSelection.attack * elementMultiplier + elementUp ) / 10 * eleSharpMod * emod * elementalEffectiveness / 100;
						$("#fourth").html( elementalDamage );//Debug
					}
					
					
					
					//Final output
					var weakMod = weak ? 1.05 : 1;
					var outputDamage = (physicalOutput + elementalDamage) * eventModifier * weakMod;
					
					//TODO Modify by Sharpness
					
					attackOutcomes.push( outputDamage );
					if( outputDamage > highestOutcome ) highestOutcome = outputDamage;
					
				}
				
			}
			
		}
		
	}
	
	//Average out the attack damage values
	
	averageDamage = 0;
	
	//Sanity Check
	if( attackOutcomes.length > 0 ){
		for( var i = 0; i < attackOutcomes.length; i++ ){
			averageDamage += attackOutcomes[ i ];
		}
		averageDamage = averageDamage / attackOutcomes.length;
	}

	var rankModifier = 1;
	switch( monsterRank ){
		case "low":
			rankModifier = 0.5;
			break;
		case "high":
			rankModifier = 0.9;
			break;
		case "guild":
			rankModifier = 1.3;
			break;
	}
	
	var hitsToKill = Math.ceil( monster.hp * rankModifier / averageDamage );
	

	return [ Math.floor( averageDamage ), Math.floor( highestOutcome ), hitsToKill ];
	
}