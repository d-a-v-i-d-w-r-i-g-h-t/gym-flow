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

module.exports = isRoutineNameUnique;