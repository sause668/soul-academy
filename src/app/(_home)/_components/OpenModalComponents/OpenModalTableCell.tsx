import { useModal } from '@/app/(_home)/_context/Modal';

export default function OpenModalTableCell({
  modalComponent, // component to render inside the modal
  cellText, // text of the cell that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  cssClasses
}: {
  modalComponent: React.ReactNode;
  cellText: string | React.ReactNode;
  onButtonClick?: () => void;
  onModalClose?: () => void;
  cssClasses?: string;
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (e) e.preventDefault();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <td onClick={onClick} className={cssClasses}>{cellText}</td>;
}
