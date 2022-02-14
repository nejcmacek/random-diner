// (function() {
// 'use strict';

	angular
		.module('randomDiner.services')
		.factory('DinerProvider', DinerProvider);

	// DinerProvider.$inject = [''];
	function DinerProvider() {
		
				
		var s = {};
		
		
		s.diners = [];
		s.places = [];
		
		
		s.diner = function(name, description) {
			name = name || "";
			description = description || "";
			return {
				name: name,
				description: description,
				distances: {} //distances from places
			};
		};
		
		
		s.place = function(name, description) {
			name = name || "";
			description = description || "";
			return {
				name: name,
				description: description
			};
		};
		
		
		s.validateDiner = function(diner) {
			if(!diner) return false;
			var name = diner.name;
			if(!name || !name.trim()) return false;
			var desc = diner.description;
			if(typeof desc !== "string") return false;
			if(typeof diner.distances !== "object") return false;
			return true;
		};
		
		
		s.validatePlace = function(place) {
			if(!place) return false;
			var name = place.name;
			if(!name || !name.trim()) return false;
			var desc = place.description;
			if(!desc || !desc.trim()) return false;
			return true;
		};
		
		
		s.eachDiner = function(callback) {
			for(var i = 0; i < s.diners.length; i++) {
				callback(s.diners[i]);
			}	
		};
		
		
		s.eachPlace = function(callback) {
			for(var i = 0; i < s.places.length; i++) {
				s.places(s.diners[i]);
			}	
		};
		
		
		s.load = function() {
			var ld = localStorage.diners;
			var lp = localStorage.places;
			try {
				s.diners = ld
					? JSON.parse(ld)
					: [];
			} catch (ex) {
				s.diners = [];
			}
			try {
				s.places = lp
					? JSON.parse(lp)
					: [];
			} catch (ex) {
				s.places = [];
			}
		};
		
		
		s.save = function() {
			localStorage.diners = JSON.stringify(s.diners);
			localStorage.places = JSON.stringify(s.places);
		};
		
		
		s.clear = function() {
			delete localStorage.diners;
			delete localStorage.places;
		};
		
		
		s.cleanDinerDistances = function(diner) {
			var d = diner.distances;
			for(var dd in d) {
				var has = false;
				for(var i = 0; i < s.places.length; i++) {
					if(s.places[i].name == dd) {
						has = true;
						break;
					}
				}
				if(!has)
					delete d[dd];
			}
		};
		
		
		s.cleanDinersDistances = function() {
			s.eachDiner(s.cleanDinerDistances);
		};
		
		
		//does a diner implement a distance to a place?
		s.implements = function(diner, place) {
			for(var i in diner.distances) {
				if(i == place || i == place.name) {
					return true;
				}
			}
			return false;
		}
		
		
		//those, which are missing one or more distances
		//place argument is optional
		s.incompleteDiners = function(place) {
			if(s.places.length == 0) return [];
			var d = [];

			if (place) {
				s.eachDiner(function (diner) {
					if (!s.implements(diner, place))
						d.push(diner);
				});
			} else {
				s.eachDiner(function (diner) {
					for (var i = 0; i < s.places.length; i++) {
						if(!diner.distances[s.places[i].name]) {
							d.push(diner);
							break;
						}
					}
				});
			}
			return d;
		};
		
		
		s.containsDiner = function(name) {
			for(var i = 0; i < s.diners.length; i++) {
				if(s.diners[i].name == name) return true;
			}	
			return false;
		};
		
		
		s.containsPlace = function(name) {
			for(var i = 0; i < s.places.length; i++) {
				if(s.places[i].name == name) return true;
			}
			return false;
		};
		
		
		s.sortDiners = function() {
			s.diners.sort(function(a, b) {
				return a.name.localeCompare(b.name);
			});
		};
		
		
		s.sortPlaces = function() {
			s.diners.sort(function(a, b) {
				return a.name.localeCompare(b.name);
			});
		};
		
		
		s.addDiner = function(diner) {
			if(!s.validateDiner(diner)) throw "Invalid diner format.";
			if(s.containsDiner(diner.name)) throw "Diner already present.";
			s.diners.push(diner);
			s.sortDiners();
		};
		
		
		s.addPlace = function(place) {
			if(!s.validatePlace(place)) throw "Invalid place format.";
			if(s.containsPlace(place.name)) throw "Place already present.";
			s.places.push(place);
			s.sortPlaces();	
		};
		
		
		s.removeDiner = function(item) {
			if(typeof item == "string") {
				for(var i = 0; i < s.diners.length; i++) {
					if(s.diners[i].name == item){
						s.diners.splice(i, 1);
						return true;
					}
				}
			} else {
				for(var i = 0; i < s.diners.length; i++) {
					if(s.diners[i] == item) {
						s.diners.splice(i, 1);
						return true;
					}
				}
			}
			return false;
		};
		

		s.removePlace = function(item) {
			if(typeof item == "string") {
				for(var i = 0; i < s.places.length; i++) {
					if(s.places[i].name == item){
						s.places.splice(i, 1);
						return true;
					}
				}
			} else {
				for(var i = 0; i < s.places.length; i++) {
					if(s.places[i] == item) {
						s.places.splice(i, 1);
						return true;
					}
				}
			}
			return false;
		};
		
		
		s.random = function() {
			return s.diners[
				Math.floor(
					Math.random() * s.diners.length
				)
			];
		};
		
		


		s.load();
		
		
		return s;
		
		
	}
	
// })();