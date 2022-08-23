const getUserObject = async () => {
  try {
    if (localStorage.getItem('token')) {
      const res = await fetch('https://bloggy-api-cynto.herokuapp.com/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();

      if (data.user) {
        return data.user;
      }
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error);
  }
};

export default getUserObject;
