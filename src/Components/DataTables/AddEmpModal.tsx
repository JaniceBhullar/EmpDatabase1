import "./AddEmpModal.css";
import { type UserData } from "../../App";
import { Button, Modal } from "react-bootstrap";

type ModalProps = {
  closeModal: () => void;
  newEmp: UserData;
  handleNewEmpInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewEmpSubmit: (e: React.SyntheticEvent<EventTarget>) => void;
};

export default function AddEmpModal({
  closeModal,
  handleNewEmpInput,
  newEmp,
  handleNewEmpSubmit,
}: ModalProps) {
  return (
    <>
      <div
        className="modal"
        style={{ display: "block", position: "initial" }}
        onClick={(e) => {
          if (e.target instanceof HTMLDivElement) {
            closeModal();
          }
        }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              {/* <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  name="id"
                  id="id"
                  type="readOnly"
                  value={currMaxID + 1}
                  onChange={handleNewEmpInput}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="imgUrl">Image URL</label>
                <input
                  name="imgUrl"
                  id="imgUrl"
                  type="text"
                  value={newEmp.imgUrl}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  value={newEmp.firstName}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={newEmp.lastName}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={newEmp.email}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Contact Number</label>
                <input
                  name="contactNumber"
                  id="number"
                  type="text"
                  value={newEmp.contactNumber}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  name="age"
                  id="age"
                  type="text"
                  value={newEmp.age}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">DoB</label>
                <input
                  name="dob"
                  id="dob"
                  type="text"
                  value={newEmp.dob}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  name="salary"
                  id="salary"
                  type="text"
                  value={newEmp.salary}
                  onChange={handleNewEmpInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  id="address"
                  type="text"
                  value={newEmp.address}
                  onChange={handleNewEmpInput}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleNewEmpSubmit}
            >
              Submit
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}
