// (function() {
// 'use strict';

	angular
		.module('randomDiner.filters')
		.filter('SimpleMarkdown', SimpleMarkdown);

	// SimpleMarkdown.$inject = [''];
	function SimpleMarkdown() {
		
		
		

		return function (input, boldSeparator, italicsSeparator) { //input is a string
						
			boldSeparator = boldSeparator || "**";
			italicsSeparator = italicsSeparator || "_";
		
			var splitBold = input.split(boldSeparator);
			var res = "";
			var inBold = false;

			for (var i = 0; i < splitBold.length; i++) {
				var slice = splitBold[i];
				res += slice;
				if(i != splitBold.length - 1) {
					if (inBold) {
						res += "</b>";
					} else {
						res += "<b>";
					}
					inBold = !inBold;
				}
			}
			if (inBold) {
				res += "</b>";
			}

			var splitItal = res.split(italicsSeparator);
			var isItal = false;
			res = "";
			for (var i = 0; i < splitItal.length; i++) {
				var slice = splitItal[i];
				res += slice;
				if(i != splitItal.length - 1) {
					if (isItal) {
						res += "</i>";
					} else {
						res += "<i>";
					}
					isItal = !isItal;
				}
			}
			if (isItal) {
				res += "</i>";
			}
			
			
			return res;	
			
		};
		
		
		
		
	}
	
// })();