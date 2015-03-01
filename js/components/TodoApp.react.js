var React = require('react');
var TodoStore = require('../stores/TodoStore');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Footer = require('./Footer.react');
var Filter = require('./Filter.react');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    currentFilter: TodoStore.getCurrentFilter()
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
    var filters = [
      <Filter key="All" label="All" selected={this.state.currentFilter == "All"} />,
      <Filter key="Active" label="Active" selected={this.state.currentFilter == "Active"} />,
      <Filter key="Completed" label="Completed" selected={this.state.currentFilter == "Completed"} />,
    ];

    var filteredTodos = TodoStore.getFilteredTodos(this.state.currentFilter);
    return (
      <div>
        <Header />
        <MainSection allTodos={filteredTodos} />
        <Footer
          allTodos={this.state.allTodos}
          filters={filters}
        />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  }
});

module.exports = TodoApp;
