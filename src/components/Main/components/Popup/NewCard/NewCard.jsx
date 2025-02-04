import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CurrentUserContext from '@contexts/CurrentUserContext';
import errorMessages from '@utils/errorMessages'; // Importa el objeto de mensajes de error

export default function NewCard(props) {
  const { validationConfig: config } = props;
  const userContext = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit, isLoading } = userContext;
  const [disabled, setDisabled] = useState(true);
  const [touchedFields, setTouchedFields] = useState({ cardTitle: false, cardLink: false });
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isValid }, trigger } = useForm({
    defaultValues: {
      cardTitle: '',
      cardLink: '',
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
    handleAddPlaceSubmit({ name: data.cardTitle, link: data.cardLink});
  };

  const handleValidation = (e) => {
    const input = e.target;
    const value = input.value.trim();
    let errorMessage = '';

    // Actualiza el campo como tocado
    setTouchedFields((prev) => ({ ...prev, [input.name]: true }));

    if (!value) {
      errorMessage = errorMessages.required;
    } else if (input.type === 'url' && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value)) {
      errorMessage = errorMessages.url;
    } else if (value.length < 2) {
      errorMessage = errorMessages.minLength;
    } else if (value.length > 30) {
      errorMessage = errorMessages.maxLength;
    }

    if (errorMessage) {
      setError(input.name, {
        type: 'manual',
        message: errorMessage,
      });
    } else {
      clearErrors(input.name);
    }
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit(onSubmit)} >
      <fieldset className="popup__content">
        <label className="popup__field popup__field_top">
          <input
            type="text"
            className={`popup__input ${errors.cardTitle ? config.inputErrorClass : ''}`}
            placeholder="Titulo"
            id="title-input"
            {...register('cardTitle', { 
              required: 'Este campo es obligatorio.',
              minLength: { value: 2, message: 'El texto es demasiado corto.' },
              maxLength: { value: 30, message: 'El texto es demasiado largo.' },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {touchedFields.cardTitle && errors.cardTitle && <span className={`popup__input-error ${config.errorClass}`}>{errors.cardTitle.message}</span>}
        </label>
        <label className="popup__field">
          <input
            type="url"
            className={`popup__input ${errors.cardLink ? config.inputErrorClass : ''}`}
            placeholder="URL a la imagen"
            id="url-input"
            {...register('cardLink', {
              required: 'Este campo es obligatorio.',
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'La URL no es válida.',
              },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {touchedFields.cardLink && errors.cardLink && <span className={`popup__input-error ${config.errorClass}`}>{errors.cardLink.message}</span>}
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
