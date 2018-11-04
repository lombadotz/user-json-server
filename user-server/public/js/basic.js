// GETTING USER DATA
function reqListener() {
	var data = JSON.parse(this.responseText);
	// console.log(data);
}
function reqError(err) {
	console.log('Fetch Error :-S', err);
}
var req = new XMLHttpRequest();
req.onload = reqListener;
req.onerror = reqError;
req.open('get', './users', true);
req.send();

$(document).ready(function() {	
	// GETTING ACCESS
	$('#loginButton').click(function() {
	  var username = $('#username').val();
	  var password = $('#password').val();
	  
	  $.ajax({
		type: 'GET',
		url: 'http://localhost:3000/users?username=' + username,
		data: '{}',
		success: function(data) {
			if(data.length > 0) {
				var pass = data[0].password;
				if(pass === password) {
					window.location.replace("http://localhost:3000/home.html");
				} else {
					$('#info').text('Password does not match, try again.');
					$('#info').css({"color":"red"});
				}
			} else {
				$('#info').text('User not found, try again.');
				$('#info').css({"color":"red"});
			}
		},
		error: function (err) {
		  console.error(err); 
		},
		dataType: 'JSON'
	  });

	});
	
	$('#logoutButton').click(function() {
		window.location.replace("http://localhost:3000/index.html");
	});
});