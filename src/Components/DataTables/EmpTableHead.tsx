import EmpTableContent from "./EmpTableContent";
import "./EmpTableHead.css";
import AddEmpModal from "./AddEmpModal";
import { type UserData } from "../../App";
import EmpTableEditable from "./EmpTableEditable";
import { Button } from "react-bootstrap";

export type EmpDataProps = {
  empDb: UserData[];
  newEmp: UserData;
  modalOpen: boolean;
  editData: UserData;
  editID: number;
  closeModal: () => void;
  setModalOpen: (value: boolean) => void;
  setEmpDb: (value: UserData[]) => void;
  onDelete: (id: number) => void;
  handleNewEmpInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewEmpSubmit: (e: React.SyntheticEvent<EventTarget>) => void;
  handleEditClick: (emp: UserData) => void;
  handleEmpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: () => void;
  handleCancelClick: () => void;
};

export default function EmpTableHead({
  empDb,
  newEmp,
  modalOpen,
  editData,
  editID,
  closeModal,
  setModalOpen,
  onDelete,
  handleNewEmpInput,
  handleNewEmpSubmit,
  handleEditClick,
  handleEmpChange,
  handleEditSubmit,
  handleCancelClick,
}: EmpDataProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td scope="col">ID</td>
            <td scope="col">Image</td>
            <td scope="col">First Name</td>
            <td scope="col">Last Name</td>
            <td scope="col">Email</td>
            <td scope="col">Contact Number</td>
            <td scope="col">Age</td>
            <td scope="col">DoB</td>
            <td scope="col">Salary</td>
            <td scope="col">Address</td>
            <td scope="col" colSpan={2}>
              Action
            </td>
          </tr>
        </thead>
        <tbody>
          {empDb.map((emp) => (
            <tr key={emp.id}>
              <>
                {editID === +emp.id ? (
                  <EmpTableEditable
                    emp={emp}
                    editData={editData}
                    handleEmpChange={handleEmpChange}
                    handleEditSubmit={handleEditSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <EmpTableContent
                    emp={emp}
                    onDelete={onDelete}
                    handleEditClick={handleEditClick}
                  />
                )}
              </>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Add
        </Button>
      </div>
      {modalOpen && (
        <AddEmpModal
          newEmp={newEmp}
          handleNewEmpInput={handleNewEmpInput}
          handleNewEmpSubmit={handleNewEmpSubmit}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
