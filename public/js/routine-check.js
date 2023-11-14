async function isRoutineNameUnique(routineName) {
  try {

    const encodedName = encodeURIComponent(routineName);

    // fetch request to check if a username is unique, returns true/false
    const fetchURL = 
    `/api/routines/check-routine-name/${encodedName}`;
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
