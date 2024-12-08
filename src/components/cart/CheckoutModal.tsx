import MyModal from "@components/MyModal";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  handleOk: (params: { textArea: string }) => void;
  handleCancel: () => void;
  textHolderArea?: string;
  textConfirm?: string;
  textBtnOk?: string;
  textBtnCancel?: string;
}

export default function CheckoutModal({ children, ...props }: Props) {
  return <MyModal {...props} body={children} />;
}
