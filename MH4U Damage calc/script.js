$(document).ready(function(){
//at start of document
$("div.selectionPop").hide();
/* 	$("div.pressA").hide();
//Within Weapon and Armor Skill Selection
	$(".weaponCell").click( function(){
		$(".weaponIcon").attr("id", $(this).attr('id'));
	});
	$(".weaponIcon").click( function(){
		$("div.wepPop").show("slide",500);
		$("div.pressA").show("slide",500);
		$("div.weaponIcon").removeClass("onSelect").addClass("onDeselect");
	});
	
//Within Buff Selection


//Within Monster Selection
	$(".monsterIcon").click( function(){
		$("div.monPop").show("slide",500);
		$("div.pressA").show("slide",500);
		$("div.weaponIcon").removeClass("onSelect").addClass("onDeselect");
	});
	
//Done button
	$(".buttonDone").click( function(){
		$("div.wepPop").hide("slide",500);
		$("div.monPop").hide("slide",500);
		$("div.buffPop").hide("slide",500);
		$("div.monPop").hide("slide",500);
		$("div.pressA").hide("slide",500);
		$("div.weaponIcon").addClass("onSelect").removeClass("onDeselect");
	});
});