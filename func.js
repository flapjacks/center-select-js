$(document).ready(function() {
    
    var theClass = $('#theItem').attr('class')
    var theName = $('#theItem').attr('name')
    var theOptions = ''
    
    $.each($('#theItem option'), function() {
        theOptions += '<div class="center-select-option">' + $(this).html() + '</div>'
    })
    
    $('#theItem').after('\
        <div class="center-select-wrapper ' + theClass + '">\
            <input type="hidden" name="' + theName + '" />\
            <div data-default="testval" class="center-select-value center-select-default">testval</div>\
            <div class="center-select-options-outer no-display">\
                <div class="center-select-options-wrapper">\
                    <div class="center-select-options-inner">\
                        ' + theOptions + '\
                    </div>\
                </div>\
            </div>\
        </div>')
    
    $('#theItem').remove()
    
    // show overbox
	$('.center-select-wrapper').on('click', function(e) {
		e.stopPropagation()
		// mark this as active - var declared above closeCenterSelect
		activeCenterSelectValue = $(this).find('.center-select-value')
		defaultCenterSelectValue = false
		// show box
		$('.center-select-options-outer').addClass('no-display')
		$(this).find('.center-select-options-outer').removeClass('no-display')
		// reset box and input to default value
		if (!$(this).attr('data-no-empty')) {
			defaultCenterSelectValue = true
			$(this).find('input').val('')
			$(this).find('.center-select-value').html($(this).find('.center-select-value').attr('data-default'))
		}
		$('html').unbind('click', closeCenterSelect)
		$('html').one('click', closeCenterSelect)
	})

	// select overbox
	$('.center-select-option').on('click', function(e) {
		e.stopPropagation()
		//unbind close trigger
		$('html').unbind('click', closeCenterSelect)
		// close the box
		closeCenterSelect()
		// set display value
		var theSelection = $(this).html()
		$(this).parents('.center-select-wrapper').find('.center-select-value').html(theSelection)
		theSelection = $(this).attr('data-value') || $(this).html()
		// set input value
		$(this).parents('.center-select-wrapper').find('input').val(theSelection)
		// remove default class
		$(this).parents('.center-select-wrapper').find('.center-select-value').removeClass('center-select-default')
		
	})
                        
})

var activeCenterSelectValue
var defaultCenterSelectValue
function closeCenterSelect() {
	console.log('closed')
	if (defaultCenterSelectValue) {
		activeCenterSelectValue.addClass('center-select-default')
	}
	$('.center-select-options-outer').addClass('no-display')
}