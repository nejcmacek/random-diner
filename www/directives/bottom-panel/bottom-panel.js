// (function() {
// 	'use strict';

	angular
		.module('randomDiner.directives.nejoBottomPanel', [])
		.directive('nejoBottomPanel', nejoBottomPanel);

	// nejoBottomPanel.$inject = [''];
	function nejoBottomPanel() {
		
		
		var directive = {
			link: link,
			restrict: 'E',
			// replace: true,
			templateUrl: 'directives/bottom-panel/bottom-panel.html',
			scope: {
				title: '@',
				titleEdit: '@',
				expanded: '=',
				expandedChanged: '&'
			},
			transclude: true
		};
		
		
		return directive;
		
		
		
		
		function link($scope, $element, $attrs) {
			
			
			$scope.getTitle = function() {
				$scope.expanded ? $scope.titleEdit : $scope.title;
			};
			
			
			$scope.expand = function(value) {
				if(value === undefined) value = !$scope.expanded;
				if(value == $scope.expanded) return;
				$scope.expanded = value;
			};
			
						
			$scope.$watch('expanded', function(val) {
				var e = angular.element($element[0].children[0]);
				var x = $scope.expanded;
				if (x)
					e.addClass("expanded");
				else
					e.removeClass("expanded");
					$scope.expandedChanged({ expanded: x, e : x, scope: $scope, s: $scope })
			});
						
			
		}
		
		
		
		
	}
	
// })();