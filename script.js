const container = document.getElementById('container');
const newGridBtn = document.getElementById('newGrid');
const clearBtn = document.getElementById('clear');
const toggleBordersBtn = document.getElementById('toggleBorders');
const randomModeBtn = document.getElementById('randomMode');
const darkenModeBtn = document.getElementById('darkenMode');

let gridSize = 16;
let randomMode = false;
let darkenMode = false;

function createGrid(size) {
  container.innerHTML = '';
  const cellSize = 100 / size;
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.flexBasis = `${cellSize}%`;
    cell.dataset.level = 0; // for darken mode
    container.appendChild(cell);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('cell')) {
    if (randomMode) {
      e.target.style.backgroundColor = getRandomColor();
    } else if (darkenMode) {
      let level = parseInt(e.target.dataset.level);
      if (level < 10) {
        level++;
        e.target.dataset.level = level;
        e.target.style.backgroundColor = `rgba(0,0,0,${level / 10})`;
      }
    } else {
      e.target.style.backgroundColor = 'black';
    }
  }
});

newGridBtn.addEventListener('click', () => {
  let newSize = parseInt(prompt('Enter grid size (1-100):'));
  if (isNaN(newSize) || newSize < 1 || newSize > 100) {
    alert('Invalid size! Please enter a number between 1 and 100.');
    return;
  }
  gridSize = newSize;
  createGrid(gridSize);
});

clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.style.backgroundColor = '';
    cell.dataset.level = 0;
  });
});

toggleBordersBtn.addEventListener('click', () => {
  container.classList.toggle('no-gridlines');
});

randomModeBtn.addEventListener('click', () => {
  randomMode = !randomMode;
  darkenMode = false;
});

darkenModeBtn.addEventListener('click', () => {
  darkenMode = !darkenMode;
  randomMode = false;
});

// initial grid
createGrid(gridSize);
