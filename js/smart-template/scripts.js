// leadpages_input_data variables come from the template.json "variables" section
var leadpages_input_data = {};

$(function () {
	/* Vertically center media object blocks when 'media--vc' class is added */
	$('.media--vc').load(function(){
		$(window).on('resize', function() {
			$('.media--vc').each(function(index, el){
				el = $(this);
				var elHeight = el.outerHeight();
				var parentElHeight = el.parent().height();
				var delta = parentElHeight - elHeight;
	
				// media__img or media__img--rev that is stacked and not floating or
				// media__body when the paired media__img or media__img--rev is stacked and not floating
				if ( ((el.hasClass('media__img') || el.hasClass('media__img--rev')) && el.css('float') == 'none') ||
						(el.hasClass('media__body') && ((el.prev().hasClass('media__img') || el.prev().hasClass('media__img--rev')) && el.prev().css('float') == 'none')) ) {
					el.css('margin-top', '');
					return;
				}
	
				// set top margin to half of delta if delta is positive
				if (delta > 0) {
					el.css('margin-top', Math.round(delta/2) + 'px');
				}
			});
	
			/* Horizontally center the in-depth content block (needed to keep the top border wider than content) */
			$('.in-depth__content-block').each(function(index, el){
				el = $(this);
				var windowWidth = $(window).width();
				var sidePadding;
	
				if ( windowWidth > 960) {
					sidePadding = ((windowWidth - 960)/2) <= 105 ? ((windowWidth - 960)/2) : 105;
					el.css('padding-left', sidePadding + 'px');
					el.css('padding-right', sidePadding + 'px');
				} else {
					el.css('padding-left', '');
					el.css('padding-right', '');
				}
			});	
		}).trigger('resize');
		
		// Trigger the window resize continuously if within the builder
		// to adjust vertical centering on edits
		if ( typeof window.top.App !== 'undefined' ) {
			// within the builder
			setInterval( function(){
				$(window).trigger('resize');
			}, 500);
		}
	});	
	
	var Engine = {
		tweaks: {
			secureSiteSwap : function(){
				var winProtocol = window.location.protocol, // http: or https:
				winPath = window.location.pathname, // url path
				winParam = window.location.search, // url parameters
				domain = "http://tempbcleads.businesscatalyst.com", // non-secure domain
				secureDomain = "https://tempbcleads.worldsecuresystems.com"; // secure domain
			
				// add class to element on page to redirect to secure url in case user comes from non-secure domain
				if ($(".js-secure-switch").length > 0 && winProtocol === "http:") {
					window.location = secureDomain + winPath + winParam;
				}
				
				// if user is on secure url update all links in page body to have absolute links back to default domain
				if (window.location.protocol === "https:") {
					$("a[href^='/']").each(function() {
						var $this = $(this);
						var cur_href = $this.attr("href");
						if (!/http/.test(cur_href)) {
							$this.attr("href", domain + cur_href);
						}
					});
				}
			}, // end secure site swap tweak
			mails : function(){
				$('a[href^="mailto:"]').each(function(){
					var mail = $(this).attr('href').replace('mailto:',''),
						replaced = mail.replace('/at/','@');
					$(this).attr('href','mailto:' + replaced);
					if($(this).text() === mail) {
						$(this).text(replaced);
					}
				});
			} // end mail tweak
			
		} // end tweaks
	};
	Engine.tweaks.secureSiteSwap();
	
	/*================ USE NONSECURE DOMAIN ======================*/
	$("a[href^='/']").each(function(){
        var cur_href = $(this).attr("href");
       	if(!/http/.test( cur_href) ){
       		$(this).attr("href", 'http://tempbcleads.businesscatalyst.com'+cur_href);
        }             
	});
	
	 /*================ FOOTER PUSHED TO THE BOTTOM ======================*/
    $('.body-wrapper').css('padding-bottom',$('footer.site-footer-wrap').outerHeight()+'px');
});


//Override Shopping Cart
/*function UpdateShipping(e, t, a) {
    var n = document.getElementById("catCartDetails");
    if (n) {
        var i = CMS.OrderRetrievev2.ServerSideUpdateShipping(t, e, a);
        i.value[0] && (n.innerHTML = i.value[2]), i.value[1].length > 0 && (/(iP[ao]d|iPhone).*?Safari/.test(navigator.userAgent) ? setTimeout(function() {
            console.log(i.value[1])
        }, 0) : console.log(i.value[1]))
    }
}*/
/*function ApplyDiscountCode(e, t, a) {
    var n = document.getElementById("catCartDetails");
    if (n) {
        var i = CMS.OrderRetrievev2.ServerSideApplyDiscountCode(t, e, a);
        i.value[0] && (n.innerHTML = i.value[2]), i.value[1].length > 0 && alert(i.value[1])
		$(".discount_msg").show();
    }
	else{
		$(".discount_msg").hide();
	}
}*/

/*************************** bc-cart-tweaks-v1.JS *****************************/
// Auto Select First "Available Shipping Options" Radio Option From Shipping Options
/*function autoSelectShip() {
	"use strict";
	if($("#shippingCalc input:first").prop("checked") === false) {
		$("#shippingCalc input:first").prop("checked", true).trigger("click");
	}
}*/

// When Updating Items in Cart or Removing Products Maintain Shipping Options Selected
function setShippingOptions(selectedShippingOption) {
	"use strict";
	if (selectedShippingOption !== "") {
		$("#ShippingOptions").val(selectedShippingOption).trigger("change");
	}	
	
}

// Optional Custom Javascript That Won't Break After BC JS Events
function callback() {
	"use strict";
	// Add Code Here
}

$(function() {
    "use strict";

    //products match height
    $('.productList.productSmall .prod-item').matchHeight({
		byRow: true
	});
	$('.productList.productSmall .few-prod-item').matchHeight({
		byRow: true
	});

	//product layout
	$("ul.productList.productLarge").replaceWith($("ul.productList.productLarge li").html());

	//product image zoom
	$(".zoom-img").loupe();

	//tutorial Videos
	$(".prod_vid_link").each(function(index, element){
		var vid_link = $(this).attr("href");
		if(vid_link.includes("youtube")){
			var videoid = vid_link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
			var img = "https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
			$(this).html("<img class = 'img-responsive' src = '"+img+"' ><i class='fa fa-play' aria-hidden='true'></i>");
		}
		else if(vid_link.includes("vimeo")){
			var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
			var vimeoVideoID = vid_link.match(regExp);
			//var index = $(this).index();
			$.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoVideoID[2] + '.json?callback=?', {format: "json"}, function(data,index) {
			        var img = data[0].thumbnail_large;
			        console.log($(element));
			        $(element).html("<img class = 'img-responsive' src = '"+img+"' ><i class='fa fa-play' aria-hidden='true'></i>");
			});
			$(this).html("<img class = 'img-responsive' src = '"+img+"' ><i class='fa fa-play' aria-hidden='true'></i>");
					
		}
	});
	

	// Run Only If on Shopping Cart (update .shopping-cart class name if yours is different)
	if ($(".shopping_cartholder").size() === 0) {return;}
	
	// Hide Unnecessary Alerts While Showing Other Alerts in Custom Box/Modal
	window.alert = function(message) {
		// Array of Messages to Suppress
		var suppressedAlerts = ["Please enter shipping details or choose shipping charge.", "Shipping option selected successfully.", "Shipping option removed successfully."];
		if ($.inArray(message, suppressedAlerts) === -1) {
			$("body").append('');
			$(".alert-danger").text(message);
			$(".alert-danger").show();
			$(".alert-danger").delay(2000).fadeOut(300, function() {
				$(".alert-danger").hide();
			});			
		}
	};
	
	var $document = $(document),
	selectedShippingOption = $("#ShippingOptions").val();
	
	
	// On Change of Elements That Trigger BC JS Events That Break Code	
	$document.on("change", ".cartInputText, #DiscountCode, #GiftVoucher, #shippingPostcode, .shippingDiv select", function(e) {
		var target = $(e.target);
		// If Element That Is Being Changed Is the Update Quantity Run Function to Maintain Selected Shipping Options
		if (target.is(".cartInputText")) {
			$("#DiscountCode").val("");
			$("#DiscountCode").trigger("change");
			setShippingOptions(selectedShippingOption);
		}
		// Get Current Shipping Option Value
		if (target.is("#ShippingOptions")) {
			selectedShippingOption = $(this).val();
		}
		//autoSelectShip(); // Run Auto Select First "Available Shipping Options"
		callback(); // Run Function for Custom Javascript After BC JS Events
	});
	
	// On Click of Elements That Trigger BC JS Events That Break Code 
	// For Remove From Cart Link Make Sure You Add Class to Button (.shop-cart-remove) or Wrap Remove Link and Target Link Inside (.shop-cart-remove button)
	$document.on("click", ".remove_prod", function() {
		setShippingOptions(selectedShippingOption); // Run Function to Maintain Selected Shipping Options
		//autoSelectShip();  // Run Auto Select First "Available Shipping Options"
		callback(); // Run Function for Custom Javascript After BC JS Events
	});	
	$document.on("click", ".upsell_add", function() {
		setShippingOptions(selectedShippingOption); // Run Function to Maintain Selected Shipping Options
		//autoSelectShip();  // Run Auto Select First "Available Shipping Options"
		callback(); // Run Function for Custom Javascript After BC JS Events
	});		
	
	//Hide discount messages
	$document.on('click', '.close-alert', function(){
		$(this).parent('.discount_msg').toggleClass('in');
	});

	// on load run
	//autoSelectShip();  // Run Auto Select First "Available Shipping Options"
	callback(); // Run Function for Custom Javascript After BC JS Events
	
	
});


/*
FUNCTION freeProductPopup
-- Inputs:
			- priceThreshold: REQUIRED - The total cart amount needed to be eligible for the free product
			- catDirectory: REQUIRED - The url of the catalog the free products are located. This value should be passed as a string
			- multiple: True or False (default) depending on whether the quantity of the free product should be updated for every priceThreshold the customer has in their cart (ex: if multiple is true and priceThreshold is $10 and the user has $32 in their cart, the customer would get qty 3 of the free product selected)
-- Outputs: None
-- Author: Chicago Digital
-- Description: This function will allow the user to select a free product to add to their shopping cart (while on the shopping cart page) if their cart total meets a certain price threshold.
*/
function freeProductPopup(priceThreshold,catDirectory,multiple)
{
	// Check to make sure the code calling this function has the required parameters.
	if (!catDirectory || !priceThreshold)
	{
		console.log('priceThreshold and catDirectory are required parameters of the freeProductPopup function');
	}
	else
	{
		// Show the overal free product popup container on the chopping cart page
		jQuery('.free-product-popup').show();
		
		// Hide the ajax container if this function is called.
		jQuery('.special-ajax').hide();
		
		// Define the variables
		var totalCartPrice = parseFloat(jQuery('#total-price').text().substring(1));
		var totalShippingPrice = parseFloat(jQuery('#shipping-price').text().substring(1));
		var totalTax = parseFloat(jQuery('#tax').text().substring(1));
		// var totalProductAmount = totalCartPrice - totalShippingPrice - totalTax;
		var totalProductAmount = parseFloat(jQuery('#total-price').text().substring(1));
		var foundFreeProduct = jQuery('a[href^="/'+catDirectory+'"]').text();	
		console.log(foundFreeProduct);
		// Refresh the information if an item is removed from the cart
		jQuery(".remove_prod").on("click", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
					
		// Refresh the information if the product qty has changed			
		jQuery(".cartInputText").on("change", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
	
		// Refresh the information if the product qty has changed			
		jQuery(".shippingDropDown").on("change", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
		
		// Refresh the information if when the shipping destination zip code, discount code, or gift voucher values change		
		jQuery(".discountcodeInput").on("change", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
		
		// Refresh the information if an item is removed from the cart
		jQuery(".shippingCalc").on("click", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
		
		// Refresh the information if the "Address is residential is clicked
		jQuery("#shippingIsResidential").on("click", function(){ 
			freeProductPopup(priceThreshold,catDirectory,multiple);
			// removeProdCode();
			deployFancyBox();
		});
		
		
		// BEGIN: Disable QTY boxes from free products and set the QTY
		var freePosition = -1;
		jQuery('.name a').each(function(index) {
			if (jQuery(this).text().indexOf("FREE") != -1) freePosition = index;
		});
		
		var $inputs = jQuery('.quantity :input');
		var removeValues = {};
		var freeQty = 0;
		$inputs.each(function(index) {
			if (index == freePosition)
			{
				// Disable the qty box
				jQuery(this).attr("disabled", "disabled");
				
				// Only update the qty if multiple is set to true (passed as function parameter)
				if (multiple)
				{
				// Calculate the free qty
				freeQty = Math.floor(totalProductAmount/priceThreshold);
				
				// Update qty field to match free qty
				jQuery(this).val(freeQty);
				}
			}
			});
		// END: Disable QTY boxes from free products and set the QTY
	
		// START: Find and store the values for the updateItemQuantity function for the free item so we can remove it later 
		jQuery('.remove_prod').each(function(index) {
			if (index == freePosition)
				{
					var removeFunction = jQuery(this).attr("onclick").split("(")[1].split(",");
					for (var i = 0; i < removeFunction.length; i++) {
						removeValues[i] = removeFunction[i];
					}
				}
			
		});
		
		// Following if statements control the messages displayed to the customer given the following cart conidtions
		
		// CONDITION: Free product has already been added to cart
		if (foundFreeProduct != "" && totalProductAmount >= priceThreshold)
		{
			jQuery('.special-active').hide();
			jQuery('.special-ajax').hide();
			jQuery('.special-deactive').hide();
			jQuery('.special-under-balance').hide();
			jQuery('.special-used').show();
		}
		// CONDITION: Free product has been added to cart and the cart total is beneath the threshold (customer no longer qualifies for free product)
		else if (foundFreeProduct != "" && totalProductAmount < priceThreshold)
		{
			jQuery('.special-active').hide();
			jQuery('.special-ajax').hide();
			jQuery('.special-deactive').hide();
			jQuery('.special-used').hide();
			jQuery('.special-under-balance').show();
			
			// remove the free product from the cart
			UpdateItemQuantity(removeValues[0],removeValues[1],removeValues[2],removeValues[3],removeValues[4],'','US');return false;
		}
		// CONDITION: Customer is eligible for free product but has not added the product to cart yet
		else if (totalProductAmount >= priceThreshold)
		{
			jQuery('.special-deactive').hide();
			jQuery('.special-ajax').hide();
			jQuery('.special-under-balance').hide();
			jQuery('.special-active').show();
		}
		// CONDITION: Customer is not eligible for the deal
		else
		{
			jQuery('.special-ajax').hide();
			jQuery('.special-under-balance').hide();
			jQuery('.special-deactive').show();
		}
	}
};


function deployFancyBox(){
	if($(".fp-iframe").length > 0){
	$(".fp-iframe").fancybox();
	}
}







