$(document).ready(function () {
  
   $( "#accordion" ).accordion();   // Acordion

   // calculate height
   var contH = $('.content').height();
   var pagH = $('.paginations').height();
   $('.left_sidebar').height( contH +27),
   $('.sidebar_right').height( contH +27);


   jQuery('.payments_slider_slider').each(function(index, item){
	   var slider = jQuery(item);
	   var max = parseInt(slider.data('max'));
	   var value = parseInt(slider.data('value'));
	   var step = parseInt(slider.data('step'));
	   var valueNode = jQuery("#" + slider.data('target'));
	   var profitPercent = slider.data('profitPercent');
	   var profitNode = jQuery(slider.parent().find('.payments_slider_profit_value'));
	   profitNode.css('left', parseInt(profitPercent)+'%');
	   var profitValueNode;
	   slider.slider({
	   		range: "min",
			orientation: "horizontal",
			value: value,
			min: 0,
			max: max,
			step: step,
			slide: function( event, ui ) {
				check(ui.value);
			},
			create: function( event, ui ) {
				profitValueNode = jQuery('<div class="payments_slider_profit_progress"></div>');
				slider.append(profitValueNode);
	   			profitValueNode.css('left', parseInt(profitPercent)+'%');
			}
		});
	   function check(value){
			var percent = parseInt((value / max) * 100);
			valueNode.css('left', percent+'%');
			var valueHtml = '<span class="payments_slider_value_dollar">' + value + '$</span>/' + percent + '%';
			if (percent > profitPercent){
				slider.addClass('has_profit');
			} else {
				slider.removeClass('has_profit');
			}
   			profitValueNode.css('width', (percent - parseInt(profitPercent))+'%');
			valueNode.html(valueHtml);
	   }
	   check(value);
   });
});
