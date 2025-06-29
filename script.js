const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const list = document.getElementById('list');
const stats = document.getElementById('stats');

let students = JSON.parse(localStorage.getItem('students') || '[]');

function updateUI() {
  list.innerHTML = '';
  students.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'student';
    div.innerHTML = `
      <span>${s.name}</span>
      <button onclick="mark(${i}, 'present')">✅</button>
      <button onclick="mark(${i}, 'absent')">❌</button>
      <button onclick="remove(${i})">🗑️</button>
    `;
    list.appendChild(div);
  });

  const present = students.filter(s => s.status === 'present').length;
  const absent = students.filter(s => s.status === 'absent').length;
  stats.textContent = `Total: ${students.length} | Present: ${present} | Absent: ${absent}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  if (students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
    alert("Name already exists!");
    return;
  }
  students.push({ name, status: null });
  nameInput.value = '';
  save();
});

function mark(index, status) {
  students[index].status = status;
  save();
}

function remove(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    save();
  }
}

function save() {
  localStorage.setItem('students', JSON.stringify(students));
  updateUI();
}

// Initial render
updateUI();
