describe("UserProfile", function () {
	//inject angular module
	beforeEach(angular.mock.module("UserProfile"));
	describe("UserProfileManager", function () {
		var userProfileManager, userProfileService, $q, $rootScope;
		beforeEach(inject(function(_UserProfileManager_, _UserProfileService_, _$q_, _$rootScope_) {
    		userProfileManager = _UserProfileManager_;
    		userProfileService = _UserProfileService_;
    		$q = _$q_;
    		$rootScope = _$rootScope_;
  		}));
  		
		it("Should have valid getUserId method", function () {
			expect(userProfileManager.getUserId).to.be.a("function");
		});

		it("Should call success handler and set userId", function () {
			userProfileService.getUserId = sinon.expectation.create("getUserId");
			userProfileService.getUserId.once().returns($q.when({data: {
				data: {
					email: "abc@testing.com"
				}
			}}));
			userProfileManager.getUserId();
			$rootScope.$apply();
			expect(userProfileManager.userId).to.equal("abc@testing.com");
		});
		

	});
	
});