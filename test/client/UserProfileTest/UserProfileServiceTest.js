
describe("UserProfile", function () {
	beforeEach(angular.mock.module("UserProfile"));
	describe("UserProfileService", function () {
		var userProfileService, $httpBackend;
		beforeEach(inject(function(_UserProfileService_, _$httpBackend_) {
    		userProfileService = _UserProfileService_;
    		$httpBackend = _$httpBackend_;
  		}));
  		
		it("Should have valid getUserId method", function () {
			expect(userProfileService.getUserId).to.be.a("function");
		});

		it("should return error 404 when page not found", function () {
			$httpBackend.expectGET('/api/users/current').respond(404);
			userProfileService.getUserId().then(null, function (errorStatus) {
				expect(errorStatus).to.be.ok();
				expect(errorStatus).to.equal(404);
			});
			$httpBackend.flush();
		});
		
		it("should return data object and status 200 when valid object found", function () {
			$httpBackend.expectGET('/api/users/current').respond(200, {testData: "test123"});
			userProfileService.getUserId().then(function (data) {
				expect(data).to.be.ok();
				expect(data.status).to.be.ok();
				expect(data.data.testData).to.equal("test123");
				expect(data.status).to.equal(200);
			});
			$httpBackend.flush();
		});

	});
	
});