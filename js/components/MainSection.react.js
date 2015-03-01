var React = require('react');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    todos: React.PropTypes.array.isRequired
  },

  render: function() {
    var todoItems = this.props.todos.map(function(todo) {
      return <TodoItem key={todo.cid} todo={todo} />;
    });

    return (
      <section id='main'>
        <ul id='todo-list'>{todoItems}</ul>
      </section>
    );
  }
});

module.exports = MainSection;
