2 React Router
	Video 6
		Single Page Application

		Routing
			npm install -S react-router
			npm install -S history@1
			npm install
			npm run dev

		import { Link } from "react-router";
			allows you to make Link tag
			<Link to="archives">archives</Link>
		<Link to="settings"><button class="btn btn-success">settings</button></Link>	

		navigate() {
			this.props.history.pushState(null, "/"); // adds back button history, replaceState doesn't
		}

		<button onClick={this.navigate.bind(this)}> featured </button>

	Video 7
		