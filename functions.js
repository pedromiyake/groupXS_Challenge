const getDesiredOrder = () => {
	orderArr = [];
	for(i = 1; i <= 5; i++) {
		if($("#qt-book-" + i).val() == null || $("#qt-book-" + i).val() == '') { orderArr.push(0); }
		else {orderArr.push(parseInt($("#qt-book-" + i).val(), 10));}
	}
}

const sumNumberOfUnitis = (arr) => {
	let numberOfUnitis = 0;
	arr.forEach(function(unitsPerTitle) {
		numberOfUnitis+= unitsPerTitle;
	});
	return numberOfUnitis;
}

const setPacksArr = () => {
	let tempOrderArr = [...orderArr];
	while(sumNumberOfUnitis(tempOrderArr) > 0) {
		let pack = 0;
		for(i = 0; i < tempOrderArr.length; i++) {
			if(tempOrderArr[i] > 0) {
				tempOrderArr[i]--;
				pack++;
			}
		}
		packsArr.push(pack);
	}
}

const pricePerPack = (quantity) => {
	return pricePerUnit * quantity * (1 - rebatePolicy[quantity -1]);
}

const priceWholePurchase = () => {
	let finalPrice = 0;
	for(i = 0; i < packsArr.length; i++) {
		finalPrice += pricePerPack(packsArr[i]);
	}
	return finalPrice;
}

const maximizeDiscount = () => {
	while(packsArr[indexBase] > packsArr[indexCompare] + 1) {
		priceCurrent = pricePerPack(packsArr[indexBase]) + pricePerPack(packsArr[indexCompare]);
		priceNext = pricePerPack(packsArr[indexBase] - 1) + pricePerPack(packsArr[indexCompare] + 1);
		if(priceNext < priceCurrent) {
			packsArr[indexBase]--;
			packsArr[indexCompare]++;
		} else {
			break;
		}
	}
}

const comparePurchaseRebate = () => {
	for(indexBase = 0; indexBase < packsArr.length - 1; indexBase++) {
		for(indexCompare = indexBase + 1; indexCompare < packsArr.length; indexCompare++) {
			if(packsArr[indexBase] > packsArr[indexCompare] + 1) maximizeDiscount();
		}
	}
}

const numberToEuro = (num) => {
	var format = "€ " + num.toFixed(2).replace(".",",");
	return format;
}

const checkRequest = () => {
	if(sumNumberOfUnitis(orderArr) < 1) {
		return false;
	}
	return true;
}

const showOrderSummary = () => {

	$("#order-summary").removeClass("hidden");
	for(i = 0; i < orderArr.length; i++) {
		if(orderArr[i] > 0) {
			if( $( "#row-order-book-" + (i + 1) ).hasClass( "hidden" ) ) $( "#row-order-book-" + (i + 1) ).removeClass("hidden");
			$( "#qt-order-book-" + (i + 1) ).text(orderArr[i]);
		} else {
			if( !$( "#row-order-book-" + (i + 1) ).hasClass( "hidden" ) ) $( "#row-order-book-" + (i + 1) ).addClass("hidden");
		}
	}
	$("#before-discount").text(numberToEuro(sumNumberOfUnitis(orderArr) * 8));
	$("#after-discount").text(numberToEuro(priceWholePurchase()));
	$("#discount").text(numberToEuro(sumNumberOfUnitis(orderArr) * 8 - priceWholePurchase()));
}