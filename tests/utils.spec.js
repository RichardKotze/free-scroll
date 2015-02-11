describe('Does helper method', function(){
	var obj = {};
	it('typeOf in node return undefined', function(){
    	expect(FreeScroll.helper.typeOf(obj['templateUrl']) === 'undefined').toBe(true);
    });
});