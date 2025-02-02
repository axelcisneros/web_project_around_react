import { useState, useContext, useRef, useEffect } from 'react';
import CurrentUserContext from '@contexts/CurrentUserContext';
import useFormValidation from '@utils/useFormValidation.js';

export default function EditProfile(props) {
  const { validationConfig } = props;
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser, isLoading } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const formRef = useRef(null);
  const { resetValidation } = useFormValidation(validationConfig, formRef);

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);
  
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
        <form className="popup__form" noValidate onSubmit={handleSubmit} ref={formRef}>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="text"
                  className="popup__input"
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
                  className="popup__input"
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
                {isLoading ? "Guardando.." : "Guardar"}
              </button>
            </fieldset>
        </form>
    );
}