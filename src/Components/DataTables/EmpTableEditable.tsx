import { UserData } from "../../App";

type EmpEditableProps = {
  emp: UserData;
  editData: UserData;
  handleEmpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: (e: React.SyntheticEvent<EventTarget>) => void;
  handleCancelClick: () => void;
};

export default function EmpTableEditable({
  emp,
  editData,
  handleEmpChange,
  handleEditSubmit,
  handleCancelClick,
}: EmpEditableProps) {
  return (
    <>
      <td>{emp.id}</td>
      <td>
        <input
          type="text"
          name="imgUrl"
          value={editData.imgUrl}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="firstName"
          value={editData.firstName}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          value={editData.lastName}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          value={editData.email}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="contactNumber"
          value={editData.contactNumber}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="age"
          value={editData.age}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="dob"
          value={editData.dob}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="salary"
          value={editData.salary}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          value={editData.address}
          onChange={handleEmpChange}
        />
      </td>
      <td>
        <button type="submit" onClick={handleEditSubmit}>
          Save
        </button>
      </td>
      <td>
        <button onClick={handleCancelClick}>Cancel</button>
      </td>
    </>
  );
}
