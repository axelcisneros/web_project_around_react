export default function RemoveCard(props) {
  const { onCardDelete } = props;
  const { _id } = props.card;

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
              S&#x00ED;
            </button>
          </div>
    )
}