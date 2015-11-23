//Tracks if the background buttons should be disabled
var disableBackground = false;

$(document).ready(function(){
//at start of document
$("div.selectionPop").hide();
/* 	$("div.pressA").hide(); */
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
			$("div.weaponIcon").removeClass("onSelect").addClass("onDeselect");
			
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
		
		disableBackground = false;
	});
});