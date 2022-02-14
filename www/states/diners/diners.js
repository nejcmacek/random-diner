// (function() {
// 'use strict';

	angular
		.module('randomDiner.states.diners', [])
		.controller('DinersCtrl', DinersCtrl);

	DinersCtrl.$inject = ['$scope', 'DinerProvider'];
	function DinersCtrl($scope, DinerProvider) {




		$scope.diners = DinerProvider.diners;
		$scope.dialogAdd = false;


		$scope.remove = function(diner) {
			DinerProvider.removeDiner(diner);
			DinerProvider.save();
		};


		$scope.add = function(n, d, scope) {
			scope.msg = null;
			if(!n) {
				scope.error = "Specify a diner name.";
				return;
			} else if(DinerProvider.containsDiner(n)) {
				scope.error = "A diner with such name already exists.";
				return;
			} else {
				scope.error = null;
			}
			try {
				var diner = DinerProvider.diner(n, d);
				DinerProvider.addDiner(diner);
				DinerProvider.save();
				scope.newName = "";
				scope.newDesc = "";
				scope.msg = "Saved successfully.";
				$scope.dialogAdd = false;
				document.getElementById("add-diner-name").focus();
			} catch(ex) {
				scope.error = ex || "An unknown error has occurred.";
			}
		};


		$scope.checkError = function(text) {
			if(!text) return null;
			var g = text.trim();
			if(!g) {
				return "Specify a diner name.";
			} else {
				if(DinerProvider.containsDiner(g)) {
					return "A diner with such name already exists."
				}
			}
			return null;
		};


		$scope.loadPreset = function() {
			var arr = [
				//{ name: "", desc: "" },
				{ name: "Al Capone" },
				{ name: "Al Pachino" },
				{ name: "Kanape" },
				{ name: "Picasso" },
				{ name: "Orient" },
				{ name: "Mehiška" },
				{ name: "Eat Smart" },
				{ name: "Stari Grill" },
				{ name: "Alf" },
				{ name: "Ancora" },
			];
			for(var i = 0; i < arr.length; i++) {
				var item = arr[i];
				var d = DinerProvider.diner(item.name, item.desc);
				DinerProvider.addDiner(d);
			}
			DinerProvider.save();
		};


		$scope.handleExpandedChange = function (expanded, scope) {
			if(expanded) {
				var s = scope.$$childHead;
				s.newName = "";
				s.newDesc = "";
				s.error = null;
				s.msg = null;
			}
		};




	}

// })();
