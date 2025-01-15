import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  theme: themeReducer,
});

export default rootReducer;
