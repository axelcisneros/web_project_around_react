import { useState, useContext, useRef, useEffect } from 'react';
import CurrentUserContext from '@contexts/CurrentUserContext';
import useFormValidation from '@utils/useFormValidation.js';


export default function NewCard(props) {
  const { validationConfig } = props;
  const onAddPlace = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = onAddPlace;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const formRef = useRef(null);
  const { resetValidation } = useFormValidation(validationConfig, formRef);

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddPlaceSubmit({ name, link });
    resetValidation();
  };
    return (
        <form className="popup__form" noValidate onSubmit={handleSubmit} ref={formRef}>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="text"
                  className="popup__input popup__input_title"
                  placeholder="Titulo"
                  minLength="2"
                  maxLength="30"
                  id="title-input"
                  name="cardName"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <span className="popup__input-error title-input-error" ></span>
              </label>
              <label className="popup__field">
                <input
                  type="url"
                  className="popup__input popup__input_url"
                  placeholder="URL a la imagen"
                  id="url-input"
                  name="cardLink"
                  value={link}
                  onChange={handleLinkChange}
                  required
                />
                <span className="popup__input-error url-input-error" ></span>
              </label>
              <button
              type="submit"
              className="popup__button popup__button_add"
              >
                Guardar
              </button>
            </fieldset>
        </form>
    );
}