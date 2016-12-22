import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import assigned from './assigned'
import setdate from './setdate'
import flash from './flash'
import setemployee from './setemployee'
import setcompany from './setcompany'
import currentemployee from './currentemployee'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate,
  assigned,
  flash,
  setemployee,
  setcompany,
  currentemployee
 });

export default rootReducer;
