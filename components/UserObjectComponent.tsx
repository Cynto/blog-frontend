import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserObj } from '../redux/slices/userObj';
import getUserObject from '../vanillaTypescript/getUserObject';

const UserObjectComponent = () => {
  const dispatch = useDispatch();
  const userObj = useSelector((state: any) => state.userObj);

  const updateUserObject = async () => {
    const userObject = await getUserObject();

    if (userObject !== undefined) {
      dispatch(setUserObj(userObject));
    }
  };

  useEffect(() => {
    if (!userObj || userObj.initial) {
      updateUserObject();
    }
  }, []);
  return <></>;
};

export default UserObjectComponent;
