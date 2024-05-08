jQuery(document).ready(function() {
    
      $.each($(".date_expire"), function(i,item) {
        //logic to get date, and determin if current date is before or after set date
        var fieldDate = get_field_date(item);
        var currentDate = new Date();
        var date_check = check_field_date(currentDate, fieldDate);


        var parent_hide = $(item).data('hideparent');
        //if parent_hide is set and == true, hide whole block after date, else check for sub items to show or hide after date
        if (parent_hide !== undefined && parent_hide == true){
            console.log(parent_hide, date_check);
            if(!date_check){
                item_action($(item),"show");
            }else{
                item_action($(item),"hide");
            }
        }else{
            $.each($(".date_expire_action"), function(ii,date_expire_action_item) {
                var expire_action_data_action = $(date_expire_action_item).data('action');
                switch (expire_action_data_action) {
                    case "hide_af":
                        if(!date_check){
                            item_action($(date_expire_action_item),"show");
                        }else{
                            item_action($(date_expire_action_item),"hide");
                        }
                        
                        break;
                    case "show_af":
                        if(date_check){
                            item_action($(date_expire_action_item),"show");
                        }else{
                            item_action($(date_expire_action_item),"hide");
                        }
                        break;
                    default:
                        break;
                }
            });
        }
      });
});

function get_field_date(data_item){
    /*Set default time, and get the current item data info and return fieldDate*/
    var defaultTime = "00:00:00"; //Change this if you want a different default time

    //DO NOT EDIT BELLOW
    var expiryDateMonth = $(data_item).data('month');
    var expiryDateDay = $(data_item).data('day');
    var expiryDateYear = $(data_item).data('year');
    var expiryDateTime = $(data_item).data('time');
    if(expiryDateTime == null){
        var expiryDateTime = defaultTime;
    };
    var expiryDate = new Date(expiryDateMonth + " " +  expiryDateDay + " " +  "," + expiryDateYear + " " + expiryDateTime);
    return expiryDate;
}


function check_field_date(currentDate, fieldDate){
    /*true == field date has passed
    false == field date has not passed
    if current date is > field date return true, else return false*/
    var returnCheck = undefined;
    if(currentDate.getTime()>fieldDate.getTime()){
        returnCheck = true;
        
    }else{
        returnCheck = false;
    }
    return returnCheck;
}

function item_action(the_item,the_action){
    if(the_action == "show"){
        $(the_item).show();
    }else if(the_action == "hide"){
        $(the_item).hide();
    }

}