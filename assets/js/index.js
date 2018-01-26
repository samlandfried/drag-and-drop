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
  const id = event.dataTransfer.getData('text');

  event.target.classList.remove('shake');
  destroyTodo(id);
};

const dragEnterHandler = event => {
  event.target.classList.add('shake');
};

const dragLeaveHandler = event => {
  event.target.classList.remove('shake');
};

document.addEventListener('DOMContentLoaded', () => {
  ['Herd cats', 'Juggle manatees', 'Wrestle horses'].forEach(appendTodo);

  const form = document.querySelector('form');
  const trash = document.querySelector('img');

  trash.addEventListener('drop', dropHandler);
  trash.addEventListener('dragenter', dragEnterHandler);
  trash.addEventListener('dragleave', dragLeaveHandler);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.target.querySelector('input[type="text"]');
    const todo = input.value;

    appendTodo(todo);
    input.value = '';
  }); 
});

document.addEventListener('dragstart', dragStartHandler);
