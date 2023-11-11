const savebtn = document.querySelector('#savebtn');
const addbtn = document.querySelector('#addbtn');
const removebtn = document.querySelector('#removebtn')
const parent = document.getElementById('createTable');
const nameInput = document.querySelector('#nameInput');
const weightInput = document.querySelector('#weightInput');
const repsInput = document.querySelector('#repsInput');


addbtn.addEventListener('click', function(event){
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

removebtn.addEventListener('click', function(event){
    event.preventDefault();
    let children = parent.children;
    if (children.length > 0) {
        parent.removeChild(children[children.length - 1]);
    }
});

savebtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const share = false;
    const routine_name = document.querySelector('#newRoutineName').value.trim();
    const description = document.querySelector('.txtarea').value.trim();
    if(routine_name && description){
    const response = await fetch('/api/routines', {
        method: 'POST',
        body: JSON.stringify({ routine_name, share, description }),
        headers: { 'Content-Type': 'application/json' },
      });

      if(response.ok){
        alert("New Routine added!")
      } else {
        alert('Failed to create Routine.');
      }
    }else{
      alert('You must fill out the name and description fields before saving!')
    }

    let rows = document.querySelectorAll('#nameInput'); // Using class instead of ID
    rows.forEach( async function (row) {
        let name = row.value;
        let weight = row.parentElement.querySelector('#weightInput').value;
        let reps = row.parentElement.querySelector('#repsInput').value;


        const getRoutineIdResponse = await fetch(`/api/routines/${routine_name}`);
        const getRoutineIdData = await getRoutineIdResponse.json();
        const routine_id = getRoutineIdData.id;

        if(name && weight && reps){
          const response = await fetch('/api/exercises', {
            method: 'POST',
            body: JSON.stringify({name, weight, reps, routine_id}),
            headers: { 'Content-Type': 'application/json' },
          });

          if(response.ok){
            alert(`New Exercises added to${routine_name}}`);
            document.location.replace(`/discover`);
          }else{
            alert('Failed to add exercises to your routine')
          }
        }else{
          alert("unable to create table at this time")
        }



    });
});