//Tracks if the background buttons should be disabled
var disableBackground = false;

//Tracks selected options
var selectedMonsterID;
var selectedWeaponID;

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
	 $("#monsterSelect").change( function(value){
	  var val = $(this).val();
	  if( !val || 0 === val.length ) return;
	  
	  selectedMonsterID = monstersSelectionList.filter( function( obj ){
	   return obj[ "sort_name" ] == val;
	  })[0].id;
	  $(".monsterIcon").attr( "id", val );
	 });


	//Within Weapon and Armor Skill Selection
	$(".weaponCell").click( function(){
		$(".weaponIcon").attr("id", $(this).attr('id'));
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
		$("div.pressA").hide("slide",2000);
		$("div.weaponIcon").addClass("onSelect").removeClass("onDeselect");
		$("div.monsterIcon").addClass("onSelect").removeClass("onDeselect");
		
		disableBackground = false;
	});
});