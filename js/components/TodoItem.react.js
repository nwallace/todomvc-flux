var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var TodoItem = React.createClass({

  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  render: function() {
    var todo = this.props.todo;

    return (
      <li
        key={todo.id}
        className={todo.complete ? 'completed' : ''}
      >
        <input
          type='checkbox'
          className='toggle'
          checked={todo.complete}
          onChange={this._onToggleComplete}
        />
        <label>{todo.text}</label>
        <button className='destroy' onClick={this._onDestroyClick} />
      </li>
    );
  },

  _onDestroyClick: function(event) {
    TodoActions.destroy(this.props.todo.id);
  },

  _onToggleComplete: function(event) {
    var todo = this.props.todo;
    if (todo.complete) {
      TodoActions.undo_complete(todo.id);
    } else {
      TodoActions.complete(todo.id);
    }
  }
});

module.exports = TodoItem;
