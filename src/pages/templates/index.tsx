import templateAPI from "../../apis/templates.api";
import MainLayout from "../../components/layout/MainLayout";
import GetTemplate from "../templates/getList";
import ModalTemplate from "../templates/modal.template";
import React, { Fragment, useState } from "react";
import { Button } from "antd";
function Template() {
  const inputRef = React.useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        Add new template
      </Button>
      <ModalTemplate
        isEdit={isEdit}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <GetTemplate />
    </MainLayout>
  );
}

export default Template;
