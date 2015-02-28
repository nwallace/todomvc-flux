var React = require('react');

var Footer = React.createClass({

  propTypes: {
    allTodos: React.PropTypes.array.isRequired
  },

  render: function() {
    var count = 0;
    for (var key in this.props.allTodos) { count += 1; }
    var itemsLeftPhrase = ' item';
    if (count !== 1) itemsLeftPhrase += 's';
    itemsLeftPhrase += ' left';

    return (
      <footer id='footer'>
        <span id='todo-count'>
          <strong>{count}</strong>
          {itemsLeftPhrase}
        </span>
      </footer>
    );
  }
});

module.exports = Footer;
