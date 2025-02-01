import { useState, useContext } from 'react';
import CurrentUserContext from '@contexts/CurrentUserContext';

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser } = userContext;
  

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  
  const handleNameChange = (e) => {
    setName(e.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (e) => {
    setAbout(e.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    await handleUpdateUser( name, about ); // Actualiza la información del usuario
  };

    return (
        <form className="popup__form form-edit" noValidate onSubmit={handleSubmit}>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="text"
                  className="popup__input popup__input_name"
                  placeholder="Nombre"
                  minLength="2"
                  maxLength="40"
                  id="name-input"
                  value={name}
                  onChange={handleNameChange}
                  name="userName"
                  required
                />
                <span className="popup__input-error name-input-error"></span>
              </label>
              <label className="popup__field">
                <input
                  type="text"
                  className="popup__input popup__input_about"
                  placeholder="Acerca de mi"
                  minLength="2"
                  maxLength="200"
                  id="about-input"
                  value={about}
                  onChange={handleDescriptionChange}
                  name="userAbout"
                  required
                />
                <span className="popup__input-error about-input-error"></span>
              </label>
              <button
              type="submit"
              className="popup__button popup__button_save"
              >
                Guardar
              </button>
            </fieldset>
        </form>
    );
}