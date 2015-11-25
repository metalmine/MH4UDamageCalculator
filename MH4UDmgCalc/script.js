//Tracks if the background buttons should be disabled
var disableBackground = false;

//Tracks selected options
var selectedMonsterID;
var selectedWeaponID;
var selectedRank = "low";

$(document).ready(function(){
	//at start of document
	$("div.selectionPop").hide();
	$("#attackValue").hide();
	$("#eleValue").hide();
	$("#elemPick").hide();
	/* 	$("div.pressA").hide(); */
	

	//Populate Monster Selection
	var htmlString = "<select id=\"monsterSelect\">\n<option value=\"\" selected=\"true\" disabled=\"disabled\">Please Select a Monster</option>\n";
	for( var i = 0; i < monstersSelectionList.length; i++ ){
		htmlString += "<option value=\"" + monstersSelectionList[i]["sort_name"] + "\">" + monstersSelectionList[i]["name"] + "</option>\n";
	}
	htmlString += "</select>";
	$(".monsterPick").html( htmlString );
	
	//Callback when monster is selected
	$("#monsterSelect").change( function(){
		var val = $(this).val();
		if( !val || 0 === val.length ) return;
		
		selectedMonsterID = monstersSelectionList.filter( function( obj ){
			return obj[ "sort_name" ] == val;
		})[0].id;
		$(".monsterIcon").attr( "id", val );
	});
	
	//Callback when rank is selected
	$("#rankSelect").change( function( value ){
		selectedRank = $(this).val();
	});


	//Within Weapon and Armor Skill Selection
	$(".weaponCell").click( function(){
		$(".weaponIcon").attr("id", $(this).attr('id'));
		
		//Set Weapon
		var weaponClass = 0;
		switch( $(this).attr( "id" ) ){
			case "gs":
				weaponClass = 1;
				break;
			case "ls":
				weaponClass = 2;
				break;
			case "db":
				weaponClass = 4;
				break;
			case "sns":
				weaponClass = 3;
				break;
			case "ham":
				weaponClass = 5;
				break;
			case "hh":
				weaponClass = 6;
				break;
			case "la":
				weaponClass = 7;
				break;
			case "gla":
				weaponClass = 8;
				break;
			case "sa":
				weaponClass = 9;
				break;
			case "cb":
				weaponClass = 10;
				break;
			case "ig":
				weaponClass = 11;
				break;
		}
		var filteredWeapons = weaponList.filter( function( obj ){
				return obj.class == weaponClass;
			});
		var htmlString = "<select id=\"wepSel\" onchange=\"setWeapon(this)\">\n<option value=\"\" selected=\"true\" disabled=\"disabled\">Please Select a Weapon</option>\n";
		for( var i = 0; i < filteredWeapons.length; i++ ){
			htmlString += "<option value=\"" + filteredWeapons[i].id + "\">" + filteredWeapons[i].name + "</option>\n";
		}
		htmlString += "</select>";
		
		$(".wepPick").html( htmlString );
	});

	
	
	$(".weaponIcon").click( function(){
		if( !disableBackground ){
			$("div.wepPop").show("slide",500);
			$("div.pressA").show("slide",300);
			$("div.weaponIcon").removeClass("onSelect").addClass("onDeselect");
			
			disableBackground = true;
		}
	});
	
	//Within Buff Selection
	$(".buffIcon").click( function() {
		if( !disableBackground ){
			$("div.buffPop").show( "slide", 500 );
			$("div.pressA").show("slide",300);
			$("div.buffIconIcon").removeClass("onSelect").addClass("onDeselect");
			
			disableBackground = true;
		}
	});


	//Within Monster Selection
	$(".monsterIcon").click( function(){
		if( !disableBackground ){
			$("div.monPop").show("slide",500);
			$("div.pressA").show("slide",300);
			$("div.monsterIcon").removeClass("onSelect").addClass("onDeselect");
			
			disableBackground = true;
		}
	});
	
	//Done button
	$(".buttonDone").click( function(){
		$("div.wepPop").hide("slide",500);
		$("div.monPop").hide("slide",500);
		$("div.buffPop").hide("slide",500);
		$("div.monPop").hide("slide",500);
		$("div.pressA").hide("slide", 0 );
		$("div.weaponIcon").addClass("onSelect").removeClass("onDeselect");
		$("div.monsterIcon").addClass("onSelect").removeClass("onDeselect");
		
		disableBackground = false;
	});
	
	//Validate and Sent to Calculation
	$(".calculate").click( function(){
		
		//Validate Sharpness
		var sharpnessSelection = $("#sharpPick").val();
		if( !sharpnessSelection ){
			alert( "Sharpness hasn't been selected" );
			return;
		}
		
		//Validate Monster
		if( !selectedMonsterID ){
			alert( "Please select a monster!" );
			return;
		}
		
		//Validate Weapon
		if( !selectedWeaponID ){
			alert( "Please select a weapon!" );
			return;
		}
		
		//Constructed Relic Weapon, if applicable
		var construct;
		
		//If a --Relic Weapon-- was picked
		if( selectedWeaponID < 0 ){
			//Test for input correctness
			var attkValue = parseInt( $("#attackValue").val() );
			if( isNaN( attkValue ) ){
				alert( "Please enter a correct attack value" );
				return;
			}
			
			var eleValue = parseInt( $("#eleValue").val() );
			if( isNaN( eleValue ) ){
				alert( "Please enter a correct Elemental Value" );
				return;
			}
			
			var elemID = 1;
			switch( $("#elemPick").val() ){
				case "fire":
					elemID = 1;
					break;
				case "water":
					elemID = 2;
					break;
				case "thunder":
					elemID = 3;
					break;
				case "ice":
					elemID = 4;
					break;
				case "dragon":
					elemID = 5;
					break;
			}
			
			construct = {
				"affinity" : 0,
				"attack" : attkValue,
				"class" : Math.abs( selectedWeaponID ),
				"elements" : [ {
					"attack" : eleValue,
					"id" : elemID
				} ]
			}
		}
		

		
		//alert( $("#rankSelect").val() );//Debug
		//Send to calculate
		var disp = calculate( false, selectedMonsterID, $("#rankSelect").val(), selectedWeaponID, $("#challenge").val(), $("#attackup").val(), $("#hunting").val(), $("#elem").val(), $("#weak").is(":checked"), sharpnessSelection, $("#sharp").is(":checked"), construct );
		
		$(".topPop").html( 
			"Average Damage/hit: " + disp[0] + "</br>\n"
			+ "Most Effective Hit: "  + disp[1] + "</br>\n"
			+ "Monster will be killed in " + disp[2] + " hits"
		);
	});
});

//For some reason this particular function won't run from inside Document Ready, so it has to be manually called
function setWeapon( value ){
	
	var val = value.value;
	
	//Check for null input
	if( !val || 0 === val.length ) return;
	
	selectedWeaponID = val;
	
	if( selectedWeaponID > 0 ){
		$("#attackValue").hide();
		$("#eleValue").hide();
		$("#elemPick").hide();
	} else {
		$("#attackValue").show();
		$("#eleValue").show();
		$("#elemPick").show();
	}
}