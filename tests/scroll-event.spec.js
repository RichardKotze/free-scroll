ddescribe('Initial FreeScroll events', function(){

	var addEventSpy = jasmine.createSpy('addEvent');
	var readyEventSpy = jasmine.createSpy('ready');
	var noMoreSpy = jasmine.createSpy('noMore');
	FreeScroll.fn.addEvent = addEventSpy;
	FreeScroll.helper.ready = readyEventSpy;
	FreeScroll.noMore = noMoreSpy;

	beforeEach(function(){
		setFixtures('<div class="className" style="height:30px;"><div style="height:300px;"></div></div>');
		fs = FreeScroll('.className');//spyOn(fs, 'addEvent');
	});

	it('scroll is added to FreeScroll', function(){
		expect(fs.addEvent).toHaveBeenCalledWith('scroll', jasmine.any(Function));
	});

	it('ready is called', function(){
		expect(FreeScroll.helper.ready).toHaveBeenCalledWith(jasmine.any(Function));
	});

	it('noMore is false when scroll event is fired', function(){
		FreeScroll.noMore.and.returnValue(false);
		spyOn(fs.promise, 'more');
		$(fs[0]).trigger('scroll');
		expect(FreeScroll.noMore).toHaveBeenCalled();
		expect(fs.promise.more).not.toHaveBeenCalled();
	});
});