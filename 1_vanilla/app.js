// constants
const INC = 'INC';
const DEC = 'DEC';
const ADD = 'ADD';
const EDITOR_CONCAT = 'EDITOR_CONCAT';
const DEFAULT_COUNTER_STATE = 0;
const DEFAULT_EDITOR_STATE = '';

// action creators
var increment = function(){
  return { type : INC }; // { type : INC } - action
};
var decrement = function(){
  return { type : DEC };
};
var add = function(value){
  return { type : ADD, value : value }
};
var concat = function (text) {
  return { type : EDITOR_CONCAT, text : text }
};

// reducers
// минусы : вызывается каждый reducer на любое событие
// неизвестно как сделать маппинг между типами событий и обработчиками
var counter = function(state = DEFAULT_COUNTER_STATE, action){
  switch(action.type){
    case INC:
      // need to use _.assign or Object.assign in ES6
      return state + 1;
    case ADD:
      return state + action.value;
    case DEC:
      return state - 1;
    default:
      return state;
  };
};

var editor = function(state = DEFAULT_EDITOR_STATE, action){
  switch(action.type){
    case EDITOR_CONCAT:
      return state + action.text;
    default:
      return state;
  };
};

var logMiddleWare = function(store){
  console.log('Enter middleware', store.getState());
  return function(next){
    console.log('wrapDispatchToAddLog');
    return function(action) {
      console.log('before dispatch', action);
      var result = next(action);
      console.log('after dispatch');
      return result;
    }
  }
};
//setting store
var rootReducer = Redux.combineReducers({ counter: counter, text: editor });

var store = Redux.createStore(Redux.combineReducers({ root : rootReducer }), Redux.applyMiddleware(logMiddleWare));
// register listeners
var unsubscribe = store.subscribe(function(){console.log(store.getState());});
// bound actions

var boundIncrement = function (params) {
  store.dispatch(increment(params));
};
var boundDecrement = function (params) {
  store.dispatch(decrement(params));
};
var boundAdd = function (value) {
  store.dispatch(add(value));
};
var boundConcat = function (text) {
  store.dispatch(concat(text));
};

// work with store
boundIncrement();
boundDecrement();
boundDecrement();
boundConcat("Hello");
boundAdd(5);
boundConcat("World!");
