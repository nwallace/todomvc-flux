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

  undoComplete: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UNDO_COMPLETE,
      id: id
    });
  },

  edit: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_EDIT,
      id: id
    });
  },

  updateText: function(id, text) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  destroyCompleted: function() {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  },

  updateFilter: function(filter) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UPDATE_FILTER,
      filter: filter
    });
  }
};

module.exports = TodoActions;
