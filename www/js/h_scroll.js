		$(function() {
		    var $body = $(document);
		    $body.bind('scroll', function() {
		        // "Disable" the horizontal scroll.
		        if ($body.scrollLeft() !== 0) {
		            $body.scrollLeft(0);
		        }
		    });
		}); 