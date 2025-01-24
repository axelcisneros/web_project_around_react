import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <template id="main__template">
        <div className="main__gallery-card">
          <img className="main__gallery-image" />
          <button
            type="button"
            className="main__button main__button_trash"
          ></button>
          <div className="main__gallery-content">
            <p className="main__gallery-paragraph"></p>
            <button
              type="button"
              className="main__button main__button_like"
            ></button>
          </div>
        </div>
      </template>      
    </>
  )
}

export default App
