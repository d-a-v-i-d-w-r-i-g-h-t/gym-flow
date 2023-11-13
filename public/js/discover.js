
  // Adding a click event listener to the container, using event delegation
  document.querySelector('.discover').addEventListener('click', async function (event) {
      
    // Check if the clicked element is a like button
    if (event.target.classList.contains('like-button')) {
        event.preventDefault();
        console.log('like button clicked');
        const routineId = event.target.dataset.routineId;
        const isLiked = event.target.dataset.liked === 'true'; // converting string to boolean
        const likeCountSpan = event.target.querySelector('.like-count');
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
                event.target.innerHTML = `
                    <span class="like-count">${likeCount}</span>
                    <i class="${updatedIconClass} fa-thumbs-up"></i>
                    `;
                // Update the data-liked attribute for future clicks
                event.target.dataset.liked = (!isLiked).toString();
            } else {
                console.error('Failed to perform like/unlike action');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    } else if (event.target.classList.contains('comment-button')) {
        event.preventDefault();

        // show comments, new comment form

    } else if (event.target.classList.contains('share-button')) {
        event.preventDefault();

        // share how?

    } else if (event.target.classList.contains('save-button')) {
        event.preventDefault();
        console.log('save button clicked');
        const routineNameSpan = event.target.querySelector('.routine-name');
        const routineName = routineNameSpan.textContent;

        const routineDescriptionSpan = event.target.querySelector('.routine-description');
        const routineDescription = routineDescriptionSpan.textContent;

        const postData = {
            routine_name: routineName,
            share: false, // default
            description: routineDescription,
            user_id: req.session.user_id,
        }

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


