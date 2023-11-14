// const isRoutineNameUnique = require('./routine-check');

// Adding a click event listener to the container, using event delegation
document.querySelector('.discover').addEventListener('click', async function (event) {
    
    const likeButton = event.target.closest('.like-button');
    const commentButton = event.target.closest('.comment-button');
    const saveButton = event.target.closest('.save-button');
    
    // Like button clicked
    if (likeButton) {
        event.preventDefault();

        const routineId = likeButton.dataset.routineId;
        const isLiked = likeButton.dataset.liked === 'true'; // converting string to boolean
        const likeCountSpan = likeButton.querySelector('.like-count');
        let likeCount = parseInt(likeCountSpan.textContent);

        // Fetch request to like/unlike the routine
        try {

            const method = isLiked ? 'DELETE' : 'POST';
            const fetchURL = isLiked ?
                `/api/routines/unlike/${routineId}` :
                `/api/routines/like/${routineId}` ;
                
            const response = await fetch(fetchURL, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {

                // Update the UI, toggle the like button appearance

                if (isLiked === true) {
                    likeCount--;
                } else {
                    likeCount++;
                }
                
                const updatedIconClass = isLiked ? 'fa-regular' : 'fa-solid';

                likeButton.innerHTML = `
                    <span class="like-count">${likeCount}</span>
                    <i class="${updatedIconClass} fa-thumbs-up"></i>
                    `;

                // Update the data-liked attribute for future clicks
                likeButton.dataset.liked = (!isLiked).toString();

            } else {
                console.error('Failed to perform like/unlike action');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }


    // Comment button clicked
    } else if (commentButton) {
        event.preventDefault();

        // show comments, new comment form


    // Save Button clicked
    } else if (saveButton) {
        event.preventDefault();

        console.log('save button clicked');
        const isSaved = saveButton.dataset.saved === 'true'; // converting string to boolean
        
        const cardyElement = event.target.closest('.cardy');
        const routineName = cardyElement.querySelector('.routine-name').textContent;
        
        if (!isSaved) {
            // traverse the DOM to top of cardy element
            
            // traverse the DOM down to elements we want data from
            const routineDescription = cardyElement.querySelector('.routine-description').textContent;
            const userId = cardyElement.querySelector('.discover-post').dataset.userId;
    
            const postData = {
                routine_name: routineName,
                share: false, // default
                description: routineDescription,
                user_id: userId,
            };
            
            // save routine to user's My Flow
            try {

                const response = await fetch('/api/routines/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify( postData ),
                });
                console.log(response);
                if (response.ok) {

                    // Update the UI, toggle the save button appearance

                    const updatedIconClass = 'fa-solid';

                    saveButton.innerHTML = `
                        <i class="${updatedIconClass} fa-floppy-disk"></i>
                        `;
                    // Update the data-liked attribute for future clicks
                    saveButton.dataset.saved = 'true';
                }
            } catch (err) {
            }
                
        } else {
            // ****** >>> REPLACE THIS ALERT WITH A MODAL <<< ******
            alert(
                `Routine '${routineName}' has already been saved to My Flow.`
            );
            
        }
    }
});


