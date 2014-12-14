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

	it('has a protected _fire method', function(){
		expect(FS._fire).toBeDefined();
	});

	it('has a protected _noMore method', function(){
		expect(FS._noMore).toBeDefined();
	});

});