var React = require('react');
var TodoStore = require('../stores/TodoStore');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Footer = require('./Footer.react');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <MainSection allTodos={this.state.allTodos} />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  }
});

module.exports = TodoApp;
