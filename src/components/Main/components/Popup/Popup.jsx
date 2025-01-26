export default function Popup (props) {
    const { onClose, title, children } = props;
    return (
        <div className="popup">
        <div 
          className="popup__container"
          >
          <button 
          aria-label="Close modal"
          type="button"
          className="popup__button popup__button_close"
          onClick={onClose}
          />
          {title && <h3 className="popup__subtitle">{title}</h3>}
          {children}
        </div>
      </div>
    )
}