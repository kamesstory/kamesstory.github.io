/* ---------------------------------------------------------------
 *              Main javascript file for AsanaTab
 * --------------------------------------------------------------- */

// Is this an external popup window? (vs. the one from the menu)
var is_external = false;

// Options loaded when popup opened.
var options = null;

// Info from page we were triggered from
var page_title = null;
var page_url = null;
var page_selection = null;
var favicon_url = null;

// State to track so we only log events once.
var has_edited_name = false;
var has_edited_notes = false;
var has_reassigned = false;
var has_used_page_details = false;
var is_first_add = true;
var workspaces_retrieved = false;
var wrkspbutton_clicked = false;

// Data from API cached for this popup.
var workspaces = null;
var users = null;
var user_id = null;
var user_name = null;
var tasks = null;

// Typeahead ui element
var typeahead = null;

// The tab that contains this extension (new tab)
var tab = null;

// Only executes such things when the document is ready to load
$(document).ready(function() {
  var me = this;

  $('.openasana_button').click(function(){
    open_workspaces();
  });

  startTime();
  startDate();
});

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  if( h > 12 ){
    h -= 12;
    $('#main_clock_ampm').text( "PM" );  
  }
  else if ( h == 0 ){
    h = 12;
    $('#main_clock_ampm').text( "AM" );  
  }
  m = checkTime(m);
  s = checkTime(s);

  if( h > 22 && m > 55 )
    startDate();

  $('#main_clock').text( "" + h + ":" + m + ":" + s + "" ); 
  
  var t = setTimeout(startTime, 500);
}

function startDate() {
  var today = new Date();
  var day = "";
  switch( today.getDay() ){
    case 0: day = "Sunday"; break;
    case 1: day = "Monday"; break;
    case 2: day = "Tuesday"; break;
    case 3: day = "Wednesday"; break;
    case 4: day = "Thursday"; break;
    case 5: day = "Friday"; break;
    case 6: day = "Saturday"; break;
  }
  var month = "";
  switch( today.getMonth() ){
    case 0: month = "January"; break;
    case 1: month = "February"; break;
    case 2: month = "March"; break;
    case 3: month = "April"; break;
    case 4: month = "May"; break;
    case 5: month = "June"; break;
    case 6: month = "July"; break;
    case 7: month = "August"; break;
    case 8: month = "September"; break;
    case 9: month = "October"; break;
    case 10: month = "November"; break;
    case 11: month = "December"; break;
  }
  $('#main_date').text( day + ", " + month + " " + today.getDate() + ", " + today.getFullYear() );
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }  // add zero in front of numbers < 10
  return i;
}

function changeWelcome( disp_str ){
  $('#welcometext').text( disp_str );
}

// Takes in a string input and outputs it in the welcome text
function printForUser( input ){
  // $('#developer_updates').text( input );
};