const addbtn = document.querySelector('#addbtn');
const parent = document.getElementById('createTable');
const trashButton = document.querySelectorAll('.trashButton');
const updatebtn = document.querySelector('#updatebtn')
const routineId = document.querySelector('.hidden-id').textContent;
const editButton = document.querySelectorAll('.editEButton');

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
            const userid = await fetch('/api/sessions');
            const getUserName = await userid.json();
            const profile_name = getUserName.user_name;
            document.location.replace(`/profile/${profile_name}`);
        } else {
            alert('Failed to update Routine.');
        }
    } else {
        alert('unable to update your routine at this time')
    }
});
