
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
                    body: JSON.stringify( postData ),
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
});


document.querySelectorAll('.comment-button').forEach(button => {
    button.dataset.originalContent = button.innerHTML;

    button.addEventListener('click', async function(event) {
        event.preventDefault();
        const routineElement = this.closest('.cardy');
        
        const commentsLoaded = routineElement.classList.contains('comments-loaded');

        if (commentsLoaded) {
            const existingComments = routineElement.querySelectorAll('.oldComment');
            existingComments.forEach(comment => {
                comment.remove();
            });

            routineElement.classList.remove('comments-loaded');

            this.innerHTML = this.dataset.originalContent;
        } else {
            const routineId = routineElement.querySelector('#hiddenRid').textContent;
            const commentsdb = await fetch(`api/comments/${routineId}`);
            const comments = await commentsdb.json();
            
            for (let i = 0; i < comments.length; i++) {
                const getUsernames = await fetch(`/api/users/${comments[i].user_id}`)
                const userName = await getUsernames.json();
                console.log(userName);

                let newDiv = document.createElement('div');
                newDiv.setAttribute('class', 'oldComment')
                let newComment = document.createElement('p');
                newComment.setAttribute('class', 'storedComment')
                let newHeader = document.createElement('h4');
                let date = document.createElement('p');

                newComment.textContent = comments[i].text;
                newHeader.textContent = '@'+userName.user_name;
                date.textContent = 'Date:' + comments[i].date_created;

                newDiv.appendChild(newHeader);
                newDiv.appendChild(newComment);
                newDiv.appendChild(date);
                routineElement.appendChild(newDiv);
            }

            routineElement.classList.add('comments-loaded');

            this.innerHTML = '<i class="fa-solid fa-comment" style="color: #55dcfd;"></i>';
        }
        const anotherDiv = document.createElement('div')
        anotherDiv.setAttribute('class', 'send-comment');
        const addComment = document.createElement('textarea');
        const sendCommentBtn = document.createElement('button');
        sendCommentBtn.setAttribute('id', 'send-comment-button')
        sendCommentBtn.innerHTML = '<i class="fa-solid fa-arrow-right" style="color: #de2711;"></i>';
        anotherDiv.appendChild(addComment);
        anotherDiv.appendChild(sendCommentBtn)
        routineElement.appendChild(anotherDiv)

        sendCommentBtn.addEventListener('click', async function(){
            const routine_id = document.querySelector('#hiddenRid').textContent;
            const text = addComment.value.trim();
            if(text){
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({text, routine_id}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseData = await response.json();
                console.log(responseData);
            }
        })
    });
});



