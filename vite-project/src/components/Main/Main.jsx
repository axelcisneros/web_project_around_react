import perfil from '../../assets/images/logo-yo.svg';

function Main() {
    return (
        <main className="main">
            <div className="main__profile">
                <div className="main__content-image">
                    <img src={perfil} alt="profile-image" className="main__profile-image" />
                    <button type="button" className="main__button main__button_img">
                        &#x1F58C;
                    </button>
                </div>
                <div className="main__content-paragraph">
                    <p className="main__paragraph main__paragraph_name">Axel Cisneros</p>
                    <p className="main__paragraph main__paragraph_job">Estudiante</p>
                    <button type="button" className="main__button main__button_edit">
                    &#x1F58C;
                    </button>
                </div>
                <button type="button" className="main__button main__button_add">
                &#x1F7A3;
                </button>
            </div>
            <div className="main__gallery"></div>
        </main>
    );
}

export default Main;