import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CurrentUserContext from '@contexts/CurrentUserContext';
import errorMessages from '@utils/errorMessages'; // Importa el objeto de mensajes de error

export default function EditProfile(props) {
  const { validationConfig: config } = props;
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser, isLoading } = userContext;
  const [disabled, setDisabled] = useState(true);
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isValid }, trigger } = useForm({
    defaultValues: {
      userName: currentUser.name,
      userAbout: currentUser.about,
    },
    mode: 'onChange', // Cambia el modo a onChange para validar en tiempo real
  });

  useEffect(() => {
    trigger(); // Valida todos los campos para actualizar errores
  }, [trigger]);

  useEffect(() => {
    setDisabled(!isValid); // Deshabilitar el botón si el formulario no es válido
  }, [isValid]);

  const watchedValues = watch(); // Observa todos los valores de los inputs

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = Object.values(watchedValues).some(value => value.trim() === '');

    // Actualiza el estado disabled
    setDisabled(hasErrors || hasEmptyFields);
  }, [errors, watchedValues]);

  const onSubmit = (data) => {
    // Llamar a handleUpdateUser con los datos del formulario
    handleUpdateUser(data.userName, data.userAbout);
  };

  const handleValidation = (e) => {
    const input = e.target;
    input.setCustomValidity('');

    if (!input.checkValidity()) {
      const validityState = input.validity;
      let errorMessage = '';

      if (validityState.valueMissing) {
        errorMessage = errorMessages.required;
      } else if (validityState.tooShort) {
        errorMessage = errorMessages.minLength;
      } else if (validityState.tooLong) {
        errorMessage = errorMessages.maxLength;
      } else if (validityState.typeMismatch && input.type === 'url') {
        errorMessage = errorMessages.url;
      }

      input.setCustomValidity(errorMessage);
      setError(input.name, {
        type: 'manual',
        message: errorMessage,
      });
    } else {
      input.setCustomValidity(''); // Limpiar el mensaje de validación
      clearErrors(input.name);
    }

    input.reportValidity(); // Mostrar el mensaje de error del navegador
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="popup__content">
        <label className="popup__field popup__field_top">
          <input
            type="text"
            className={`popup__input ${errors.userName ? config.inputErrorClass : ''}`}
            placeholder="Nombre"
            id="name-input"
            {...register('userName', { 
              required: 'Este campo es obligatorio.',
              minLength: { value: 2, message: 'El texto es demasiado corto.' },
              maxLength: { value: 40, message: 'El texto es demasiado largo.' },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {errors.userName && <span className={`popup__input-error ${config.errorClass}`}>{errors.userName.message}</span>}
        </label>
        <label className="popup__field">
          <input
            type="text"
            className={`popup__input ${errors.userAbout ? config.inputErrorClass : ''}`}
            placeholder="Acerca de mí"
            id="about-input"
            {...register('userAbout', { 
              required: 'Este campo es obligatorio.',
              minLength: { value: 2, message: 'El texto es demasiado corto.' },
              maxLength: { value: 200, message: 'El texto es demasiado largo.' },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {errors.userAbout && <span className={`popup__input-error ${config.errorClass}`}>{errors.userAbout.message}</span>}
        </label>
        <button
          type="submit"
          className={`popup__button ${disabled ? config.inactiveButtonClass : ''}`}
          disabled={disabled}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </fieldset>
    </form>
  );
}
