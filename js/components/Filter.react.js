var React = require('react');
var TodoActions = require('../actions/TodoActions');
var cx = require('react/lib/cx');

var Filter = React.createClass({

  propTypes: {
    selected: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired
  },

  render: function() {

    var className;
    if (this.props.selected) className = 'selected'

    return (
      <li>
        <a href='#' className={className} onClick={this._onClick}>{this.props.label}</a>
      </li>
    );
  },

  _onClick: function() {
    TodoActions.updateFilter(this.props.label);
  }
});

module.exports = Filter;
