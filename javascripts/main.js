jQuery(document).ready(function() {
	jQuery(".date_expire").each(function(){

			var defaultTime = "00:00:00"; //Change this if you want a different default time

			//DO NOT EDIT BELLOW
			var current = new Date();
			var expireContent = jQuery(this).data('content');
			var expiryDateMonth = jQuery(this).data('month'); 
			var expiryDateDay = jQuery(this).data('day');
			var expiryDateYear = jQuery(this).data('year');
			var expiryDateTime = jQuery(this).data('time');
			if(expiryDateTime == null){
				var expiryDateTime = defaultTime;
			};
			var expiryDate = new Date(expiryDateMonth + " " +  expiryDateDay + " " +  "," + expiryDateYear + " " + expiryDateTime);
			/*Un-comment this to see what date is being created, used for debugging can be removed. 
			console.log(expiryDate);*/
			
			if(current.getTime()>expiryDate.getTime()){
				if(expireContent == false){
					jQuery(this).hide();
				}else{
					jQuery(this).find('.show_af').show();
					jQuery(this).find('.hide_af').hide();
				}
			}
		});
	});
