import React from 'react'
import { useSelector } from 'react-redux'

import SignForm from '../components/sign-form'

const SignIn = () => {
  const { user } = useSelector((state) => state.user)
  return (
    <>
      <SignForm token={user.token} />;
    </>
  )
}

export default SignIn
