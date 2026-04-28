'use client';

import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

interface ModalContextType {
  modalRef: React.RefObject<HTMLDivElement | null>;
  modalContent: React.ReactNode | null;
  setModalContent: (content: React.ReactNode) => void;
  setOnModalClose: (callback: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modalRef: { current: null },
  modalContent: null,
  setModalContent: () => {},
  setOnModalClose: () => {},
  closeModal: () => {}
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal" className='fixed inset-0 flex justify-center items-center'>
      <div 
        id="modal-background" 
        className='fixed inset-0 bg-modalBackground' 
        onClick={closeModal} 
      />
      <div id="modal-content" className='absolute bg-screenWhite border border-primary text-screenBlack rounded-2xl max-w-[90%]'>
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
