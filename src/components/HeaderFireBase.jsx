import { useEffect, useState } from "react";
import { getAllUsers , deleteUserFromFirebase  } from "./services/FirebaseService";
import InputForm from "./InputForm";
import { toast } from 'react-toastify';
import { addCreatedAtToExistingUsers } from "./utile";




function HeaderFireBase() {  
  const [ users , setUsers ] = useState([]);
  const [ modifUsers , setModifUsers ] = useState(null)
  const [searchTerme, setSearchTerme] = useState("");
  const [lockedUsers, setLockedUsers] = useState([]);
  const [pageActuel, setPageActuel] = useState(1);
  const usersParPage = 3;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const refreshUsers = async () => {
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  useEffect(() => {
    addCreatedAtToExistingUsers();
    refreshUsers();
  }, []);
  
  const modifInfoUsers = (id) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setModifUsers(userToEdit);
    }
  };
  

// Sup user
const deleteUser = async (id) => {

    await deleteUserFromFirebase(id);
    await refreshUsers();
    toast.error("user supprimer avec succes")
};


const filteredUsers = users.filter(user =>
  (user.prenomInput || "").toLowerCase().includes(searchTerme.toLowerCase())
  
);
console.log(filteredUsers);


                
const toggleLock = (id) => {
  if (lockedUsers.includes(id)) {
    setLockedUsers(lockedUsers.filter(userId => userId !== id)); // Débloque
    console.log(lockedUsers);
  } else {
    setLockedUsers([...lockedUsers, id]); // Bloque
    
  }
};


const indexOfLastUser = pageActuel * usersParPage;
const indexOfFirstUser = indexOfLastUser - usersParPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
const totalPages = Math.ceil(filteredUsers.length / usersParPage);



return (
  <div className='container bg-white shadow'>
    <h1 className='text-center m-3'>CRUD ETUDIANT</h1>
      <div className="row justify-content-center">
          <div className="col-md-6">
         <div className='search' >
          <input className=" w-100" type="search" placeholder="Recherche..."
           value={searchTerme}
           onChange={(e) => setSearchTerme(e.target.value)}/>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
          </div>
           <div className="col-md-6">
        

           
            <button type="submit" className="btn w-100 btn-ajout" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
             Ajouter
            </button>


              <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
             <div className="modal-content">
    
               <InputForm refreshUsers={refreshUsers}
                setUsers={setUsers}
                modifUsers={modifUsers}
                setModifUsers={setModifUsers}
                // updateUser={updateUser}
                />

     
             </div>
       </div>
        </div>

    
          </div>

           {/* Tableau  */}
      <div className=" mt-5 pt-3">
          <h2 className="text-center mt-3">Utilisateurs</h2>
          <div className="table-responsive m-2">
              <table id="table" className="table table-striped table-hover">
                  <thead>
                      <tr className="border">
                          <th scope="col">Prenom</th>
                          <th scope="col">Nom</th>
                          <th scope="col">Email</th>
                          <th scope="col">Telephone</th>
                          <th className="text-center" scope="col">Actions</th>
                      </tr>
                  </thead>
                  <tbody id="tbody">
                      {/* le contenu du tbody  */}
                      {currentUsers.length > 0 &&
                      currentUsers.map((user) => (
                      <tr key={user.id} className={lockedUsers.includes(user.id) ? "disabled-row" : ""}>
                        <td>{user.prenomInput}</td>
                        <td>{user.nomInput}</td>
                        <td>{user.emailInput}</td>
                       <td>{user.telephoneInput}</td>
                       <td className="d-flex justify-content-center align-items-center gap-3">

                    <button
                  className={`btn btn-ajout btn-sm ${lockedUsers.includes(user.id) ? 'disabled-link' : ''}`}
                  onClick={() => handleShowModal(user)}
                  disabled={lockedUsers.includes(user.id)}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>

                      <button  className="btn btn-info "
                      onClick={() => modifInfoUsers(user.id)}
                      disabled={lockedUsers.includes(user.id)}
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                       <i className="fa-solid fa-pen-to-square"></i></button>

                      <button className="btn btn-success btn-sm"
                      onClick={() => deleteUser(user.id)}
                      disabled={lockedUsers.includes(user.id)}
                      >
                      <i className="fa-solid fa-trash"></i></button>

                      <button
                   className={`btn btn-sm ${lockedUsers.includes(user.id) ? "btn-secondary" : "btn-danger"}`}
                    onClick={() => toggleLock(user.id)}>
                      <i className={`fa-solid ${lockedUsers.includes(user.id) ? "fa-lock-open" : "fa-ban"}`}></i>
                  </button>
                        </td>
                      </tr>
                   ))}
                  </tbody>
              </table>

              {/* Modale Bootstrap */}
      {showModal && selectedUser && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails de l'utilisateur</h5>
                {/* <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button> */}
              </div>
              <div className="modal-body">
                <p><strong>Prénom :</strong> {selectedUser.prenomInput}</p>
                <p><strong>Nom :</strong> {selectedUser.nomInput}</p>
                <p><strong>Email :</strong> {selectedUser.emailInput}</p>
                <p><strong>Téléphone :</strong> {selectedUser.telephoneInput}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
      </div>

      <nav className="mt-3" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pageActuel === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPageActuel(pageActuel - 1)}>
                Avant
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${pageActuel === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPageActuel(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${pageActuel === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPageActuel(pageActuel + 1)}>
                Apres
              </button>
            </li>
          </ul>
        </nav>
      </div>
  </div>
)

}

export default HeaderFireBase;
