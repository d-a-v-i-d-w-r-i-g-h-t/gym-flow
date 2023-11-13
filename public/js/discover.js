const isRoutineNameUnique = require('../../utils/routine-check');

  // Adding a click event listener to the container, using event delegation
  document.querySelector('.discover').addEventListener('click', async function (event) {
      
    const likeButton = event.target.closest('.like-button');
    const commentButton = event.target.closest('.comment-button');
    const saveButton = event.target.closest('.save-button');
    
    // Check if the clicked element is a like button
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
            if (isLiked === true) {
                likeCount--;
            } else {
                likeCount++;
            }

            const response = await fetch(fetchURL, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                // Update the UI, toggle the like button appearance
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
    } else if (commentButton) {
        event.preventDefault();

        // show comments, new comment form

    } else if (saveButton) {
        event.preventDefault();

        console.log('save button clicked');

        const cardyElement = event.target.closest('.cardy');

        const routineName = cardyElement.querySelector('.routine-name').textContent;
        const routineDescription = cardyElement.querySelector('.routine-description').textContent;
        const userId = cardyElement.querySelector('.discover-post').dataset.userId;

        const postData = {
            routine_name: routineName,
            share: false, // default
            description: routineDescription,
            user_id: userId,
        };

        console.log(postData);
        // save routine to user flow
        // try {
        //     const response = await fetch('/api/routines/', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json', },
        //         body: JSON.stringify({ postData }),
        //     });
        // } catch (err) {

        // }
        

    } else {

    }
});


