
  // Adding a click event listener to the container, using event delegation
  document.querySelector('.discover').addEventListener('click', async function (event) {
      
    // Check if the clicked element is a like button
    if (event.target.classList.contains('like-button')) {
        event.preventDefault();

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
    }
});
