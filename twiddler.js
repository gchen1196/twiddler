//users = ['user1', 'user2', 'user3']
//streams = {
// 	home : [{user: 'user1', message: 'tweet1'}, {user: 'user2', message: 'tweet2'}]
// 	users : {
// 		'user1': [{'user1': 'tweet1'}, {'user1': 'tweet2'}, {'user1': 'tweet3'}],
// 		'user2' : [{'user2': 'tweet1'}, {'user2': 'tweet2'}, {'user2': 'tweet3'}]
// 	}
// }

//have temp memory for username and index 
var dataStore = {
	'user' : {
		'name' : false,
		'index' : 0,
	},
	'data' : {
		'index' : 0
	}
};

$(document).ready(function() {

	//support timestamps in the future
	$.timeago.settings.allowFuture = true; 

	var generateTwid = function(passed) {
		//if username not passed, then generate random tweets 
		if (!passed) { 
			for (var i = dataStore['data']['index']; i < streams['home'].length; i++) {
				postTwid(streams['home'][i]);
			}
			dataStore['data']['index'] = streams['home'].length; 
		}
		else { //if username is passed, then get user's tweets 
			for (var j = dataStore['user']['index']; j < streams['users'][passed].length; j++) {
				postTwid(streams['users'][passed][j]);
			}
			dataStore['user']['index'] = streams['users'][passed].length;
		}
	}
	var postTwid = function(obj) { //{user: 'user1', message: 'tweet1', created_at: date}
		//access to each username and tweet 
		//create DOM for username, date, and message
		//append them to element and prepend it to .tweets
		var date = obj.created_at.toISOString();

		var $twid = $('<div/>', {'class': 'twid'});
		var $username = $('<span/>', {'class': 'twidUsername'})
		var $usernameA = $('<a/>', {'href': '#', 'class': 'twidUsernameA', 'data-username': obj['user'], text: '@' + obj['user'] + ' '});
		$username.append($usernameA);
		var $date = $('<abbr/>', {'class': 'date timeago', 'title': date});
		var $message = $('<div/>', {'class': 'twidMessage', text: obj['message']});
		$twid.append($username);
		$twid.append($date);
		$twid.append($message);

		$('.twids').prepend($twid);

		$('abbr.timeago').timeago();
	}

	generateTwid(dataStore['user']['name']);

	//refresh tweet when button clicked
	$('.update').click(function() {
		generateTwid(dataStore['user']['name']);
	})

	//when you click on a username 
	//hide .user, .post, only show username's tweets 
	$('.twidUsernameA').click(function(e) {
		dataStore['user']['name'] = $(this).data('username');
		dataStore['user']['index'] = 0;
		$('.feed').find('.twids').text('');
		$('.profile').text('@' + dataStore['user']['name'] + '\'s Twids');
		$('.profile').show();
		generateTwid(dataStore['user']['name']);

		$('.post').hide();
		$('.button-feed').hide();
	})

	//making a post and then get the value of the post as username and message
	$('.submit').click(function(e){
		var userMessage = $('.type').val();
		var userName = $('.myusername').val();
		writeTweet(userName, userMessage);
		dataStore['user']['name'] = false;
		dataStore['user']['index'] = 0;
		generateTwid(dataStore['user']['name']);

		$('.post').trigger('reset');
		return false; 
	})

})