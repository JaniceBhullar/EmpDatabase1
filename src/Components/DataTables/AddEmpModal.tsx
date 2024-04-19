import "./AddEmpModal.css";
import { type UserData } from "../../App";
import { Button, Modal } from "react-bootstrap";

type ModalProps = {
  empDb: UserData[];
  closeModal: () => void;
  newEmp: UserData;
  handleSubmit: (newEmp: UserData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (e: React.SyntheticEvent<EventTarget>) => void;
};

export default function AddEmpModal({
  empDb,
  closeModal,
  handleInputChange,
  newEmp,
  handleSubmitForm,
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
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  name="id"
                  id="id"
                  type="readOnly"
                  value={Math.max(...empDb.map((emp) => emp.id)) + 1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imgUrl">Image URL</label>
                <input
                  name="imgUrl"
                  id="imgUrl"
                  type="text"
                  value={newEmp.imgUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  value={newEmp.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={newEmp.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={newEmp.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Contact Number</label>
                <input
                  name="contactNumber"
                  id="number"
                  type="text"
                  value={newEmp.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  name="age"
                  id="age"
                  type="text"
                  value={newEmp.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">DoB</label>
                <input
                  name="dob"
                  id="dob"
                  type="text"
                  value={newEmp.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  name="salary"
                  id="salary"
                  type="text"
                  value={newEmp.salary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  id="address"
                  type="text"
                  value={newEmp.address}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleSubmitForm}>
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
