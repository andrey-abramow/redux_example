import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { apiMiddleware } from 'redux-api-middleware'

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    //Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
