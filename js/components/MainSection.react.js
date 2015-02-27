var React = require('react');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTodos: React.PropTypes.array.isRequired
  },

  render: function() {
    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
        <section id='main'>
          <ul id='todo-list'>{todos}</ul>
        </section>
      );
  }
});

module.exports = MainSection;
