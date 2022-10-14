$(document).ready(function(){
  'use trick'
	$('.input-number-increment').on("click",function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val + 1);
});

$('.input-number-decrement').on("click",function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var min = $(".input-number").attr("min");
  var val = parseInt($input.val(), 10);
if( val > min ){
  $input.val(val - 1);
}
});
});