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

	describe('set options for two new free scroll items', function(){

		it('the options should be different', function(){
			var fs1 = FS({
				selector:'#none', 
				distance: 70, 
				requestData: {
					urlFormat: '/api/listing?page_number={0}&page_size={1}',
					pageNumber: 1
				} 
			});
			var fs2 = FS({
				selector:'#some', 
				distance: 70, 
				requestData: {
					urlFormat: '/api/listing?page_number={0}&page_size={1}',
					pageNumber: 2
				} 
			});

			expect(fs1.options.requestData.pageNumber).not.toBe(fs2.options.requestData.pageNumber);
			expect(fs1.options.requestData.pageNumber).toBe(1);
			expect(fs2.options.requestData.pageNumber).toBe(2);
		});
	})

});