import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
// interface IUser {
//   modal: boolean;
// }
// Modal.setAppElement("#div");

export const ExampleApp = () => {
  const [modal, setModal] = useState<any>(false);
  // constructor () {
  //   super();
  //   this.state = {
  //     showModal: false
  //   };

  //   this.handleOpenModal = this.handleOpenModal.bind(this);
  //   this.handleCloseModal = this.handleCloseModal.bind(this);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    //   this.setState({ showModal: false });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Trigger Modal</button>
      <Modal isOpen={modal} contentLabel="Minimal Modal Example">
        <button onClick={handleCloseModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

const props = {};

ReactDOM.render(<ExampleApp {...props} />, document.getElementById("main"));
