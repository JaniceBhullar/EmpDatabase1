import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { UserData } from "../../../App";

type MedDetailsProps = {
  empDb: UserData[];
};

export default function MedicalDetails({ empDb }: MedDetailsProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td scope="col">ID</td>
            <td scope="col">Image</td>
            <td scope="col">Name</td>
            <td scope="col">Age</td>
            <td scope="col">Salary</td>
            <td scope="col">Dependents</td>
            <td scope="col">Policy</td>
            <td scope="col">Max Claim</td>
            <td scope="col">Claimed Amount</td>
            <td scope="col">Balance</td>
            <td scope="col" colSpan={2}>
              Action
            </td>
          </tr>
        </thead>
        <tbody>
          {empDb.map((emp) => {
            const maxClaim =
              emp.salary > 0 && emp.salary <= 500000
                ? 1000000
                : emp.salary * 2.5;
            return (
              <tr key={emp.id}>
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
                  <td>{emp.firstName + "" + emp.lastName}</td>
                  <td>{emp.age}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.dependents}</td>
                  <td>{emp.policy}</td>
                  <td>{maxClaim}</td>
                  <td>{emp.claimedAmount}</td>
                  <td>{maxClaim - emp.claimedAmount}</td>

                  <td>
                    <BsFillTrashFill />
                  </td>
                  <td>
                    <BsFillPencilFill />
                  </td>
                </>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
