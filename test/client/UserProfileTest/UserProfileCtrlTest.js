
describe("UserProfile", function () {
	beforeEach(angular.mock.module("UserProfile"));
	describe("UserProfileController", function () {
		beforeEach(inject(function($rootScope, $controller) {
    		scope = $rootScope.$new();
    		ctrl = $controller('UserProfileController', {$scope: scope});
  		}));
  		
		it("Should have valid getUserId method", function () {
			expect(scope.getUserId).to.be.a("function");
		});
		

	});
	
});