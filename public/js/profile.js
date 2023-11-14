
// Adding a click event listener to the container with event delegation
document.querySelector('.profileData').addEventListener('click', async function (event) {

  const deleteButton = event.target.closest('.delete-button');
  const shareButton = event.target.closest('.share-button');

  if (deleteButton) {
      handleDeleteButtonClick(event, deleteButton);

  } else if (shareButton) {
      handleShareButtonClick(event, shareButton);
  }
});



async function handleDeleteButtonClick(event, deleteButton) {
  event.preventDefault();

  const routineId = deleteButton.dataset.routineId;

  const isConfirm = confirm('Are you sure you want to delete this routine? All of its data will be lost forever!');

  if(isConfirm){
    try {
      const response = await fetch(`/api/routines/${routineId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to delete routine. Server response: ${errorMessage}`);

        alert('Unable to delete Routine. Please try again.');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', error);
    }
  }
}



async function handleShareButtonClick(event, shareButton) {
  event.preventDefault();

  const routineId = shareButton.dataset.routineId;
  const isShared = shareButton.dataset.shared === 'true'; // converting string to boolean;

  try {

    const fetchURL = isShared ?
    `/api/routines/unshare/${routineId}` :
    `/api/routines/share/${routineId}`;

    const response = await fetch(fetchURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {

      // Update the UI, toggle the like button appearance

      const updatedIconClass = isShared ? 
        'Share <i class="fa-regular' : 
        'Unshare <i class="fa-solid' ;

      shareButton.innerHTML = `
      ${updatedIconClass} fa-share-from-square"></i>
      `;

      // update the data-shared attribute for future clicks
      shareButton.dataset.shared = (!isShared).toString();

    } else {
      console.error('Failed to perform share/unshare action');
    }
  } catch (err) {
    console.error('Error during fetch:', err);

  }

}
