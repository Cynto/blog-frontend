import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UserContext = createContext({
  userObj: {
    _id: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
  },
});

export const UserProvider = ({ children }: any) => {
  const [userObj, setUserObj] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
  });
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch('http://localhost:4000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      console.log(data);

      if (!data) {
        console.log(data);
        router.push('/login');
      } else {
        setUserObj(data);
      }
    };

    checkIfLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userObj }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
