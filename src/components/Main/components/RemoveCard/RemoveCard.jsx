import { useContext } from 'react';
import CurrentUserContext from '@contexts/CurrentUserContext';

export default function RemoveCard(props) {
  const { onCardDelete } = props;
  const { _id } = props.card;
  const deleteContext = useContext(CurrentUserContext);
  const {isLoading} = deleteContext;

  async function handleDeleteClick(cardId) {
    try {
        await onCardDelete(cardId);
    } catch (error) {
        console.log(error);
}
}

    return (
        <div className="popup__trash">
            <button type="button" className="popup__button popup__button_trash" onClick={() => handleDeleteClick(_id)}>
              {isLoading ? "Borrando.." : "Sí"}
            </button>
          </div>
    )
}