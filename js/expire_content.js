jQuery(document).ready(function() {

});jQuery(document).ready(function() {
    
      $.each($(".date_expire"), function(i,item) {
        //logic to get date, and determin if current date is before or after set date

        var item_type = $(item).data('type');
        var fieldDate = get_field_date(item,item_type);
        var currentDate = new Date();
        var date_check = check_field_date(currentDate, fieldDate, item_type);

        var parent_hide = $(item).data('hideparent');

        //if parent_hide is set and == true, hide whole block after date, else check for sub items to show or hide after date
        if (parent_hide !== undefined && parent_hide == true){

            if(date_check){
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

function get_field_date(data_item,item_type){

    
    /*Set default time, and get the current item data info and return fieldDate*/
    var defaultTime = "00:00:00"; //Change this if you want a different default time

    var expiryDateArray = {};

    switch (item_type) {
        case "hide_show":
            var expiryDateMonth = $(data_item).data('month');
            var expiryDateDay = $(data_item).data('day');
            var expiryDateYear = $(data_item).data('year');
            var expiryDateTime = $(data_item).data('time');
            if(expiryDateTime == null){
                var expiryDateTime = defaultTime;
            };
            expiryDateArray['hide_show'] = new Date(expiryDateMonth + " " +  expiryDateDay + " " +  "," + expiryDateYear + " " + expiryDateTime);
            break;
        case "show_between":
            
            //Start Date
            var startDateDataFull = $(data_item).data('start');
            var startDateDataArray = startDateDataFull.split(', ');
            var startDateArray = startDateDataArray[0].split('-');
            var startDateDay = startDateArray[0];
            var startDateMonth = startDateArray[1];
            var startDateYear = startDateArray[2];
            var startDateTime = startDateDataArray[1];

            expiryDateArray['start_date'] = new Date(startDateMonth + " " +  startDateDay + " " +  "," + startDateYear + " " + startDateTime);

            //End Date
            var endDateDataFull = $(data_item).data('end');
            var endDateDataArray = endDateDataFull.split(', ');
            var endDateArray = endDateDataArray[0].split('-');
            var endDateDay = endDateArray[0];
            var endDateMonth = endDateArray[1];
            var endDateYear = endDateArray[2];
            var endDateTime = endDateDataArray[1];

            expiryDateArray['end_date'] = new Date(endDateMonth + " " +  endDateDay + " " +  "," + endDateYear + " " + endDateTime);
            break;
        default:
            break;
    }
    return expiryDateArray;
}


function check_field_date(currentDate, fieldDateArray, item_type){
    var returnCheck = undefined;
    switch (item_type) {
        case "hide_show":
            /*true == field date has passed
            false == field date has not passed
            if current date is > field date return true, else return false*/
            var fieldDate = fieldDateArray['hide_show'];
            if(currentDate.getTime()>fieldDate.getTime()){
                returnCheck = true;
                
            }else{
                returnCheck = false;
            }
            break;
        case "show_between":
            var startDate = fieldDateArray['start_date'];
            var endDate = fieldDateArray['end_date'];
            /*true == field date is between start and end date
            false == field date is either before or after start and end date
            if current date is both > start date and < end date return true, else return false*/
            if(currentDate.getTime()>startDate.getTime() && currentDate.getTime()<endDate.getTime()){
                returnCheck = true;
            }else{
                returnCheck = false;
            }
            break;
        default:
            break;
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