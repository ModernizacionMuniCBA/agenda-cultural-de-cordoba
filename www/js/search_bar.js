	function searchFunc() {
		if($(".searchField").hasClass('show')){
			$(".searchField").removeClass('show');
		}else{
			$(".searchField").addClass('show');
			$("#searchField").focus();
		}
	}
	$(document).mouseup(function (e)
	{
	    var container = $(".searchField");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
		    $(".navbar-feria").css('background-color', '#FFF');
			$('#searchForm')[0].reset();
	        container.hide();
					e.preventDefault();
	    }
	});
