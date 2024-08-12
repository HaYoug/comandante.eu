/**
 * Script Render Datalayer
 *
 * @version 2.6
 * @package 'datalayer'
 */

jQuery( function ( $ ) {
	if (RenderDatalayer.addToCartJsEvents) {
		jQuery( 'a[href*=add-to-cart],body.single-product button[name=add-to-cart],div[data-block-name=\'woocommerce/single-product\'] button[name=add-to-cart]' ).on( 'click', function(){
			var quantity = jQuery( this ).data( 'quantity' );
			if ( ! quantity) {
				var quantity = jQuery( 'body' ).find( 'input[name=quantity]' ).val();
				if ( ! quantity) {
					quantity = 1;
				}
			}


			var product_id = jQuery( this ).data( 'product_id' );
			var id         = jQuery( this ).val();

			var productClicked = false;
			if (product_id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == product_id );
			}
			if (id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == id );
			}

			if (jQuery( this ).hasClass('single_add_to_cart_button')) {
				productClicked = RenderDatalayer.currentProduct[0];
			}

			var value = quantity * productClicked.price;
			if (isNaN(value) || value === undefined){
				value = productClicked.price;
			}

			if (productClicked) {
				delete productClicked.id_match;
				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'addToCart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currencyCode': RenderDatalayer.currencyCode,
								'add': {
									'actionField': {'list': productClicked.list},
									'products': [ productClicked ]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					productClicked.quantity = quantity;
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'add_to_cart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'value': parseFloat(value.toFixed(2)),
								'items': [ productClicked ]
							}
						}
					);
				}
			}
		});

		jQuery( "body.single-product .woocommerce-variation-add-to-cart button.single_add_to_cart_button" ).on(
			"click",
			function(){
				if ( ! jQuery( this ).hasClass( 'disabled' )) {
					var quantity = jQuery( 'body' ).find( 'input[name=quantity]' ).val();
					if(quantity === undefined){
						quantity   = 1;
					}
					var product_id = jQuery( this ).parent().find( 'input[name=variation_idd]' ).val();
					if (product_id === undefined){
						product_id = jQuery( 'body' ).find( 'input[name=variation_id]' ).val();
					}
					var variant = RenderDatalayer.currentProduct[0].variations.find( element => element.id == product_id );

					RenderDatalayer.currentProduct[0].price = variant.variation_price;
					var value = quantity * RenderDatalayer.currentProduct[0].price;
					if (isNaN(value) || value === undefined){
						value = RenderDatalayer.currentProduct[0].price;
					}

					let currentProductCloned = Object.assign({}, RenderDatalayer.currentProduct[0]);

					delete currentProductCloned.id_match;
					delete currentProductCloned.variations;

					if (RenderDatalayer.datalayerOption == 'UA') {
						currentProductCloned.variant = variant.variation_name;
						currentProductCloned.name = variant.variation_name_product;
						currentProductCloned.id = variant.variation_id;
						dataLayer.push(
							{
								'event': 'addToCart',
								'event_id': RenderDatalayer.eventId,
								'ecommerce': {
									'currencyCode': RenderDatalayer.currencyCode,
									'add': {
										'actionField': {'list': currentProductCloned.list},
										'products': RenderDatalayer.currentProduct
									}
								}
							}
						);
					}
					if (RenderDatalayer.datalayerOption == 'GA4') {
						currentProductCloned.item_variant = variant.variation_name;
						currentProductCloned.item_name = variant.variation_name_product;
						currentProductCloned.item_id = variant.variation_id;
						currentProductCloned.quantity = quantity;
						if(variant.variation_discount !== 0){
							currentProductCloned.discount = variant.variation_discount;
						}
						dataLayer.push( { ecommerce: null } );
						dataLayer.push(
							{
								'event': 'add_to_cart',
								'event_id': RenderDatalayer.eventId,
								'ecommerce': {
									'currency': RenderDatalayer.currencyCode,
									'value': parseFloat(value.toFixed(2)),
									'items': currentProductCloned
								}
							}
						);
					}
				}
			}
		);
	}

	jQuery( 'li.product,div.product-list-item,div.product-grid-item,li.wc-block-grid__product,div.type-product' ).click(
		function () {
			var product_id     = jQuery( this ).find( 'a[href*=add-to-cart],a[href*=add_to_wishlist] ,a.product_type_variable, a.product_type_external' ).data( 'product_id' );
			var id             = jQuery( this ).find( 'div' ).data( 'id' );
			var classes 	   = jQuery( this ).attr('class').split(' ');
			var postClass = classes.find(function(className) {
				return className.startsWith('post-');
			});


			var productClicked = false;
			if (product_id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == product_id );
			}
			if (id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == id );
			}
			if ( undefined === id && undefined === product_id && postClass){
				productClicked = RenderDatalayer.products.find( element => element.id_match == postClass.split('-')[1] );
			}
			if (productClicked) {
				delete productClicked.id_match;
				delete productClicked.variations;
				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'productClick',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currencyCode': RenderDatalayer.currencyCode,
								'click': {
									'actionField': {'list': productClicked.list},
									'products': [ productClicked ]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'select_item',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'items': [ productClicked ]
							}
						}
					);

					if(productClicked.promotion_id){
						dataLayer.push( { ecommerce: null } );
						dataLayer.push(
							{
								'event': 'select_promotion',
								'event_id': RenderDatalayer.eventId,
								'ecommerce': {
									'creative_name': productClicked.creative_name,
									'creative_slot': productClicked.creative_slot,
									'promotion_id': productClicked.promotion_id,
									'promotion_name': productClicked.promotion_name,
									'items': [ productClicked ]
								}
							}
						);
					}
				}
			}
		}
	);

	function remove_item(){
		var links = document.querySelectorAll("a[href*='?remove_item']");
		links.forEach(function(link) {
			link.addEventListener('click', function() {
				var id = link.getAttribute("data-product_id");
				var name = link.getAttribute("data-product_name");
				var sku = link.getAttribute("data-product_sku");
				var price = link.getAttribute("data-product_price");
				var category = link.getAttribute("data-product_category");
				var variant = link.getAttribute("data-product_variant");
				var quantity = link.getAttribute("data-product_quantity");
				var brand = link.getAttribute("data-product_brand");
				var discount = link.getAttribute("data-product_discount");
				var idOrSku = RenderDatalayer.idOrSku;
				if (idOrSku=='SKU'){
					id = sku;
				}
				var value = price * quantity;
				if (isNaN(value) || value === undefined){
					value = price;
				}
				const categoryString = category;
				const lastIndex = categoryString.lastIndexOf("-");
				const sanitizedCategoryString = (lastIndex !== -1) ? categoryString.slice(0, lastIndex) : categoryString;
				const categoryArray = sanitizedCategoryString.split('-');
				const categoriesObject = {};
				categoryArray.forEach((category, index) => {
					const categoryKey = (index === 0) ? 'item_category' : `item_category${index + 1}`;
					categoriesObject[categoryKey] = category;
				});

				var productItems = {
					'item_id': id,
					'item_name': name,
					'price': price,
					...categoriesObject,
					'quantity': quantity,
					'item_brand': brand,
					'item_variant': variant
				};

				if(discount !== '0'){
					productItems['discount'] = discount;
				}

				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'removeFromCart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'remove': {
									'products': [{
										'name': name,
										'id': id,
										'price': price,
										'brand': brand,
										'category': categoriesObject.item_category,
										'variant': variant,
										'quantity': quantity
									}]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'remove_from_cart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'value': value,
								'items': [ productItems ]
							}
						}
					);
				}
			});
		});
	}
	remove_item();
	jQuery( document ).ajaxStop(
		function() {
			remove_item();
		}
	);

	if (RenderDatalayer.checkoutJsEvents) {

		document.body.addEventListener('change', function (e){
			var input_name   = e.target.getAttribute('name');
			if (e.target && input_name) {
				const type = e.target.value;
				if( RenderDatalayer.add_shipping_info === 'selected' ){
					if ( input_name.includes('shipping_method') || input_name.includes('radio-control-0') ) {
						add_shipping_info( type );
					}
				}
				if( RenderDatalayer.add_payment_info === 'selected' ){
					if ( input_name === 'payment_method' || input_name === 'radio-control-wc-payment-method-options' ) {
						add_payment_info( type );
					}
				}
			}
		});
		document.body.addEventListener('click', function(e) {
			var input_name   = e.target.getAttribute('name');
			var button = e.target.closest('.wc-block-components-checkout-place-order-button');
			if ( input_name === 'woocommerce_checkout_place_order' || button ){
				if( RenderDatalayer.add_shipping_info === 'button' ){
					var checked_shipping_method = document.querySelector('input[name="shipping_method[0]"]:checked') || document.querySelector('input[name="radio-control-0"]:checked');
					if(checked_shipping_method){
						add_shipping_info(checked_shipping_method.value);
					}
					else{
						var checked_shipping_method = document.querySelector('input[name="shipping_method[0]"]') || document.querySelector('input[name="radio-control-0"]');
						if(checked_shipping_method){
							add_shipping_info(checked_shipping_method.value);
						}
					}
				}
				if( RenderDatalayer.add_payment_info === 'button' ){
					var checked_payment_method = document.querySelector('input[name="payment_method"]:checked') || document.querySelector('input[name="radio-control-wc-payment-method-options"]:checked');
					if(checked_payment_method){
						add_payment_info(checked_payment_method.value);
					}
				}
			}
		});

		function add_payment_info( type ){
			dataLayer.push( { ecommerce: null } );
			dataLayer.push(
				{
					'event': 'add_payment_info',
					'event_id': RenderDatalayer.eventId,
					'ecommerce': {
						'currency': RenderDatalayer.currencyCode,
						'value': RenderDatalayer.value,
						'payment_type': type,
						'items': RenderDatalayer.products
					}
				}
			);
		}

		function add_shipping_info( type ){
			dataLayer.push( { ecommerce: null } );
			dataLayer.push(
				{
					'event': 'add_shipping_info',
					'event_id': RenderDatalayer.eventId,
					'ecommerce': {
						'currency': RenderDatalayer.currencyCode,
						'value': RenderDatalayer.value,
						'shipping_tier': type,
						'items': RenderDatalayer.products
					}
				}
			);
		}
	}

	if (RenderDatalayer.viewItemJsEvents) {
		jQuery(document).on('found_variation', function (event, product_variation) {

			var quantity   = 1;
			var product_id = product_variation.variation_id;

			const RenderActuallyDatalayer = structuredClone(RenderDatalayer);
			var variant = RenderActuallyDatalayer.currentProduct[0].variations.find( element => element.id == product_id );

			RenderActuallyDatalayer.currentProduct[0].price = variant.variation_price;
			delete RenderActuallyDatalayer.currentProduct[0].id_match;
			delete RenderActuallyDatalayer.currentProduct[0].variations;

			if (RenderActuallyDatalayer.datalayerOption == 'UA') {
				RenderActuallyDatalayer.currentProduct[0].variant = variant.variation_name;
				RenderActuallyDatalayer.currentProduct[0].name = variant.variation_name_product;
				RenderActuallyDatalayer.currentProduct[0].id = variant.variation_id;
				dataLayer.push(
					{
						'event': 'addToCart',
						'event_id': RenderActuallyDatalayer.eventId,
						'ecommerce': {
							'currencyCode': RenderActuallyDatalayer.currencyCode,
							'add': {
								'actionField': {'list': RenderActuallyDatalayer.currentProduct[0].list},
								'products': RenderActuallyDatalayer.currentProduct
							}
						}
					}
				);
			}
			if (RenderActuallyDatalayer.datalayerOption == 'GA4') {
				RenderActuallyDatalayer.currentProduct[0].item_variant = variant.variation_name;
				RenderActuallyDatalayer.currentProduct[0].item_name = variant.variation_name_product;
				RenderActuallyDatalayer.currentProduct[0].item_id = variant.variation_id;
				if(variant.variation_discount !== 0){
					RenderActuallyDatalayer.currentProduct[0].discount = variant.variation_discount;
				}
				dataLayer.push( { ecommerce: null } );
				dataLayer.push(
					{
						'event': 'view_item',
						'event_id': RenderActuallyDatalayer.eventId,
						'ecommerce': {
							'currency': RenderActuallyDatalayer.currencyCode,
							'items': RenderActuallyDatalayer.currentProduct
						}
					}
				);
			}

		});
	}
});
