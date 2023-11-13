const submitBtn = document.querySelector('#submit-update-E');

submitBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    const routine_id = document.querySelector('.hidden-id').textContent;
    const name = document.querySelector('#editName').value.trim();
    const weight = document.querySelector('#editWeight').value.trim();
    const reps = document.querySelector('#editReps').value.trim();
    const eId = document.querySelector('#hidden-e-id').textContent;

    
    const response = await fetch(`/api/exercises/${eId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, weight, reps, routine_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/routine-edit/${routine_id}`);
      } else {
        alert('Failed to log in');
      }
});