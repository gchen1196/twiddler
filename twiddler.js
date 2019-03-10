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
		var $username = $('<span/>', {'class': 'twidUsername', 'data-username': obj['user'], text: '@' + obj['user'] + ' '});
		var $date = $('<abbr/>', {'class': 'date timeago', 'title': date});
		var $message = $('<div/>', {'class': 'twidMessage', text: obj['message']});
		$twid.append($username);
		$twid.append($date);
		$twid.append($message);

		$('.twids').prepend($twid);

		$('abbr.timeago').timeago();
	}

	generateTwid(dataStore['user']['name']);

})