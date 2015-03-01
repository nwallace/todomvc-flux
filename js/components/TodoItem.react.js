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

    var input;
    if (todo.editing()) {
      input =
        <TodoTextInput
          className='edit'
          onSave={this._onChangeText}
          value={todo.text()}
        />;
    }

    return (
      <li
        key={todo.id}
        className={cx({
          completed: todo.complete(),
          editing: todo.editing()
        })}
      >
        <div className='view'>
          <input
            type='checkbox'
            className='toggle'
            checked={todo.complete()}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text()}
          </label>
          <button className='destroy' onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onDestroyClick: function(event) {
    TodoActions.destroy(this.props.todo.cid);
  },

  _onToggleComplete: function(event) {
    var todo = this.props.todo;
    if (todo.complete()) {
      TodoActions.undoComplete(todo.cid);
    } else {
      TodoActions.complete(todo.cid);
    }
  },

  _onDoubleClick: function(event) {
    TodoActions.edit(this.props.todo.cid);
  },

  _onChangeText: function(text) {
    TodoActions.updateText(this.props.todo.cid, text);
  }
});

module.exports = TodoItem;
