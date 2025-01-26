export default function EditAvatar() {
    return (
        <form className="popup__form form-img" noValidate>
            <fieldset className="popup__content">
              <label className="popup__field popup__field_top">
                <input
                  type="url"
                  className="popup__input popup__input_img"
                  placeholder="URL a la imagen"
                  id="i-url-input"
                  required
                />
                <span className="popup__input-error i-url-input-error"></span>
              </label>
              <button
              type="submit"
              className="popup__button popup__button_img"
              >
                Guardar
              </button>
            </fieldset>
          </form>
    );
}