import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllUsers } from './FirebaseService';

function Detail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      const selectedUser = users.find((element) => element.id === id);
      setUser(selectedUser);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="text-center mt-5">Chargement des détails...</div>;
  }

  return (
    <div className="container mt-5 detail">
      <h2>Détails de l'utilisateur</h2>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
            <p><strong>Prénom :</strong> {user.prenomInput}</p>
           <p><strong>Nom :</strong> {user.nomInput}</p>
            <p><strong>Email :</strong> {user.emailInput}</p>
           <p><strong>Téléphone :</strong> {user.telephoneInput}</p>
           <Link to="/"  className='bnt btn-ajout'>Retour</Link>
            </div>
        </div>
      </div>
        
    </div>
  );
}

export default Detail;
