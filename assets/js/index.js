const appendTodo = todo => {
  const list = document.querySelector('ol');
  const listItems = list.querySelectorAll('li');
  const lastListItem = listItems.item(list.childElementCount - 1);
  const lastId = lastListItem ? lastListItem.id : 0;
  const li = document.createElement('li')

  li.innerText = todo;
  li.id = parseInt(lastId) + 1;
  li.className = 'list-group-item';
  li.setAttribute('draggable', true);
  list.appendChild(li);
};

const destroyTodo = id => {
  const list = document.querySelector('ol');
  const todo = list.querySelector(`[id='${id}']`);
  return list.removeChild(todo); 
};

const dragStartHandler = event => {
  const id = event.target.id;

  event.dataTransfer.setData('text/plain', id);
  event.dataTransfer.effectAllowed = 'move';
};

const dropHandler = event => {
  const id = event.dataTransfer.getData('text/plain');

  destroyTodo(id);
};

document.addEventListener('DOMContentLoaded', () => {
  ['Wrangle manatees', 'Educate narwhals', 'Civilize sea cucumbers'].forEach(appendTodo);

  const form = document.querySelector('form')

  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.target.querySelector('input[type="text"]');
    const todo = input.value;

    appendTodo(todo);
    input.value = '';
  }); 
});

document.addEventListener('dragstart', dragStartHandler);
document.addEventListener('drop', dropHandler);
