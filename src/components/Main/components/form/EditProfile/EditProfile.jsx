export default function EditProfile() {
    return (
        <form className="popup__form form-edit" noValidate>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="text"
                  className="popup__input popup__input_name"
                  placeholder="Nombre"
                  minLength="2"
                  maxLength="40"
                  id="name-input"
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