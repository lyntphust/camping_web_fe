import { Button, Checkbox, Input, Modal, Row, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../styles/MyModal.scss";

function MyModal({
  showModal,
  setShowModal,
  textConfirm,
  textBtnOk,
  textCheckbox,
  textArea,
  rowsArea,
  textBtnCancel,
  textHolderArea,
  setValueArea,
  handleOk,
  handleCancel,
  customClass,
  dataConfirm,
  children,
  body,
  defaultValue = "",
  isEditArea,
  loading,
  icon,
  inputType,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  textConfirm?: string;
  textBtnOk?: string;
  textCheckbox?: string;
  textArea?: string;
  rowsArea?: number;
  textBtnCancel?: string;
  textHolderArea?: string;
  setValueArea?: (value: string) => void;
  handleOk: (params: { textArea: string }) => void;
  handleCancel: () => void;
  customClass?: string;
  dataConfirm?: string | React.ReactElement;
  children?: React.ReactNode;
  body?: React.ReactNode;
  defaultValue?: string;
  isEditArea?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  inputType?: string;
}) {
  const [checked, setChecked] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const onClickOk = () => {
    if (typeof handleOk === "function") {
      handleOk({ textArea: textAreaValue });
    }
  };

  const onClickCancel = () => {
    if (typeof handleCancel === "function") {
      handleCancel();
    }
  };

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value);
  };

  return (
    showModal && (
      <Modal
        open={showModal}
        footer={null}
        onOk={onClickOk}
        onCancel={onClickCancel}
        closable={false}
        className="modal-confirm"
        wrapClassName={customClass}
      >
        {loading ? (
          <Spin className="spin" />
        ) : (
          <>
            {children || (
              <>
                <h1 className={textHolderArea ? "text-left" : ""}>
                  {textConfirm}
                </h1>
                {dataConfirm && (
                  <div className="modal-confirm-text">{dataConfirm}</div>
                )}
                {textHolderArea && (
                  <div className="modal-note-text">{textHolderArea}</div>
                )}
                <Row
                  gutter={[8, 8]}
                  align="middle"
                  justify="center"
                  className="flex-column group-btn"
                >
                  {textArea && (
                    <Input
                      placeholder={textArea}
                      className="mb-5 text-area"
                      value={textAreaValue}
                      readOnly={!isEditArea}
                      type={inputType}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleTextAreaChange(e)
                      }
                    />
                  )}
                  {body}
                  {textCheckbox && (
                    <Checkbox checked={checked} onChange={toggleCheck}>
                      {textCheckbox}
                    </Checkbox>
                  )}
                  {icon && <div>{icon}</div>}
                  {textBtnOk && (
                    <Button
                      type="primary"
                      disabled={!!textCheckbox && !checked}
                      shape="round"
                      onClick={onClickOk}
                    >
                      {textBtnOk}
                    </Button>
                  )}
                  <Button type="default" shape="round" onClick={onClickCancel}>
                    {textBtnCancel || "Close"}
                  </Button>
                </Row>
              </>
            )}
          </>
        )}
      </Modal>
    )
  );
}

export default MyModal;

MyModal.propTypes = {
  textConfirm: PropTypes.string,
  textBtnOk: PropTypes.string,
  textBtnCancel: PropTypes.string,
  textCheckbox: PropTypes.string,
  textHolderArea: PropTypes.string,
  textArea: PropTypes.string,
  rowsArea: PropTypes.number,
  setValueArea: PropTypes.func,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  customClass: PropTypes.string,
  dataConfirm: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.any,
  body: PropTypes.any,
  defaultValue: PropTypes.string,
  isEditArea: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.any,
  inputType: PropTypes.string,
};
