$(document).ready(function(){
//at start of document
$("div.selectionPop").hide();
/* 	$("div.pressA").hide();
	$(".weaponIcon").hide();
	$(".monsterIcon").hide();
	$(".buffIcon").hide(); */
//Within Weapon and Armor Skill Selection
	$(".weaponCell").click( function(){
		$("div.selectionPop").hide("slide",500);
		$("div.pressA").hide("slide",500);
		$(".weaponIcon").attr("id", $(this).attr('id'));
		$("div.weaponIcon").removeclass("onSelect").addclass("onDeselect");
	});
	$(".weaponIcon").click( function(){
		$("div.selectionPop").show("slide",500);
		$("div.pressA").show("slide",500);
		$("div.weaponIcon").addclass("onSelect").removeclass("onDeselect");
	});
	
//Within Buff Selection


//Within Monster Selection
	
});