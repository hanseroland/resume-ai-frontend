import React from 'react'
import ProfileComponent from '../components/ProfileComponent'
import { useSelector } from 'react-redux';

function ProfilPage() {

  const { currentUser } = useSelector(state => state.users);

  
  return (
    <div>
        <ProfileComponent
          user={currentUser}

        />
    </div>
  )
}

export default ProfilPage