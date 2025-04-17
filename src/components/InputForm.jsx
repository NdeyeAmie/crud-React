import React, { useEffect, useState } from 'react'
import { collection , addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { updateUserInFirebase } from './FirebaseService'; 
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';


function InputForm({ refreshUsers,  modifUsers, setModifUsers , setUsers}) {
    const [ prenomInput , setPrenomInput ] = useState("");
    const [ nomInput , setNomInput ] = useState("");
    const [ emailInput , setEmailInput ] = useState("");
    const [ telephoneInput , setTelephoneInput ] = useState("");


    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!prenomInput || !nomInput || !emailInput || !telephoneInput) {
            toast.success("Veuillez remplir tous les champs.");
            return;
        }
    
        const newUser = {
            prenomInput,
            nomInput,
            emailInput,
            telephoneInput,
            createdAt: serverTimestamp(),
        };
    
        try {
            if (modifUsers) {
                await updateUserInFirebase(modifUsers.id, newUser);
                toast.success("Utilisateur modifie :", newUser);
                console.log(newUser);
                
            } else {
                const docRef = await addDoc(collection(db, "users"), newUser);
               const userWithId = { id: docRef.id, ...newUser };
                setUsers(prevUsers => [userWithId, ...prevUsers]);
                toast.success("Utilisateur ajoute :", newUser);
                console.log(newUser);
                // toast.error("Une erreur s'est produite", "danger");
            }
    
             refreshUsers(); 
            setPrenomInput("");
            setNomInput("");
            setEmailInput("");
            setTelephoneInput("");
            setModifUsers(null);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    useEffect(() => {
        if (modifUsers) {
            setPrenomInput(modifUsers.prenomInput);
            setNomInput(modifUsers.nomInput);
            setEmailInput(modifUsers.emailInput);
            setTelephoneInput(modifUsers.telephoneInput);
        }
    }, [modifUsers]);



  return (
    <>
   
    <form id="form" onSubmit={handleSubmit} className="shadow p-3 mx-auto my-3">
            <div className="mb-3 d-sm-flex">
                <div>
                    <label className="form-label">Prenom</label>
                    <input type="text" pattern="[A-Za-z\s]+" title="Lettres uniquement" className="form-control" name='prenomInput' id="prenomInput"
                     value={prenomInput} 
                     onChange={(e) => {
                      const value = e.target.value
                      if (/^[A-Za-z\s]*$/.test(value)) {
                      setPrenomInput(value) 
                      }   
                     }}/>
                </div>
                <div className="ms-sm-3">
                    <label  className="form-label">Nom</label>
                    <input type="text" pattern="[A-Za-z\s]+" title="Lettres uniquement" className="form-control" name='nomInput' id="nomInput"
                    value={nomInput} 
                    onChange={(e) => {
                     const value = e.target.value
                     if (/^[A-Za-z\s]*$/.test(value)) {
                        setNomInput(value);
                      }   
                    }}  />
                </div>
            </div>
            <div className="mb-3 d-sm-flex">
                <div>
                    <label  className="form-label">Email</label>
                    <input  type="email" className="form-control" name='emailInput' id="emailInput"
                     value={emailInput} 
                     onChange={(e) => {
                      setEmailInput(e.target.value)    
                     }}/>
                </div>
                <div className="ms-sm-3">
                    <label  className="form-label">Telephone</label>
                    <input type='number' className="form-control" name='telephoneInput' id="telephoneInput"
                     value={telephoneInput} 
                     onChange={(e) => {
                    const value = e.target.value
                    if(/^\d{0,9}$/.test(value)){
                        setTelephoneInput(value)    
                    }
                     }}
                     />
                </div>
            </div>
            {modifUsers == null ? (
            <button  className="btn btn-ajout w-100"  data-bs-dismiss="modal">
                Ajouter</button>
                ) : (
            <button id="submit" type="submit" className="btn btn-success  w-100"  data-bs-dismiss="modal">
                Modifier</button>
                )}

        </form>
        </>
  )
}

export default InputForm