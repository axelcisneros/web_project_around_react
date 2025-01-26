import { useState } from "react";

export default function Card(props) {
    const { name, link } = props.card;
    const [isLiked, setIsLiked]  = useState(props.card.isLiked);
    const { handleCardClick } = props;
    const imageComponent = {
        name,
        link
    };

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    return ( 
        <li className="main__gallery-card">
          <img
          className="main__gallery-image"
          src={link}
          alt={name}
          onClick={() => handleCardClick(imageComponent)}
          />
          <button
            aria-label="Delete card"
            type="button"
            className="main__button main__button_trash"
          />
          <div className="main__gallery-content">
            <p className="main__gallery-paragraph">{name}</p>
            <button
              aria-label="Like card"
              type="button"
              className={`main__button main__button_like ${isLiked ? "main__button_like_active" : ""}`}
              onClick={handleLikeClick}
            />
          </div>
        </li>
    )
}