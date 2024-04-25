import { type UserData } from "../../App";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

type EmpTableContentProps = {
  emp: UserData;
  onDelete: (id: number) => void;
  handleEditClick: (emp: UserData) => void;
};

export default function EmpTableContent({
  emp,
  onDelete,
  handleEditClick,
}: EmpTableContentProps) {
  return (
    <>
      <td>{emp.id}</td>
      <td>
        <div>
          <img
            src={emp.imgUrl}
            alt=""
            style={{ width: "45px", height: "45px" }}
          />
        </div>
      </td>
      <td>{emp.firstName}</td>
      <td>{emp.lastName}</td>
      <td>{emp.email}</td>
      <td>{emp.contactNumber}</td>
      <td>{emp.age}</td>
      <td>{emp.dob}</td>
      <td>{emp.salary}</td>
      <td>{emp.address}</td>
      <td>
        <BsFillTrashFill onClick={() => onDelete(+emp.id)} />
      </td>
      <td>
        <BsFillPencilFill onClick={() => handleEditClick(emp)} />
      </td>
    </>
  );
}
