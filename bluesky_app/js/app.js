jQuery(document).ready(function($) {

	var getWeather = function() {
		$("h2#responseMessage, h1#location, section#dataSection p").empty();
		$("section#dataSection, h2#responseMessage, h1#location, section#dataSection p").css("display", "none");

		var inputZipCode = document.getElementById("zipcode").value;

		$.ajax({

	  	url: "http://api.wunderground.com/api/8e21eb7dbff0cf15/geolookup/conditions/q/" + inputZipCode + ".json",
	  	dataType: "jsonp",

	  	error: function(jqXHR, textStatus, errorThrown) {

	  		$("h2#responseMessage").append("Error: " + textStatus + " / " + errorThrown);
	  		$("h2#responseMessage").css({
	  			"display": "block"
	  		});

	  		console.log("Error: " + textStatus + ". " + errorThrown);

	  	},

	  	success: function(parsed_json) {

	  		if (parsed_json['location'] === undefined) {

	  			$("h2#responseMessage").append("Please enter a valid US zip-code").fadeIn();
	  			$("h2#responseMessage").css({
	  				"display": "block"
	  			});

	  		} else {

	  			var weatherCondition = parsed_json["current_observation"]["weather"];
		  		var feelsLike = parsed_json["current_observation"]["feelslike_f"];
		  		var winds = parsed_json["current_observation"]["wind_string"];
		  		var inputLocation = parsed_json["current_observation"]["display_location"]["full"];
		  		var temp_f = parsed_json["current_observation"]["temp_f"];
		  		var humidity = parsed_json["current_observation"]["relative_humidity"];
		  		var icon = parsed_json["current_observation"]["icon_url"];
		  		var forecast = parsed_json["current_observation"]["forecast_url"];

		  		console.log(parsed_json["current_observation"]);

		  		if (temp_f > 75) {

		  			$("body").css("background", "-webkit-linear-gradient(top, #ffe6e6 0%, #fff 100%)");
		  			$("body").css("background", "-linear-gradient(top, #ffe6e6 0%, #fff 100%)");
		  			$("body").css("background", "-moz-linear-gradient(top, #ffe6e6 0%, #fff 100%)");

		  		} else if (temp_f > 45 && temp_f < 75) {

		  			$("body").css("background", "-webkit-linear-gradient(top, #e6ffe6 0%, #fff 100%)");
		  			$("body").css("background", "-linear-gradient(top, #e6ffe6 0%, #fff 100%)");
		  			$("body").css("background", "-moz-linear-gradient(top, #e6ffe6 0%, #fff 100%)");

		  		} else {

		  			$("body").css("background", "-webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%)");
		  			$("body").css("background", "-linear-gradient(top, #c9dbe9 0%, #fff 100%)");
		  			$("body").css("background", "-moz-linear-gradient(top, #c9dbe9 0%, #fff 100%)");

		  		}

		  		$("#location").append(inputLocation + " " + "<img src=" + icon + ">").fadeIn();
		  		$("#temp").append("<strong style='font-weight: bold;'>Temperature:&nbsp;&nbsp;</strong>" + temp_f + "&#176; F").fadeIn();
		  		$("#feelsLikeTemp").append("<strong style='font-weight: bold;'>Feels like:&nbsp;&nbsp;</strong>" + feelsLike + "&#176; F").fadeIn();
		  		$("#wind").append("<strong style='font-weight: bold;'>Winds:&nbsp;&nbsp;</strong>" + winds).fadeIn();
		  		$("#weatherConditions").append("<strong style='font-weight: bold;'>Conditions:&nbsp;&nbsp;</strong>" + weatherCondition).fadeIn();
		  		$("#humidity").append("<strong style='font-weight: bold;'>Humidity:&nbsp;&nbsp;</strong>" + humidity).fadeIn();
		  		$("#forecast").append("<strong style='font-weight: bold;'>Forecast:&nbsp;&nbsp;</strong>" + "<a href=" + forecast + " target=_blank rel=noopener>Extended Forecast</a>").fadeIn();
		  		$("section#dataSection").css({
		  			"display": "block"
		  		}).addClass("shadow");

	  		}

	  	},

	  	complete: function() {

	  		console.log("Completed");
	  		
	  	}
	  });
	};

	$("input#zipcode.shadow.inputSimilarities.centerText").keypress(function(event) {
		if (event.keyCode == 13 || event.which == 13) {
			$("#submitBtn").focus();
			event.preventDefault();
			getWeather();
		}
	});

	$("#submitBtn").click(function() {
		getWeather();
	});
});