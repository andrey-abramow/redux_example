import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import CommentsContainer from './containers/comments'
import configureStore from './store/configureStore'
import initialState from './store/initial_state'
import styles from "!style!css!./components/style.css"

const store = configureStore(initialState)
window.store = store
render(
  <Provider store={ store }>
    <CommentsContainer />
  </Provider>,
  document.getElementById('root')
)
