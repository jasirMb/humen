$(document).ready(function(){
'use trick'
$(function() {
 
            $( "#slider-3" ).slider({
               range:true,
               min: 39,
               max: 2000,
               values: [ 39, 1250 ],
               slide: function( event, ui ) {
                  $( "#price" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
               }
            });
            $( "#price" ).val( "£" + $( "#slider-3" ).slider( "values", 0 ) +
               " - £" + $( "#slider-3" ).slider( "values", 1 ) );
            
         });
// --------------------------------
});
