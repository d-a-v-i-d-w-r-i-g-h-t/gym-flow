const savebtn = document.querySelector('#savebtn');
const addbtn = document.querySelector('#addbtn');
const removebtn = document.querySelector('#removebtn')
const parent = document.getElementById('createTable');
const nameInput = document.querySelector('#nameInput');
const weightInput = document.querySelector('#weightInput');
const repsInput = document.querySelector('#repsInput');

//everytime the "add Exercise" button is clicked, a new row of three inputs are created and displayed
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

//removes the last newly generated row of inputs
removebtn.addEventListener('click', function (event) {
  event.preventDefault();
  let children = parent.children;
  if (children.length > 0) {
    parent.removeChild(children[children.length - 1]);
  }
});
//saves and posts exercise data indivually to its routine id
savebtn.addEventListener('click', async function (event) {
  event.preventDefault();

  let rows = document.querySelectorAll('#nameInput'); // Using class instead of ID
  rows.forEach(async function (row) {
    let name = row.value;
    let weight = row.parentElement.querySelector('#weightInput').value;
    let reps = row.parentElement.querySelector('#repsInput').value;

    const routine_id = document.querySelector('#hidden').textContent;

    if (name && weight && reps) {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        body: JSON.stringify({ name, weight, reps, routine_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/routine-edit/${routine_id}`);
      } else {
        alert('Failed to add exercises to your routine')
      }
    } else {
      alert("unable to create table at this time")
    }
  });
});