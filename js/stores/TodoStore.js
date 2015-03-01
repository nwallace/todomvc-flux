var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {}; // collection of todo items
var _currentFilter = 'All';

function create(text) {
  var id = Date.now();
  _todos[id] = {
    id: id,
    text: text,
    complete: false,
    editing: false
  };
}

function destroy(id) {
  delete _todos[id];
}

function complete(id) {
  _todos[id].complete = true;
}

function undoComplete(id) {
  _todos[id].complete = false;
}

function edit(id) {
  _todos[id].editing = true;
}

function undoEdit(id) {
  _todos[id].editing = false;
}

function updateText(id, text) {
  _todos[id].text = text;
}

function destroyCompleted() {
  for (var todo in _todos) {
    if (_todos[todo].complete) {
      destroy(todo);
    }
  }
}

function updateFilter(filter) {
  _currentFilter = filter;
}

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return TodoStore.getFilteredTodos('All');
  },

  getFilteredTodos: function(filter) {
    var filteredTodos = {};
    if (filter === 'Active') {
      for (var key in _todos) {
        if (!_todos[key].complete) filteredTodos[key] = _todos[key];
      }
      return filteredTodos;
    } else if (filter === 'Completed') {
      for (var key in _todos) {
        if (_todos[key].complete) filteredTodos[key] = _todos[key];
      }
      return filteredTodos;
    } else {
      return _todos;
    }
  },

  getCurrentFilter: function() {
    return _currentFilter;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_COMPLETE:
        complete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        undoComplete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        updateText(action.id, action.text);
        undoEdit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_EDIT:
        edit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        destroyCompleted();
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_FILTER:
        updateFilter(action.filter);
        TodoStore.emitChange();
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher
  })

});

module.exports = TodoStore;
