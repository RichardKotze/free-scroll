describe('Option mapping', function(){
	var mockDefaults;

    beforeEach(function(){
    	mockDefaults = {
	      selector: null,
	      distance: 100,
	      requestData: {
	        urlFormat: null,
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: null
	    };
    });

	it('using only selector', function(){
		var actual = FreeScroll.updateOptions(mockDefaults, '#selector');
		var mergedOptions = {
	      selector: '#selector',
	      distance: 100,
	      requestData: {
	        urlFormat: null,
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: null
	    };

		expect(actual).toEqual(mergedOptions);
	});

	it('using object option setting selector and distance', function(){
		var actual = FreeScroll.updateOptions(mockDefaults, {
			selector: '#selectMe',
			distance: 120
		});
		var mergedOptions = {
	      selector: '#selectMe',
	      distance: 120,
	      requestData: {
	        urlFormat: null,
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: null
	    };

	    expect(actual).toEqual(mergedOptions);
	});

	it('using object option set requestData', function(){
		var actual = FreeScroll.updateOptions(mockDefaults, {
			selector: '#selectMe',
			distance: 120,
			requestData:{
				urlFormat: 'testUrl',
				pageSize: 12
			}
		});
		var mergedOptions = {
	      selector: '#selectMe',
	      distance: 120,
	      requestData: {
	        urlFormat: 'testUrl',
	        pageNumber: 1,
	        pageSize: 12
	      },
	      templateUrl: null
	    };

	    expect(actual).toEqual(mergedOptions);
	});

	it('set requestData pageNumber to 0', function(){
		var actual = FreeScroll.updateOptions(mockDefaults, {
			selector: '#selectMe',
			distance: 120,
			requestData:{
				urlFormat: 'testUrl',
				pageNumber: 0,
				pageSize: 12
			}
		});
		var mergedOptions = {
	      selector: '#selectMe',
	      distance: 120,
	      requestData: {
	        urlFormat: 'testUrl',
	        pageNumber: 0,
	        pageSize: 12
	      },
	      templateUrl: null
	    };

	    expect(actual).toEqual(mergedOptions);
	});

	describe('set options for two new free scroll items', function(){

		it('the options should be different', function(){
			var fs1 = FreeScroll({
				selector:'#none', 
				distance: 70, 
				requestData: {
					urlFormat: '/api/listing?page_number={0}&page_size={1}',
					pageNumber: 1
				} 
			});
			var fs2 = FreeScroll({
				selector:'#some', 
				distance: 120, 
				requestData: {
					urlFormat: '/api/articles?page_number={0}&page_size={1}',
					pageNumber: 2
				} 
			});

			expect(fs1).not.toEqual(fs2);
			expect(fs1.options.requestData.pageNumber).not.toBe(fs2.options.requestData.pageNumber);
			expect(fs1.options.requestData.pageNumber).toBe(1);
			expect(fs2.options.requestData.pageNumber).toBe(2);
		});
	});

});