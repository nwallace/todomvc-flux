var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  create: function(text) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  destroy: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  complete: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_COMPLETE,
      id: id
    });
  },

  undo_complete: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UNDO_COMPLETE,
      id: id
    });
  },
};

module.exports = TodoActions;
