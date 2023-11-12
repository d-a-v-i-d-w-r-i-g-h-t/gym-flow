const addbtn = document.querySelector('#addbtn');
const parent = document.getElementById('createTable');
const trashButton = document.querySelectorAll('.trashButton');
const updatebtn = document.querySelector('#updatebtn')
const routineId = document.querySelector('.hidden-id').textContent;
const editButton = document.querySelectorAll('.editEButton');



addbtn.addEventListener('click', function (event) {
    event.preventDefault();

    let newDiv = document.createElement('div')
    let newName = document.createElement('input');
    let newWeight = document.createElement('input');
    let newReps = document.createElement('input');

    newName.setAttribute('type', 'text');
    newName.setAttribute('placeholder', 'text');
    newName.setAttribute('id', 'nameInput');
    newName.setAttribute('class', 'first-input');


    newWeight.setAttribute('type', 'number');
    newWeight.setAttribute('placeholder', '0');
    newWeight.setAttribute('id', 'weightInput');


    newReps.setAttribute('type', 'number');
    newReps.setAttribute('placeholder', '0');
    newReps.setAttribute('id', 'repsInput');
    newReps.setAttribute('class', 'last-input');


    newDiv.appendChild(newName);
    newDiv.appendChild(newWeight);
    newDiv.appendChild(newReps);
    parent.appendChild(newDiv);
});

trashButton.forEach((button) => {
    button.addEventListener('click', async function () {
        try {
            const hiddenIdElement = button.closest('tr').querySelector('.hiddenExerciseId');
            if (!hiddenIdElement) {
                console.error('Hidden ID not found.');
                return;
            }

            const hiddenId = hiddenIdElement.textContent;

            const response = await fetch(`/api/exercises/${hiddenId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Exercise deleted.');
            } else {
                alert('Cannot delete exercise.');
            }
        } catch (err) {
            alert('Unable to delete exercise.');
        }
    });
});

updatebtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const routine_name = document.querySelector('#newRoutineName').value.trim();
    const description = document.querySelector('.txtarea').value.trim();
    if (routine_name && description) {
        console.log(routine_name, description)
        const response = await fetch(`/api/routines/${routineId}`, {
            method: 'PUT',
            body: JSON.stringify({ routine_name, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert("Routine Updated!")
        } else {
            alert('Failed to update Routine.');
        }
    } else {
        alert('unable to update your routine at this time')
    }
});
