import { useState, useEffect } from 'react';
import UserObjInterface from '../shared/interfaces/userObj.interface';

const useUserObject = () => {
  const [userObj, setUserObj] = useState<UserObjInterface | null | false>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:4000/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const user = await res.json();

        setUserObj(user);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  return { userObj, loading, error };
};

export default useUserObject;
