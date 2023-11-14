
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
        } catch (error) {
            console.error('Error during fetch:', error);
        }


        // Comment button clicked
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
                    body: JSON.stringify(postData),
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


    document.querySelectorAll('.comment-button').forEach(button => {
        button.dataset.originalContent = button.innerHTML;

        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const routineElement = this.closest('.cardy');

            const commentsLoaded = routineElement.classList.contains('comments-loaded');

            if (commentsLoaded) {
                const existingComments = routineElement.querySelectorAll('.oldComment');
                existingComments.forEach(comment => {
                    comment.remove();
                });

                // Remove the 'send-comment' section
                const sendCommentSection = routineElement.querySelector('.send-comment');
                if (sendCommentSection) {
                    sendCommentSection.remove();
                }

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
                    newHeader.textContent = '@' + userName.user_name;
                    const rawDate = new Date(comments[i].date_created);
                    const formattedDate = `${(rawDate.getMonth() + 1).toString().padStart(2, '0')}/${rawDate.getDate().toString().padStart(2, '0')}/${rawDate.getFullYear()}`;
                    date.textContent = 'Posted: ' + formattedDate;

                    newDiv.appendChild(newHeader);
                    newDiv.appendChild(newComment);
                    newDiv.appendChild(date);
                    routineElement.appendChild(newDiv);
                }

                routineElement.classList.add('comments-loaded');

                this.innerHTML = comments.length + '\n<i class="fa-solid fa-comment" style="color: #55dcfd;"></i>';

                // Create and append the textarea and button
                const anotherDiv = document.createElement('div')
                anotherDiv.setAttribute('class', 'send-comment');
                const addComment = document.createElement('textarea');
                const sendCommentBtn = document.createElement('button');
                sendCommentBtn.setAttribute('id', 'send-comment-button')
                sendCommentBtn.innerHTML = '<i class="fa-solid fa-arrow-right" style="color: #de2711;"></i>';
                anotherDiv.appendChild(addComment);
                anotherDiv.appendChild(sendCommentBtn)
                routineElement.appendChild(anotherDiv)

                // Add event listener for send-comment-button
                sendCommentBtn.addEventListener('click', async function () {
                    // Obtain the routine_id dynamically from the current routineElement
                    const routine_id = routineElement.querySelector('#hiddenRid').textContent;
                    const text = addComment.value.trim();
                    if (text) {
                        const response = await fetch('/api/comments', {
                            method: 'POST',
                            body: JSON.stringify({ text, routine_id }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        const responseData = await response.json();
                        console.log(responseData);

                        // Refresh the page after sending the comment
                        location.reload();
                    }
                });
            }
        });
    });



