import React, { useState } from 'react'
import InputForm from './InputForm'

function Header() {
  const [ users , setUsers ] = useState([]);
  const [ modifUsers , setModifUsers ] = useState(null)

const addUser = (newUser) => {
    if(!newUser.prenomInput || !newUser.nomInput || !newUser.emailInput || !newUser.telephoneInput ===""){
        alert("Veuillez remplir tous les champs.");
        return;
    }
  setUsers((prev) => {
    const updatedUsers = [...prev, newUser];
    return updatedUsers;
  })
     
  console.log(newUser);
};

const deleteUser = (id) => {
  setUsers((prev) => prev.filter((newUser) => newUser.id !== id));
};


const modifInfoUsers = (id) => {
  const userToModify = users.find((newUser) => newUser.id === id);
  console.log(modifUsers);
  
  setModifUsers(userToModify);
}

const updateUser = (updatedUser) => {
  setUsers((prev) => {
      const updatedUsers = prev.map((newUser) =>
          newUser.id === updatedUser.id ? updatedUser : newUser
      );
      console.log(updateUser);
      
      // localStorage.setItem("codeurs", JSON.stringify(updatedUsers));
      return updatedUsers;
  });
  setModifUsers(null); 
};

  return (
    <div className='container bg-white shadow'>
      <h1 className='text-center m-3'>CRUD ETUDIANT</h1>
        <div className="row justify-content-center">
            <div className="col-md-6">
           <div className='search' >
            <input className=" w-100" type="search" placeholder="Search..."/>
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
      
                 <InputForm addUser={addUser}
                  modifUsers={modifUsers}
                  setModifUsers={setModifUsers}
                  updateUser={updateUser}/>

       
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
                        {users.length > 0 &&
                        users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.prenomInput}</td>
                          <td>{user.nomInput}</td>
                          <td>{user.emailInput}</td>
                         <td>{user.telephoneInput}</td>
                         <td className="d-flex justify-content-center align-items-center gap-3">
                       <button  className="btn btn-warning btn-sm"><i className="fa-solid fa-eye"></i></button>

                        <button  className="btn btn-danger btn-sm"
                        onClick={() => modifInfoUsers(user.id)}
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                         <i className="fa-solid fa-pen-to-square"></i></button>

                        <button className="btn btn-success btn-sm"
                        onClick={() => deleteUser(user.id)}>
                        <i className="fa-solid fa-trash"></i></button>


                        <button className="btn btn-danger btn-sm"><i className="fa-solid fa-ban"></i></button>
                          </td>
                        </tr>
                     ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header