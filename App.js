$(document).ready(function(){

	$( "#calculate" ).click( () => {

		orderArr = [];
		packsArr = [];
			
		if( !$( "#alert" ).hasClass( "hidden" ) ) $( "#alert" ).addClass( "hidden" );
		if( !$( "#order-summary" ).hasClass( "hidden" ) ) $( "#order-summary" ).addClass( "hidden" );;

		getDesiredOrder();

		if(!checkRequest()) {
			$("#alert").toggleClass("hidden");
			return;
		}

		setPacksArr();
		comparePurchaseRebate();
		showOrderSummary();

	});

});