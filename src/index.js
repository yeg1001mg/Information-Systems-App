import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './routers/Router'
// import { Provider } from 'react-redux'
// import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    // <Provider store={store}>
    <Router />
    //</Provider>
)
