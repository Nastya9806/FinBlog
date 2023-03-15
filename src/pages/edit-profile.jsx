import React from 'react';
import { useSelector } from 'react-redux';
import UserForm from '../../pages/user-form';

const EditProfile = () => {
  const {user} = useSelector((state) => state.user);
  return (
    <>
      <UserForm user={user}/>
    </>
  );
};

export default EditProfile;