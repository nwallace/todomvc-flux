var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({

  propTypes: {
    allTodos: React.PropTypes.object.isRequired
  },

  render: function() {
    var allTodos = this.props.allTodos;
    var countRemaining = 0;
    for (var key in allTodos) {
      if (!allTodos[key].complete) countRemaining += 1;
    }
    var itemsLeftPhrase = ' item';
    if (countRemaining !== 1) itemsLeftPhrase += 's';
    itemsLeftPhrase += ' left';

    return (
      <footer id='footer'>
        <span id='todo-count'>
          <strong>{countRemaining}</strong>
          {itemsLeftPhrase}
        </span>
        <ul id='filters'>
          <li><a href='#' className='selected'>All</a></li>
          <li><a href='#'>Active</a></li>
          <li><a href='#'>Completed</a></li>
        </ul>
        <button id='clear-completed' onClick={this._onClearCompletedClick}>Clear completed</button>
      </footer>
    );
  },

  _onClearCompletedClick: function() {
    TodoActions.destroy_completed();
  }
});

module.exports = Footer;
