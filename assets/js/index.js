const destroyTodo = id => {
  const list = document.querySelector('ol');
  const todo = list.querySelector(`[id='${id}']`);
  return list.removeChild(todo); 
};
