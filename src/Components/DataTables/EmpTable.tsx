import { type UserData } from "../../App";
import EmpTableHead from "./EmpTableHead";

export type EmpTableProps = {
  empDb: UserData[];
  newEmp: UserData;
  editData: UserData;
  modalOpen: boolean;
  editID: number;
  setEmpDb: (value: UserData[]) => void;
  onDelete: (id: number) => void;
  handleSubmit: (newEmp: UserData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (e: React.SyntheticEvent<EventTarget>) => void;
  closeModal: () => void;
  setModalOpen: (value: boolean) => void;
  handleEditClick: (emp: UserData) => void;
  handleEmpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: () => void;
  handleCancelClick: () => void;
};

export default function EmpTable({
  empDb,
  newEmp,
  editData,
  editID,
  setEmpDb,
  onDelete,
  handleSubmit,
  handleInputChange,
  handleSubmitForm,
  modalOpen,
  setModalOpen,
  closeModal,
  handleEditClick,
  handleEmpChange,
  handleEditSubmit,
  handleCancelClick,
}: EmpTableProps) {
  return (
    <>
      {empDb.length ? (
        <EmpTableHead
          empDb={empDb}
          newEmp={newEmp}
          editData={editData}
          editID={editID}
          setEmpDb={setEmpDb}
          onDelete={onDelete}
          modalOpen={modalOpen}
          closeModal={closeModal}
          setModalOpen={setModalOpen}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSubmitForm={handleSubmitForm}
          handleEditClick={handleEditClick}
          handleEmpChange={handleEmpChange}
          handleEditSubmit={handleEditSubmit}
          handleCancelClick={handleCancelClick}
        />
      ) : (
        <p> No Data Found !!! </p>
      )}
    </>
  );
}
