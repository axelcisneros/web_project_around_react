import { useState, useEffect } from 'react';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import api from '../utils/api.js';
import CurrentUserContext from '@contexts/CurrentUserContext.js';


function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  useEffect(() => {
    api.getInitialCards().then((cards) => setCards(cards)).catch(console.error);
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
  
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
  }

  async function handleCardDelete(cardId) {
    try {
      const isId = cardId._id;
      await api.removeCard(isId);
      
      setCards((state) => state.filter((card) => card._id !== isId));
    } catch (error) {
      console.error(error);
    }
  } 

  const handleUpdateUser = (name, about) => {
    (async () => {
      await api.setUserInfo(name, about).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.addCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  return (
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit}}>
      <div className='page'>
        <Header />
        <Main
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        popup={popup} 
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
