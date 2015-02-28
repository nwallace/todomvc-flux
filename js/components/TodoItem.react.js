var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var cx = require('react/lib/cx');

var TodoItem = React.createClass({

  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  render: function() {
    var todo = this.props.todo;

    var classNames = '';
    if (todo.complete) classNames += 'completed ';
    if (todo.editing) classNames += 'editing ';

    var input;
    if (todo.editing) {
      input =
        <TodoTextInput
          className='edit'
          onSave={this._onChangeText}
          value={todo.text}
        />;
    }

    return (
      <li
        key={todo.id}
        className={cx({
          completed: todo.complete,
          editing: todo.editing
        })}
      >
        <div className='view'>
          <input
            type='checkbox'
            className='toggle'
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy' onClick={this._onDestroyClick} />
        </div>
        {input}
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
  },

  _onDoubleClick: function(event) {
    TodoActions.edit(this.props.todo.id);
  },

  _onChangeText: function(text) {
    TodoActions.update_text(this.props.todo.id, text);
  }
});

module.exports = TodoItem;
