
  
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

    });
});
