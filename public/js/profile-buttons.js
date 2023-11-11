const editButtons = document.querySelector('#edit-button');
const deleteButtons = document.querySelectorAll('#delete-button');
const shareButtons = document.querySelector('#share-button');
const routineId = document.querySelector('#hidden-id').textContent;


deleteButtons.forEach((button) => {
    button.addEventListener('click', async function (event) {

        const routineId = button.parentElement.parentElement.querySelector('#hidden-id').textContent;

        const isConfirm = confirm('Are you sure you want to delete this routine? All of its data will be lost forever!');

        if(isConfirm){

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