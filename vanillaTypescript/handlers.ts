export const handleLogin = async (data: any, router: any, setErrors: Function) => {
  const email = data.email;
  const password = data.password;
  console.log(email.value, password.value);

  const response = await fetch(
    'https://bloggy-api-cynto.herokuapp.com/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value.toLowerCase(),
        password: password.value,
      }),
    }
  );
  const json = await response.json();

  if (json.user && json.token) {
    localStorage.setItem('token', json.token);
    router.push('/');
  } else {
    setErrors(json.errors);
  }
};


