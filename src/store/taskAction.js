import axios from 'axios';

export const fetchTasks = () => (dispatch) => {
  dispatch({ type: 'FETCH_TASKS_REQUEST' });
  axios.get('https://dummyjson.com/todos')
    .then(response => {
      const fetchedTasks = response.data.todos.map((task) => ({
        id: task.id,
        text: task.todo,
        completed: task.completed,
        important: false,
      }));
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: fetchedTasks });
    })
    .catch(() => {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: 'Failed to fetch tasks' });
    });
};

export const addTask = (text) => ({
  type: 'ADD_TASK',
  payload: {
    id: Date.now(),
    text,
    completed: false,
    important: false,
  },
});

export const toggleCompleted = (id) => ({
  type: 'TOGGLE_COMPLETED',
  payload: id,
});

export const toggleImportant = (id) => ({
  type: 'TOGGLE_IMPORTANT',
  payload: id,
});

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const updateTask = (task) => ({
  type: 'UPDATE_TASK',
  payload: task,
});
