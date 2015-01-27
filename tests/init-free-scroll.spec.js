describe('Initalise free scroll', function(){

	it('should exist', function(){
		expect(FreeScroll).toBeDefined();
		expect(FS).toBeDefined();
	});

	it('has a on method', function(){
		expect(FS.fn.on).toBeDefined();
	});

	it('has a off method', function(){
		expect(FS.fn.off).toBeDefined();
	});

	it('has a protected fire method', function(){
		expect(FS.fire).toBeDefined();
	});

	it('has a protected noMore method', function(){
		expect(FS.noMore).toBeDefined();
	});

});