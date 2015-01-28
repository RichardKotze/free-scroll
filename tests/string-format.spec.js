describe('String format', function(){
	it('should update url querystring with two values', function(){
		var relUrl = '/api/articles?page_number={0}&page_size={1}',
		actualUrl = relUrl.format(2,10),
		expectedUrl = '/api/articles?page_number=2&page_size=10';

		expect(actualUrl).toBe(expectedUrl);
	});

	it('second parameter missing but should update url querystring with first parameter', function(){
		var relUrl = '/api/articles?page_number={0}&page_size={1}',
		actualUrl = relUrl.format(2),
		expectedUrl = '/api/articles?page_number=2&page_size={1}';

		expect(actualUrl).toBe(expectedUrl);
	});

	it('third parameter add, should update url querystring and thrid parameter ignored', function(){
		var relUrl = '/api/articles?page_number={0}&page_size={1}',
		actualUrl = relUrl.format(2,8,'ignore'),
		expectedUrl = '/api/articles?page_number=2&page_size=8';

		expect(actualUrl).toBe(expectedUrl);
	});
});