import { useModal } from '@/app/(_home)/_context/Modal';


export default function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  cssClasses
}: {
  modalComponent: React.ReactNode;
  buttonText: string | React.ReactNode;
  onButtonClick?: () => void;
  onModalClose?: () => void;
  cssClasses?: string;
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick} className={cssClasses}>{buttonText}</button>;
}

