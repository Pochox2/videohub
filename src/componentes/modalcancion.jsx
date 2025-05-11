import Modal from 'react-modal';
import 'lite-youtube-embed';

Modal.setAppElement('#root');

const ModalPlayer = ({ videoId, onClose }) => {
  return (
    <Modal
      isOpen={!!videoId}
      onRequestClose={onClose}
      contentLabel="Reproductor"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <lite-youtube
        videoid={videoId}
        class="youtube-embed"
      ></lite-youtube>

      <button className="close-button" onClick={onClose}>
        Cerrar
      </button>
    </Modal>
  );
};

export default ModalPlayer;