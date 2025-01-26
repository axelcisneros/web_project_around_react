import { useState } from 'react';
import Popup from '../Main/components/Popup/Popup.jsx';
import NewCard from '../Main/components/form/NewCard/NewCard.jsx';
import EditProfile from '../Main/components/form/EditProfile/EditProfile.jsx';
import EditAvatar from '../Main/components/form/EditAvatar/EditAvatar.jsx';
import Card from '../Main/components/Card/Card.jsx';
import ImagePopup from '../Main/components/ImagePopup/ImagePopup.jsx';
import perfil from '@assets/images/logo-yo.svg';

const cards = [
    {
      isLiked: false,
      _id: '5d1f0611d321eb4bdcd707dd',
      name: 'Yosemite Valley',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
      owner: '5d1f0611d321eb4bdcd707dd',
      createdAt: '2019-07-05T08:10:57.741Z',
    },
    {
      isLiked: false,
      _id: '5d1f064ed321eb4bdcd707de',
      name: 'Lake Louise',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
      owner: '5d1f0611d321eb4bdcd707dd',
      createdAt: '2019-07-05T08:11:58.324Z',
    },
  ];

function Main() {
    const [popup, setPopup] = useState(null);
    const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
    const editProfolePopup = { title: "Nuevo lugar", children: <EditProfile /> };
    const editAvatarPopup = { title: "Nuevo lugar", children: <EditAvatar /> };

    function handleOpenPopup(popup) {
        setPopup(popup);
    }

    function handleClosePopup() {
        setPopup(null);
    }

    function handleCardClick(card) {
        setPopup({ children: <ImagePopup card={card} /> });
    }

    return (
        <main className="main">
            <div className="main__profile">
                <div className="main__content-image">
                    <img src={perfil}
                    alt="profile-image"
                    className="main__profile-image"
                    />
                    <button 
                    type="button"
                    className="main__button main__button_img"
                    onClick={() => handleOpenPopup(editAvatarPopup)}
                    >
                        &#x1F58C;
                    </button>
                </div>
                <div className="main__content-paragraph">
                    <p className="main__paragraph main__paragraph_name">Axel Cisneros</p>
                    <p className="main__paragraph main__paragraph_job">Estudiante</p>
                    <button
                    type="button"
                    className="main__button main__button_edit"
                    onClick={() => handleOpenPopup(editProfolePopup)}
                    >
                    &#x1F58C;
                    </button>
                </div>
                <button
                aria-label="Add card" 
                type="button" 
                className="main__button main__button_add" 
                onClick={() => handleOpenPopup(newCardPopup)}>
                &#x1F7A3;
                </button>
            </div>
            <ul className="main__gallery">
                {cards.map((card) => (
                    <Card
                    key={card._id}
                    card={card}
                    handleCardClick={handleCardClick}
                    />
                ))}
            </ul>
            {popup && (
                <Popup onClose={handleClosePopup} title={popup.title}>
                {popup.children}
            </Popup>
        )}
        </main>
    );
}

export default Main;