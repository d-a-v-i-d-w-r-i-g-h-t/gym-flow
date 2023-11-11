const savebtn = document.querySelector('#savebtn');
const addbtn = document.querySelector('#addbtn');
const removebtn = document.querySelector('#removebtn')
const parent = document.getElementById('createTable');

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