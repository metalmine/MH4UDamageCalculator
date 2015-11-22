$(document).ready(function(){
/*at start of document
	$("div.selectionPop").hide();
	$("div.pressA").hide();
	$(".weaponIcon").hide();
	$(".monsterIcon").hide();
	$(".buffIcon").hide();*/
//Within Weapon and Armor Skill Selection
	$(".weaponCell").click( function(){
		$("div.selectionPop").hide("slide",500);
		$("div.pressA").hide("slide",500);
		$(".weaponIcon").attr("id", $(this).attr('id'));
	});
	$(".weaponIcon").click( function(){
		$("div.selectionPop").show("slide",500);
		$("div.pressA").show("slide",500);
	});
});