describe('Initalise free scroll', function(){

	it('should exist', function(){
		expect(FreeScroll).toBeDefined();
	});

	it('has a more method', function(){
		expect(FreeScroll.fn.more).toBeDefined();
	});
	
	it('has a finish method', function(){
		expect(FreeScroll.fn.finish).toBeDefined();
	});
	
	it('has a addEvent method', function(){
		expect(FreeScroll.fn.addEvent).toBeDefined();
	});
	
	it('has a removeEvent method', function(){
		expect(FreeScroll.fn.removeEvent).toBeDefined();
	});
	
	it('has a each method', function(){
		expect(FreeScroll.fn.each).toBeDefined();
	});

	it('has a protected noMore method', function(){
		expect(FreeScroll.noMore).toBeDefined();
	});

	it('has a helper class', function(){
		expect(FreeScroll.helper).toBeDefined();
	});

	it('has a xhr class', function(){
		expect(FreeScroll.xhr).toBeDefined();
	});

	it('has a helper class with parseJSON method', function(){
		expect(FreeScroll.helper.parseJSON).toBeDefined();
	});

});