var FreeScroll = React.createClass({
	getInitialState : function(){
		return {
			pageNumber: 0,
			yourArrayName: []
		};
	},
	getDefaultProps: function(){
		return {
			fsConfig: {}
		};
	},
	componentDidMount: function(){
		var FS = new FreeScroll(this.props.fsConfig),
		$this = this;
		FS.more(function(el, result){
			result.success(function(assortment){
				$this.setState(assortment);
			});
		});
	},
	render: function(){
		return (
			<div>
				<h4>{this.state.pageNumber}</h4>
				{this.state.map(function(item){
					<p>Title: {item.title}, description: {item.description}</p>
				})}
			</div>
			);
	}
});

var fsConfig = {
	selector:'#requestEmptyStart', 
	distance: 70, 
	requestData: {
		urlFormat: '/api/listing?page_number={0}&page_size={1}',
		pageNumber: 0,
		pageSize: 3
	} 
};

React.renderComponent('<FreeScroll fsConfig={fsConfig} />', document.getElementById('reactEmpty'));