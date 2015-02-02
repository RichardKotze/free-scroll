describe('Initalise free scroll', function(){

	it('should exist', function(){
		expect(FreeScroll).toBeDefined();
	});

	it('has a on method', function(){
		expect(FreeScroll.fn.on).toBeDefined();
	});

	it('has a off method', function(){
		expect(FreeScroll.fn.off).toBeDefined();
	});

	it('has a protected fire method', function(){
		expect(FreeScroll.fire).toBeDefined();
	});

	it('has a protected noMore method', function(){
		expect(FreeScroll.noMore).toBeDefined();
	});

});