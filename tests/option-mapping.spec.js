describe('Option mapping', function(){
	var mockDefaults;

    beforeEach(function(){
    	mockDefaults = {
	      selector: null,
	      distance: 100,
	      requestData: {
	        urlFormat: '',
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: ''
	    };
    });

	it('using only selector', function(){
		var actual = FS._updateOptions(mockDefaults, '#selector');
		var mergedOptions = {
	      selector: '#selector',
	      distance: 100,
	      requestData: {
	        urlFormat: '',
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: ''
	    };

		expect(actual).toEqual(mergedOptions);
	});

	it('using object option setting selector and distance', function(){
		var actual = FS._updateOptions(mockDefaults, {
			selector: '#selectMe',
			distance: 120
		});
		var mergedOptions = {
	      selector: '#selectMe',
	      distance: 120,
	      requestData: {
	        urlFormat: '',
	        pageNumber: 1,
	        pageSize: 10
	      },
	      templateUrl: ''
	    };

	    expect(actual).toEqual(mergedOptions);
	});
});