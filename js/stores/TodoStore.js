var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var Backbone = require('backbone');

var CHANGE_EVENT = 'change';

var _currentFilter = 'All';
var _Todo  = Backbone.Model.extend({
  defaults: {
    text: '',
    complete: false,
    editing: false
  },

  complete: function() {
    return this.get('complete');
  },

  editing: function() {
    return this.get('editing');
  },

  text: function() {
    return this.get('text');
  }
});

var _TodosCollection = Backbone.Collection.extend({
  model: _Todo,
  url: '/todos',

  destroy: function(id) {
    this.remove(id);
  },

  complete: function(id) {
    this.get(id).set({complete: true});
  },

  undoComplete: function(id) {
    this.get(id).set({complete: false});
  },

  edit: function(id) {
    this.get(id).set({editing: true});
  },

  undoEdit: function(id) {
    this.get(id).set({editing: false});
  },

  updateText: function(id, text) {
    this.get(id).set({text: text});
  },

  destroyCompleted: function() {
    this.where({complete: true}).forEach(function(todo) {
      todo.destroy();
    });
  },

  filterTodos: function(filter) {
    if (filter === 'Active') {
      return this.where({complete: false});
    } else if (filter === 'Completed') {
      return this.where({complete: true});
    } else {
      return this.models;
    }
  }
});
var _Todos = new _TodosCollection;

function updateFilter(filter) {
  _currentFilter = filter;
}

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return TodoStore.getFilteredTodos('All');
  },

  getFilteredTodos: function(filter) {
    return _Todos.filterTodos(filter);
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
          _Todos.add([{text: text}]);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        _Todos.destroy(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_COMPLETE:
        _Todos.complete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        _Todos.undoComplete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        _Todos.updateText(action.id, action.text);
        _Todos.undoEdit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_EDIT:
        _Todos.edit(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        _Todos.destroyCompleted();
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
