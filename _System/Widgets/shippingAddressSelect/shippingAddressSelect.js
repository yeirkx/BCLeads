$( document ).ready(function() {
	$("#w_shippingAddressSelect").change(function(){
	$('input[name=ShippingAddress]').val($(this).find(":selected").data("address"));
	$('input[name=ShippingCity]').val($(this).find(":selected").data("city"));
	$('input[name=ShippingState]').val($(this).find(":selected").data("state"));
	$('input[name=ShippingZip]').val($(this).find(":selected").data("zipcode"));
	
	$('#ShippingCountry option[value=' + $(this).find(":selected").data("countrycode") + ']')
            .attr('selected',true);
	});
});