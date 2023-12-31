const deleteButtons = document.querySelectorAll('#delete-button');
const shareButtons = document.querySelectorAll('#share-button');
const routineId = document.querySelector('#hidden-id').textContent;

//each delete button will delete its correlating routine and its exercises
deleteButtons.forEach((button) => {
    button.addEventListener('click', async function () {

        const routineId = button.parentElement.parentElement.querySelector('#hidden-id').textContent;

        const isConfirm = confirm('Are you sure you want to delete this routine? All of its data will be lost forever!');

        if (isConfirm) {

            const response = await fetch(`/api/routines/${routineId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Routine Deleted');
            } else {
                alert('unable to delete Routine')
            }
        }

        const getProfile = fetch('/api/sessions');
        document.location.replace(`/profile/${getProfile.user_id}`);

    });
});

//each share button will create the ability to share or unshare your own routine
shareButtons.forEach((button) => {
    button.addEventListener('click', async function () {
        const routineId = button.parentElement.parentElement.querySelector('#hidden-id').textContent;

        //check if its already shared
        const checkif = await fetch(`/api/routines/search/${routineId}`);
        const shared = await checkif.json();
        let isShared = shared.share;

        if (isShared) {
            let share = false;

            const response = await fetch(`/api/routines/${routineId}`, {
                method: 'PUT',
                body: JSON.stringify({ share }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Routine is now unshared!');
            } else {
                alert('Unable to unshare routine');
            }
        } else {
            let share = true;

            const response = await fetch(`/api/routines/${routineId}`, {
                method: 'PUT',
                body: JSON.stringify({ share }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Routine is now shared on the Discover page!');
            } else {
                alert('Unable to share routine');
            }
        }

        button.innerHTML = isShared ?
            'Share <i class="fa-regular fa-share-from-square"></i>' :
            'Unshare <i class="fa-solid fa-share-from-square"></i>';

        //set the status of it with local storage
        localStorage.setItem(`routine_${routineId}_share`, isShared);

        document.location.replace(`/discover`);
    });
});

//set innerHTML for share buttons
shareButtons.forEach((button) => {
    const routineId = button.parentElement.parentElement.querySelector('#hidden-id').textContent;
    const isShared = localStorage.getItem(`routine_${routineId}_share`);

    if (isShared === 'false') {
        button.innerHTML = 'Unshare <i class="fa-solid fa-share-from-square"></i>';
    } else {
        button.innerHTML = 'Share <i class="fa-regular fa-share-from-square"></i>';
    }
});