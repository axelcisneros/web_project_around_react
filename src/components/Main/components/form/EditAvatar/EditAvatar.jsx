import { useState, useContext, useRef, useEffect } from 'react';
import CurrentUserContext from '@contexts/CurrentUserContext';
import useFormValidation from '@utils/useFormValidation.js';

export default function EditAvatar(props) {
  const { validationConfig } = props;
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { handleUpdateAvatar, isLoading } = userContext;
  const refAvatar = useRef(); // Crea una referencia
  const [avatar, setAvatar] = useState(""); // Crea el estado para el avatar  
  const formRef = useRef(null);
  const { resetValidation } = useFormValidation(validationConfig, formRef);

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value); // Actualiza avatar cuando cambie la entrada
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    handleUpdateAvatar({
      avatar: refAvatar.current.value// El valor de la entrada que obtuvimos utilizando la ref  ,
    });
  }

    return (
        <form className="popup__form" noValidate onSubmit={handleSubmit} ref={formRef}>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="url"
                  className="popup__input"
                  placeholder="URL a la imagen"
                  id="i-url-input"
                  ref={refAvatar} // Vincula la referencia al campo de entrada
                  onChange={handleAvatarChange}
                  value={avatar} // Establece el valor de la entrada
                  name="userAvatar"
                  required
                />
                <span className="popup__input-error i-url-input-error"></span>
              </label>
              <button
              type="submit"
              className="popup__button popup__button_img"
              >
                {isLoading ? "Guardando.." : "Guardar"}
              </button>
            </fieldset>
          </form>
    );
}