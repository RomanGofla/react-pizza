import {combineReducers} from 'redux'

import filterReducer from './filters'
import pizzaReducer from './pizzas'
import cartReducer from './cart'

const rootReducer = combineReducers({
    filters: filterReducer,
    pizzas: pizzaReducer,
    cart: cartReducer
})

export default rootReducer