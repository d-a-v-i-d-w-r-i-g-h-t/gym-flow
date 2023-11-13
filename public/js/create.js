const savebtn = document.querySelector('#savebtn');
const addbtn = document.querySelector('#addbtn');
const removebtn = document.querySelector('#removebtn')
const parent = document.getElementById('createTable');
// const isRoutineNameUnique = require('../../utils/routine-check');
const routineName = document.querySelector('#newRoutineName');
const description = document.querySelector('.txtarea').value;
const share = false;



addbtn.addEventListener('click', function (event) {
  event.preventDefault();

  let newDiv = document.createElement('div')
  let newName = document.createElement('input');
  let newWeight = document.createElement('input');
  let newReps = document.createElement('input');

  newName.setAttribute('type', 'text');
  newName.setAttribute('placeholder', 'text');
  newName.setAttribute('id', 'nameInput');
  newName.setAttribute('class', 'first-input')

  newWeight.setAttribute('type', 'number');
  newWeight.setAttribute('placeholder', '0');
  newWeight.setAttribute('id', 'weightInput');

  newReps.setAttribute('type', 'number');
  newReps.setAttribute('placeholder', '0');
  newReps.setAttribute('id', 'repsInput')
  newReps.setAttribute('class', 'last-input')

  newDiv.appendChild(newName);
  newDiv.appendChild(newWeight);
  newDiv.appendChild(newReps);
  parent.appendChild(newDiv)
});

removebtn.addEventListener('click', function (event) {
  event.preventDefault();
  let children = parent.children;
  if (children.length > 0) {
    parent.removeChild(children[children.length - 1]);
  }
});

async function isRoutineNameUnique(routineName) {
  try {
    const sessiondb = await fetch('api/sessions');
    const currentUser = await sessiondb.json();
    const userId = currentUser.user_id;
    // fetch request to check if a username is unique, returns true/false
    const fetchURL = 
    `/api/routines/check-routine-name/?routineName=${routineName}&userId=${userId}`;
    const response = await fetch(fetchURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // server responded with success status
      const data = await response.json();
      return data.isUnique;
    } else {
      // server responded with error status
      console.error('Failed to check for unique routine name with given user id');
      return false;
    }
  } catch (error) {
    console.error('Error checking for unique routine name with given user id', error);
    return false;
  }
};


routineName.addEventListener('blur', async () => {
  const routine_name = document.querySelector('#newRoutineName').value.trim();
  if (routine_name !== '') {
    const isUnique = await  isRoutineNameUnique(routine_name);
    if (!isUnique) {

      // ****** >>> REPLACE THIS ALERT WITH A MODAL <<< ******
      alert(
        `Routine name '${routine_name}' is already an existing Routine for your account.
Please choose a different Routine Name.`
      );

      // Clear the username input field
      routineName.value = '';
      // Set the focus back on the username input field
      routineName.focus();
    }
  }
});


savebtn.addEventListener('click', async function (event) {
  event.preventDefault();

 

  if (routine_name && description) {
    const response = await fetch('/api/routines', {
      method: 'POST',
      body: JSON.stringify({ routine_name, share, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Routine Created!')
    }
  } else {
    alert('Failed to create Routine')
  }

  let rows = document.querySelectorAll('#nameInput'); // Using class instead of ID
  rows.forEach(async function (row) {
    let name = row.value;
    let weight = row.parentElement.querySelector('#weightInput').value;
    let reps = row.parentElement.querySelector('#repsInput').value;


    const getRoutineIdResponse = await fetch(`/api/routines/${routine_name}`);
    const getRoutineIdData = await getRoutineIdResponse.json();
    const routine_id = getRoutineIdData.id;

    if (name && weight && reps) {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        body: JSON.stringify({ name, weight, reps, routine_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userid = await fetch('/api/sessions');
        const getuserId = await userid.json();
        const profile_id = getuserId.user_id;
        document.location.replace(`/profile/${profile_id}`);
      } else {
        alert('Failed to add exercises to your routine')
      }
    } else {
      alert("unable to create table at this time")
    }



  });
});