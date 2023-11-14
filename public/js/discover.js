
// Adding a click event listener to the container with event delegation
document.querySelector('.discover').addEventListener('click', async function (event) {

    const likeButton = event.target.closest('.like-button');
    const commentButton = event.target.closest('.comment-button');
    const saveButton = event.target.closest('.save-button');
    const sendCommentButton = event.target.closest('.send-comment-button');

    if (likeButton) {
        handleLikeButtonClick(event, likeButton);

    } else if (commentButton) {
        handleCommentButtonClick(event, commentButton);
        
    } else if (sendCommentButton) {
        handleSendCommentButtonClick(event);

    } else if (saveButton) {
        handleSaveButtonClick(event, saveButton);
    }
});



async function handleLikeButtonClick(event, likeButton) {
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
            `/api/routines/like/${routineId}`;

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
    } catch (err) {
        console.error('Error during fetch:', err);
    }
}



function handleCommentButtonClick(event, commentButton) {
    event.preventDefault();
    
    const isCommented = commentButton.dataset.commented === 'true'; // converting string to boolean

    // traverse the DOM to top of cardy element
    const cardyElement = event.target.closest('.cardy');
    const commentsElement = cardyElement.querySelector('.comments');
    const commentsVisible = commentsElement.dataset.commentsVisible === 'true'; // converting string to boolean

    const leftButton = document.querySelector('.bottom-left-btn');
    const rightButton = document.querySelector('.bottom-right-btn');

    if (commentsVisible) {
        // Toggle comments section hidden

        // add class 'display-none' to comments div
        // corresponds to css style .display-none { display: none; }
        commentsElement.classList.add('display-none');

        // replace rounded outside bottom corners on Like and Save buttons
        leftButton.classList.remove('no-rounded-corners');
        rightButton.classList.remove('no-rounded-corners');

    } else { // comments are hidden
        // Toggle comments section visible

        // remove class 'display-none' to comments section
        commentsElement.classList.remove('display-none');
        
        // remove rounded outside bottom corners on Like and Save buttons
        leftButton.classList.add('no-rounded-corners');
        rightButton.classList.add('no-rounded-corners');
    }
}



async function handleSendCommentButtonClick(event) {
    event.preventDefault();

    const discoverAllElement = event.target.closest('.discoverAll');
    const username = discoverAllElement.dataset.username;

    const commentsElement = event.target.closest('.comments');
    const routineId = commentsElement.dataset.routineId;

    const sendCommentElement = event.target.closest('.send-comment');
    commentTextarea = sendCommentElement.querySelector('.new-comment-textarea');
    commentText = commentTextarea.value.trim();
    
    if (commentText) {
        try {
            // save the new comment to the database
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ 
                    text: commentText, 
                    routine_id: routineId
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // const responseData = await response.json();
            // console.log(responseData);

            // get the current date
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            
            // create a new comment div
            var newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('oldComment');
            newCommentDiv.innerHTML = `
            <h4>@${username}</h4>
            <p class="storedComment">${commentText}</p>
            <p>Posted: ${formattedDate}</p>
            `;
            
            // append new comment at bottom of list
            sendCommentElement.insertAdjacentElement('beforebegin', newCommentDiv);
            
            // clear textarea
            commentTextarea.value = '';

        } catch (err) {
            console.error('Error during fetch:', err);
        }
    }
}



async function handleSaveButtonClick(event, saveButton) {
    event.preventDefault();

    const isSaved = saveButton.dataset.saved === 'true'; // converting string to boolean
    
    // traverse the DOM to top of cardy element
    const cardyElement = event.target.closest('.cardy');
    // traverse the DOM down to routine-name element
    const routineName = cardyElement.querySelector('.routine-name').textContent;

    if (!isSaved) {
        
        // traverse the DOM down to other elements we want data from
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
                body: JSON.stringify(postData),
            });
            
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
            console.error('Error during fetch:', err);
        }
        
        // get routine id for the user's new routine
        let routineId;
        try {
            const encodedName = encodeURIComponent(routineName);
            const response = await fetch(`/api/routines/routine-id/${encodedName}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.id) {
                // Routine ID found
                routineId = data.id;
            } else {
                // Routine ID not found
            }
        } catch (err) {
            console.error('Error fetching routine ID: ', error)
        }
        
        // traverse the DOM to gather exercise data
        const exercisesToAdd = [];
        cardyElement.querySelectorAll('.trow').forEach((exerciseElement) => {
            const exerciseData = {
                name: exerciseElement.querySelector('.dataName').textContent,
                weight: exerciseElement.querySelector('.dataWeight').textContent,
                reps: exerciseElement.querySelector('.dataReps').textContent,
                routine_id: routineId,
            };
            exercisesToAdd.push(exerciseData);
        });

        // Save exercise data to user's new routine
        try {
            const response = await fetch('/api/exercises/bulk-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exercisesToAdd),
            });

            if (response.ok) {
                const responseData = await response.json();
            } else {
                console.error('Failed to perform bulkCreate action');
            }
        } catch (err) {
            console.error('Error during fetch:', err);
        }
        
    } else {
        // ****** >>> REPLACE THIS ALERT WITH A MODAL <<< ******
        alert(
            `Routine '${routineName}' has already been saved to My Flow.`
        );
    }
}
