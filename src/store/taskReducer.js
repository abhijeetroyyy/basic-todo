const initialState = {
    tasks: [],
    error: null,
    loading: false,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TASKS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_TASKS_SUCCESS':
        return { ...state, tasks: action.payload, loading: false };
      case 'FETCH_TASKS_FAILURE':
        return { ...state, error: action.payload, loading: false };
      case 'ADD_TASK':
        return { ...state, tasks: [...state.tasks, action.payload] };
      case 'TOGGLE_COMPLETED':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload ? { ...task, completed: !task.completed } : task
          ),
        };
      case 'TOGGLE_IMPORTANT':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload ? { ...task, important: !task.important } : task
          ),
        };
      case 'DELETE_TASK':
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
      case 'UPDATE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload.id ? { ...task, ...action.payload } : task
          ),
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  