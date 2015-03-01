var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {}; // collection of todo items

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

function undo_complete(id) {
  _todos[id].complete = false;
}

function edit(id) {
  _todos[id].editing = true;
}

function undo_edit(id) {
  _todos[id].editing = false;
}

function update_text(id, text) {
  _todos[id].text = text;
}

function destroy_completed() {
  for (var todo in _todos) {
    if (_todos[todo].complete) {
      destroy(todo);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _todos;
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
        undo_complete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        update_text(action.id, action.text);
        undo_edit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_EDIT:
        edit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        destroy_completed();
        TodoStore.emitChange();
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher
  })

});

module.exports = TodoStore;
