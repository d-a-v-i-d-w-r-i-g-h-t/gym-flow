
// Adding a click event listener to the container with event delegation
document.querySelector('.discover').addEventListener('click', async function (event) {

  const deleteButton = event.target.closest('.delete-button');
  const shareButton = event.target.closest('.share-button');

  if (deleteButton) {
      handleDeleteButtonClick(event, deleteButton);

  } else if (shareButton) {
      handleShareButtonClick(event, shareButton);
      
  }
});



async function handleDeleteButtonClick(event, deleteButton) {
  


}



async function handleShareButtonClick(event, shareButton) {
  

  
}
