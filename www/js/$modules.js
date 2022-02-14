angular.module('randomDiner', [
	'ionic',
	'randomDiner.states',
	'randomDiner.directives',
	'randomDiner.services',
	'randomDiner.filters'
]);


angular.module('randomDiner.states', [
	'randomDiner.states.home',
	//'randomDiner.states.menu',
	'randomDiner.states.diners',
	//'randomDiner.states.about'
]);


angular.module('randomDiner.directives', [
	'randomDiner.directives.nejoBottomPanel'
]);


angular.module('randomDiner.services', []);


angular.module('randomDiner.filters', []);