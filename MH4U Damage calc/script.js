//Tracks if the background buttons should be disabled
var disableBackground = false;

//Tracks selected options
var selectedMonsterID;
var selectedWeaponID;
var selectedRank = 1;

$(document).ready(function(){
	//at start of document
	$("div.selectionPop").hide();
	/* 	$("div.pressA").hide(); */
	

	//Populate Monster Selection
	var htmlString = "<select id=\"monsterSelect\">\n<option value=\"\">Please Select a Monster</option>\n";
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
		var htmlString = "<select id=\"wepSel\" onchange=\"setWeapon(this)\">\n<option value=\"\">Please Select a Weapon</option>\n";
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
});


function setWeapon( value ){
	
	var val = value.value;
	
	if( !val || 0 === val.length || val < 0 ) return;
	
	selectedWeaponID = val;
	
}