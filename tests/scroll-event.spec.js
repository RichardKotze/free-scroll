describe('Initial FreeScroll events', function(){

	var addEventSpy = jasmine.createSpy('addEvent');
	var readyEventSpy = jasmine.createSpy('ready');
	FreeScroll.fn.addEvent = addEventSpy;
	FreeScroll.helper.ready = readyEventSpy;

	beforeEach(function(){
		setFixtures('<div class="className"></div>');
		fs = FreeScroll('.className');//spyOn(fs, 'addEvent');
	});

	it('scroll is added to FreeScroll', function(){
		expect(fs.addEvent).toHaveBeenCalledWith('scroll', jasmine.any(Function));
	});

	it('ready is called', function(){
		expect(FreeScroll.helper.ready).toHaveBeenCalledWith(jasmine.any(Function));
	});
});