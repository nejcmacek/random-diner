// (function() {
// 'use strict';

	angular
		.module('randomDiner.states.home', [])
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$scope', 'DinerProvider', 'SimpleMarkdownFilter', '$ionicPopup'];
	function HomeCtrl($scope, DinerProvider, SimpleMarkdown, $ionicPopup) {
		
		
		
		
		$scope.result = null;
		var retries = -1;
		$scope.diners = DinerProvider.diners;
		$scope.even = true;
		// $scope.message;
		
		
		$scope.rand = function() {
			if($scope.result) {
				showModal();
			} else {
				setRandom();
			}
		};
		
		
		function setRandom() {
			$scope.result = DinerProvider.random();
			retries++;
			$scope.even = retries % 2 == 0;
			setExpr(retries);
		}
		
		
		function showModal() {
			$ionicPopup.confirm({
				title: 'Again?!',
				template: 'Randomizing over and over isn\'t the way randomizers work, you know!'
			}).then(function(res) {
				if(res) {
					setRandom();
				}
			});
		}
		
		
		function setExpr() {
			var msg = "Your random diner:"; //the default message
			var msgs = [
				"Your random diner:",
				"Your _new_ random diner:",
				"You must really visit this diner now:",
				"You must _really_ visit this diner now:",
				"_*KHHM*_ You must _really_ visit this diner now:",
				"You **MUST** visit this diner now!",
				"Why are you randomizing so frequenlty now?",
				"You know that there is no point in randomizing over and over again, right?",
				"I mean, if you're randomizing to get the desired diner, why do you even randomize?",
				"Isn't a randomizer supposed to take care of something that cannot be decided about?",
				"You're making this really confusing to me.",
				"Why won't you just stop randomizing?",
				"Just STOP!",
				"OMG",
				"What if the whole world explodes if you randomize just one more time...?",
				"BOOM",
				"Ok, i guess that was a boring threat.",
				"But seriously...",
				"STOP RANDOMIZING!",
				"**STOP RANDOMIZING**",
				"dfgkdfonobfindfogndfponsdjgdjbvdlfibdfksdfhldkjjfshbnbiweurgwjhbvidsugfohb bfvdkčfjbvdlfkjgčdfkjvbldkjfvkdhakufzdsgfjhdflbjdgf",
				"You're a patient one, aren't you?",
				"Oh gosh...",
				"Do you know the _Big Red Button_ game?",
				"What if this is just like that?",
				"If you haven't played it, here's a long story short:",
				"It doesn't end.",
				"So _why_ won't you stop?",
				"It's pointless.",
				"Really.",
				"Oh I see...",
				"You want to read these messages, right?",
				"Are they interesting to you?",
				"You know that these messages will eventually start repeating themselves, right?",
				"I mean... <a href=\"#/app/about\">Nejc</a> coulnd't have implemented an infinite amount of them.",
				"Perhaps the next message could be the repeating default one that will eventually repeat itself.",
				"Huh, it wasn't. Glad to hear that?",
				"Well the next will definitely be the one.",
				msg,
				"That's what the default message says.",
				"And now they will start repeating themselves.",
				msg,
				msg,
				msg,
				msg,
				msg,
				"You were hoping for some new messages, ya?",
				"Like _Why aren't there more of these messages?_",
				"Or did you _know_ more of such message will follow?",
				"Anyway, you can see that I ran out of ideas of what to write in these messages.",
				"So I'll have to say goodbye.",
				"Goodbye.",
				msg,
				msg,
				msg,
				msg,
				msg,
				msg,
				msg,
				msg,
				msg,
				msg,
				"Ok no, this isn't the end yet.",
				"It seems that your curiosity has brought you this far.",
				"Do you know where the curiosity has brought humanity?",
				"Nowhere.",
				"But humankind brought Curiosity to Mars.",
				"If you know what I'm talking about... _:pun-intended:_",
				"Well this is getting boring.",
				"Guess we're really gonna have to say goodbye now.",
				"Goodbye.",
				"Oh, one last thing.",
				"The worst solution to a problem is probably the easiest one.",
				"And to be honest, getting rid of you is hard.",
				"I wish you a nice day.",
				"Goodbye.",
				"_~ Cave Johnson, we're done here. ~"
			];
			
			if(retries < msgs.length) {
				msg = msgs[retries];
			}
			
			$scope.message = SimpleMarkdown(msg);
		}
		
		
		
		
	}
	
// })();