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
        <ul id='filters'>{this.props.filters}</ul>
        <button id='clear-completed' onClick={this._onClearCompletedClick}>Clear completed</button>
      </footer>
    );
  },

  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  }
});

module.exports = Footer;
