const $boxRow = document.querySelector('.box_row');
const $plusButton = document.querySelector('.plus_button');
let box = null;
let num = 0;

function createItem() {
  const box = document.createElement('div');
  
  box.initialMousePos = { x: 0, y: 0 };
  box.offset = { x: 0, y: 0 };
  box.num = ++num;
  box.textContent = 'BLUE' + box.num;

  box.classList.add('box');
  box.addEventListener('pointerdown', enableMove);
  $boxRow.appendChild(box);
}

function knowNum() {
  return num++;
}

$plusButton.addEventListener('click', () => {
  createItem();
});

const enableMove = ({ clientX, clientY, target }) => {
  box = target;
  box.initialMousePos.x = clientX - box.offset.x;
  box.initialMousePos.y = clientY - box.offset.y;

  document.addEventListener('pointermove', move);
};

const move = ({ clientX, clientY }) => {
  box.offset.x = clientX - box.initialMousePos.x;
  box.offset.y = clientY - box.initialMousePos.y;
  box.style.transform = `translate3d(${box.offset.x}px, ${box.offset.y}px, 0)`;
  knowColor();
};

document.addEventListener('mouseup', () => {
  document.removeEventListener('pointermove', move);
});

const knowColor = () => {
  if(box.getBoundingClientRect().left >= window.innerWidth / 2) {
    box.textContent = 'Purple' + box.num;
    box.style.backgroundColor = '#7F00FF';
  } else {
    box.textContent = 'BLUE' + box.num;
    box.style.backgroundColor = '#1b69ce';
  }
}