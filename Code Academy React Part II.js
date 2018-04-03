getInitialState function should return an object, 
and that that object should contain a property for each piece of state that you want. 

var React = require('react');
var ReactDOM = require('react-dom');

var green = '#39D1B4';
var yellow = '#FFD712';

var Toggle = React.createClass({
  getInitialState: function () {
    return {
      color: green   
    };
  },
  
  changeColor: function () {
    var newColor = this.state.color == green ? yellow : green;
    this.setState({ color : newColor });
  },
  
  render: function () {
    return (
      <div style={{background: this.state.color}}>
        <h1>
          Change my color
        </h1>
        <button onClick={this.changeColor}>
          Change color
        </button>

      </div>
    );
  }
});

ReactDOM.render(<Toggle />, document.getElementById('app'));

Programming Patterns
	a stateful component, and a stateless component. 
  "Stateful" describes any component that has a getInitialState function; 
  "stateless" describes any component that does not.

	In our pattern, a stateful component passes its state down to a stateless component.

	var React = require('react');
	var ReactDOM = require('react-dom');
	var Child = require('./Child');

	var Parent = React.createClass({
	  getInitialState: function () {
	    return { name: 'Frarthur' };
	  },
	  
	  changeName: function (newName) {
      this.setState({
        name: newName
      });
    },

    render: function () {
      return (
        <Child 
          name={this.state.name} 
          onChange={this.changeName}/>
      );
    }
	});

	ReactDOM.render(<Parent/>, document.getElementById('app'));

	A React component should use props to store information that can be changed, but can only be changed by a different component.

	A React component should use state to store information that the component itself can change.

  // Child.js - Stateless components updating parent's state
  var React = require('react');

  var Child = React.createClass({
    handleChange: function (e) {
      var name = e.target.value;
      this.props.onChange(name);
    },
    
    render: function () {
      return (
        <div>
          <h1>
            Hey my name is {this.props.name}!
          </h1>
          <select id="great-names" onChange={this.handleChange}>
            <option value="Frarthur">
              Frarthur
            </option>

            <option value="Gromulus">
              Gromulus
            </option>

            <option value="Thinkpiece">
              Thinkpiece
            </option>
          </select>
        </div>
      );
    }
  });

  module.exports = Child;

    Automatic binding allows you to pass functions as props, and any 
  this values in the functions' bodies will automatically refer to whatever 
  they referred to when the function was defined. No binding to worry about!
    a stateful, parent component passes down an event handler to a stateless, 
  child component. The child component then uses that event handler to update its parent's state.


  Pass state to one stateless component to display information, and a different stateless component to change that information.

  A stateful component class defines a function that calls this.setState. (Parent.js, lines 11-15)

  The stateful component passes that function down to a stateless component. (Parent.js, line 20)

  That stateless component class defines a function that calls the passed-down function, and that can take an event object as an argument. (Child.js, lines 4-7)

  The stateless component class uses this new function as an event handler.


2nd Programming Pattern: separating presentational components from display(container) components
  presentational component will always get rendered by a container component
  var GuineaPigs = require('../components/GuineaPigs');

Stateless Functional Components

  var React = require('react');

  function GuineaPigs (props) {
    var src = props.src;
    return (
        <div>
          <h1>Cute Guinea Pigs</h1>
          <img src={src} />
        </div>
      );
  }

  module.exports = GuineaPigs;


propTypes
  validation
  documentation

  var Runner = React.createClass({
    propTypes: {
      message:   React.PropTypes.string.isRequired,
      style:     React.PropTypes.object.isRequired,
      isMetric:  React.PropTypes.bool.isRequired,
      miles:     React.PropTypes.number.isRequired,
      milesToKM: React.PropTypes.func.isRequired,
      races:     React.PropTypes.array.isRequired
    },

    render: function () {
      var miles = this.props.miles;
      var km = this.props.milesToKM(miles);
      var races = this.props.races.map(function(race, i){
        return <li key={race + i}>{race}</li>;
      });

      return (
        <div style={this.props.style}>
          <h1>{this.props.message}</h1>
          { this.props.isMetric && 
            <h2>One Time I Ran {km} Kilometers!</h2> }
          { !this.props.isMetric && 
            <h2>One Time I Ran {miles} Miles!</h2> }
          <h3>Races Ive Run</h3>
          <ul id="races">{races}</ul>
        </div>
      );
    }
  });

To write propTypes for a stateless functional component, 
you define a propTypes object, as a property of the stateless functional component itself.

function Example (props) {
  return <h1>{props.message}</h1>;
}

Example.propTypes = {
  message: React.PropTypes.string.isRequired
};

// Normal way to display a prop:
var MyComponentClass = React.createClass({
  render: function () {
    return <h1>{this.props.title}</h1>;
  }
});

// Stateless functional component way to display a prop:
function MyComponentClass (props) {
  return <h1>{props.title}</h1>;
}

// Normal way to display a prop using a variable:
var MyComponentClass = React.createClass({
  render: function () {
    var title = this.props.title;
    return <h1>{title}</h1>;
  }
});

// Stateless functional component way to display a prop using a variable:
function MyComponentClass (props) {
  var title = props.title;
  return <h1>{title}</h1>;
}


Forms
  A traditional form doesnt update the server until a user hits "submit."
  But you want to update the server any time a user enters or deletes any character.
  var React = require('react');
  var ReactDOM = require('react-dom');

  var Input = React.createClass({
    getInitialState: function () {
      return {
        userInput: ''
      };
    },
    
    handleUserInput: function (e) {
      this.setState({ userInput: e.target.value })
    },
    
    render: function () {
      return (
        <div>
          <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
          <h1>{this.state.userInput}</h1>
        </div>
      );
    }
  });

  ReactDOM.render(
    <Input />,
    document.getElementById('app')
  );

  An uncontrolled component is a component that maintains its own internal state. 
  A controlled component is a component that does not maintain any internal state. 
  Since a controlled component has no state, it must be controlled by someone else.
  A controlled component, on the other hand, has no memory. If you ask it for information about itself, 
  then it will have to get that information through props. Most React components are controlled.


Lifecycle methods
  methods that get called at certain moments in a components life.
  You can write a lifecycle method that gets called right before a component renders for the first time.
  You can write a lifecycle method that gets called right after a component renders, every time except for the first time.
  mounting, updating, and unmounting

  Mounting
    A component "mounts" when it renders for the first time. This is when mounting lifecycle methods get called.
    There are three mounting lifecycle methods:

    componentWillMount
    render
    componentDidMount

    When a component mounts, it automatically calls these three methods, in order. 

    If your React app uses AJAX to fetch initial data from an API, then componentDidMount is the place to make that AJAX call. 
    More generally, componentDidMount is a good place to connect a React app to external applications, 
    such as web APIs or JavaScript frameworks. 
    componentDidMount is also the place to set timers using setTimeout or setInterval.

  Updating
    The first time that a component instance renders, it does not update. 
    A component updates every time that it renders, starting with the second render.
    There are five updating lifecycle methods:

    componentWillReceiveProps
    shouldComponentUpdate
    componentWillUpdate
    render
    componentDidUpdate

    Whenever a component instance updates, it automatically calls all five of these methods, in order.

    This is a common use of componentWillReceiveProps: comparing incoming props to current props or state, 
    and deciding what to render based on that comparison. 

    The best way to use shouldComponentUpdate is to have it return false only under certain conditions. 
    If those conditions are met, then your component will not update.
    shouldComponentUpdate automatically receives two arguments: nextProps and nextState. 
    Its typical to compare nextProps and nextState to the current this.props and this.state, and use the results to decide what to do.

    You cannot call this.setState from the body of componentWillUpdate! Which begs the question, why would you use it?
    The main purpose of componentWillUpdate is to interact with things outside of the React architecture. 
    If you need to do non-React setup before a component renders, such as checking the window size or interacting with an API, 
    then componentWillUpdate is a good place to do that.

    componentDidUpdate automatically gets passed two arguments: prevProps and prevState. 
    prevProps and prevState are references to the components props and state before the current updating period began. 
    You can compare them to the current props and state.
    componentDidUpdate is usually used for interacting with things outside of the React environment, 
    like the browser or APIs. Its similar to componentWillUpdate in that way, except that it gets called after render instead of before. 

unmounting
  A components unmounting period occurs when the component is removed from the DOM. 
  This could happen if the DOM is rerendered without the component, or if the user navigates to a different website or closes their 
  web browser.
  componentWillUnmount gets called right before a component is removed from the DOM. 
  If a component initiates any methods that require cleanup, then componentWillUnmount is where you should put that cleanup.



