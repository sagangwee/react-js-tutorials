1 Basic React
	npm install (everything in package.json dependencies)
	npm run dev

	capitalize component files - components are constructors
	components inside of a component: make new folder i.e. Header > Title.js
	good practice to alphabetize:
		css properties
		imports
		methods (if there are MANY)

	render() {
		var list = [
			<Header />,
			<Header />,
			<Header />,
		];

		return (
			<ul> 
				{list}
			</ul>
		);
	}

	State
		propagates changes in virtual DOM to real DOM in most efficient way (JS is fast, but DOM is slow)
		only update DOM with actual element changes - very fast
		this.setState({name: "Bob"}); - set value
		{this.state.name} in render return - show to user
		use state if keeping tracking of info that only affects that one component

		constructor() {
			super();
			this.state = {
				title: "Welcome",
			};
		}

	Props 
		injected into other components
		{this.props.title} 



class InputExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };
    this.change = this.change.bind(this); // bind in constructor
  }

  change(ev) {
    this.setState({ text: ev.target.value });
  }

  render() {
    let { text } = this.state;
    return (<input type="text" value={text} onChange={this.change} />);
  }
}
