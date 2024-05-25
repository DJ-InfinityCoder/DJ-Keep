const addBtn = document.querySelector('#add');

const randomColor = function () {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
};

const updateLocalStorage = () => {
    const noteElements = document.querySelectorAll('.note');
    const notes = [];
    noteElements.forEach((note) => {
        const textArea = note.querySelector('.textarea');
        const dateElement = note.querySelector('.date');
        const noteData = {
            content: textArea.value,
            date: dateElement.innerText
        };
        notes.push(noteData);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (noteData = {content: '', date: ''}) => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <div class="date">${noteData.date}</div>
            <div>
                <button type="button" title="save" class=" opt-btn save"><i class="fa-regular fa-floppy-disk"></i></button>
                <button type="button" title="edit" class=" opt-btn edit"><i class="fa-regular fa-pen-to-square"></i></button>
                <button type="button" title="remove" class=" opt-btn remove"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        <div class="main ${noteData.content ? "" : "hidden"}"></div>
        <textarea class="textarea ${noteData.content ? "hidden" : ""}"></textarea>
    `;
    note.style.backgroundColor = randomColor();

    note.insertAdjacentHTML('afterbegin', htmlData);

    const saveBtn = note.querySelector('.save');
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.remove');
    const maindiv = note.querySelector('.main');
    const textArea = note.querySelector('.textarea');
    const dateElement = note.querySelector('.date');

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString(); // This will give date and time in local format
    };

    saveBtn.addEventListener('click', () => {
        maindiv.classList.remove('hidden');
        textArea.classList.add('hidden');
        dateElement.innerText = getCurrentDateTime();
        updateLocalStorage();
    });

    editBtn.addEventListener('click', () => {
        textArea.classList.remove('hidden');
        maindiv.classList.add('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    });

    textArea.value = noteData.content;
    maindiv.innerHTML = noteData.content;

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        maindiv.innerHTML = value;
        updateLocalStorage();
    });

    document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((noteData) => addNewNote(noteData));
}

addBtn.addEventListener('click', () => addNewNote()); 
