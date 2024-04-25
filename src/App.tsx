import { useEffect, useState } from "react";
import EmpTable from "./Components/DataTables/EmpTable";
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/Footer";
import { Container } from "react-bootstrap";
import "../bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
// import Missing from "./Components/Missing";
import NavBar from "./Components/UI/NavBar";
import { AxiosResponse } from "axios";
import client from "./api/client";
import MedicalDetails from "./Components/DataTables/Medical/MedicalDetails";
import Bonus from "./Components/DataTables/Bonus";

export type UserData = {
  id: number;
  imgUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
  age: number;
  dob: string;
  salary: number;
  address: string;
  dependents: number;
  policy: string;
  claimedAmount: number;
};

// export interface ApiError {
//   message: string;
//   description: string;
//   statusCode: string | number;
// }

// type CRUDOptions = {
//   method: string;
//   headers: object;
//   body: unknown;
// };

// const API_URL = "http://localhost:8000/data";

function App() {
  const [empDb, setEmpDb] = useState<UserData[]>([]);
  const [newEmp, setNewEmp] = useState<UserData>({
    id: 0,
    imgUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: 0,
    age: 0,
    dob: "",
    salary: 0,
    address: "",
    dependents: 0,
    policy: "",
    claimedAmount: 0,
  });
  // const [fetchError, setFetchError] = useState<ApiError | string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editID, setEditID] = useState<number>(-1);
  const [editData, setEditData] = useState({
    id: 0,
    imgUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: 0,
    age: 0,
    dob: "",
    salary: 0,
    address: "",
    dependents: 0,
    policy: "",
    claimedAmount: 0,
  });

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/data");
        // if (!response.ok) throw Error("No response received");
        setEmpDb(response.data);
        setIsLoading(false);
        setFetchError(null);
      } catch (err) {
        // setFetchError(err.message);
        const error =
          err.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setFetchError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchData())();
    }, 2000);
    fetchData();
  }, []);

  const validateForm = () => {
    if (newEmp.firstName && newEmp.lastName) {
      return true;
    }
  };

  const handleNewEmpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewEmp({
      ...newEmp,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleNewEmpSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!validateForm()) return;
    // handleSubmit(newEmp);
    // const postOptions: CRUDOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newEmp),
    // };
    // const result = await apiRequest(API_URL, postOptions);

    const currMaxID = Math.max(...empDb.map((emp) => emp.id).sort()) + 1;
    const newEmployee = { ...newEmp, id: currMaxID };

    try {
      const response: AxiosResponse = await client.post("/data", newEmployee);
      const allEmp = [...empDb, response.data];
      setEmpDb(allEmp);
      setFetchError(null);
      setNewEmp({
        id: 0,
        imgUrl: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: 0,
        age: 0,
        dob: "",
        salary: 0,
        address: "",
        dependents: 0,
        policy: "",
        claimedAmount: 0,
      });
    } catch (err) {
      setFetchError(err.message);
    }
    closeModal();
  };

  const handleDeleteEmp = (targetId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee"
    );
    const newEmp = [...empDb];
    const index = newEmp.findIndex((emp) => emp.id === targetId);
    newEmp.splice(index, 1);

    if (confirmed) setEmpDb(newEmp);
  };

  // async function handleDeleteEmp(targetId: number) {

  //   try {
  //     // Make a DELETE request to the API with the given ID
  //     const response = await client({
  //       url: "/data/" + targetId,
  //       method: "delete",
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     // Log any errors that occur
  //     console.error(error);
  //   }
  // }

  // const handleDeleteEmp = (targetId: number) => {
  //   client.delete("/data/${targetId}").then((res) => {
  //     const userToDelete = empDb.filter((emp) => emp.id !== targetId);
  //     setEmpDb(userToDelete);
  //   });
  // };

  const handleEditClick = (emp: UserData) => {
    setEditID(emp.id);

    const editFormValues = {
      id: emp.id,
      imgUrl: emp.imgUrl,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      contactNumber: emp.contactNumber,
      age: emp.age,
      dob: emp.dob,
      salary: emp.salary,
      address: emp.address,
      dependents: emp.dependents,
      policy: emp.policy,
      claimedAmount: emp.claimedAmount,
    };
    setEditData(editFormValues);
  };

  const handleEmpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setEditData({
      ...editData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  // const handleEditSubmit = (e: React.SyntheticEvent<EventTarget>) => {
  //   e.preventDefault();
  //   const editedContact = {
  //     id: editID,
  //     imgUrl: editData.imgUrl,
  //     firstName: editData.firstName,
  //     lastName: editData.lastName,
  //     email: editData.email,
  //     contactNumber: editData.contactNumber,
  //     age: editData.age,
  //     dob: editData.dob,
  //     salary: editData.salary,
  //     address: editData.address,
  //     dependents: editData.dependents,
  //     policy: editData.policy,
  //     claimedAmount: editData.claimedAmount,
  //   };

  //   const newEmpDb = [...empDb];
  //   const index = empDb.findIndex((emp) => emp.id === editedContact.id);

  //   newEmpDb[index] = editedContact;
  //   setEmpDb(newEmpDb);
  //   setEditID(-1);
  // };

  const handleEditSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const editedContact = {
      id: editID,
      imgUrl: editData.imgUrl,
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      contactNumber: editData.contactNumber,
      age: editData.age,
      dob: editData.dob,
      salary: editData.salary,
      address: editData.address,
      dependents: editData.dependents,
      policy: editData.policy,
      claimedAmount: editData.claimedAmount,
    };

    try {
      const result = await client.put("/data", editedContact);
      const newEmpDb = [...empDb];
      const index = result.data.findIndex((emp) => emp.id === editedContact.id);

      newEmpDb[index] = editedContact;
      setEmpDb(newEmpDb);
      setEditID(-1);
      // setEmpDb(
      //   empDb.map((emp) =>
      //     emp.id === editID ? { ...result.data } : editedContact
      //   )
      // );
      // setEditID(-1);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const updateOptions = {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newEmp),
  // };
  // const reqURL = `${API_URL}/${editedContact.id}`;

  const handleCancelClick = () => {
    setEditID(-1);
  };

  return (
    <>
      <NavBar />
      <Header text="Cigno Logistics" />

      <div className="content-container">
        <main>
          <Container>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                {!fetchError && !isLoading && (
                  <Route
                    path="/empDashboard"
                    element={
                      <EmpTable
                        empDb={empDb}
                        editData={editData}
                        editID={editID}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        closeModal={closeModal}
                        setEmpDb={setEmpDb}
                        newEmp={newEmp}
                        onDelete={handleDeleteEmp}
                        handleNewEmpInput={handleNewEmpInput}
                        handleNewEmpSubmit={handleNewEmpSubmit}
                        handleEditClick={handleEditClick}
                        handleEmpChange={handleEmpChange}
                        handleEditSubmit={handleEditSubmit}
                        handleCancelClick={handleCancelClick}
                      />
                    }
                  />
                )}
                <Route
                  path="/medDashboard"
                  element={<MedicalDetails empDb={empDb} />}
                />

                <Route path="/bonus" element={<Bonus />} />
                {/* <Route path="*" element={<Missing />} /> */}
              </Routes>
            </BrowserRouter>
          </Container>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;

{
  /* <Container>
            {isLoading && <p> Loading data ... </p>}
            {fetchError && (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  background: "white",
                }}
              >{`ERROR: ${fetchError}`}</p>
            )}
            {!fetchError && !isLoading && (
              <EmpTable
                empDb={empDb}
                editData={editData}
                editID={editID}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                closeModal={closeModal}
                setEmpDb={setEmpDb}
                newEmp={newEmp}
                onDelete={handleDeleteEmp}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                handleSubmitForm={handleSubmitForm}
                handleEditClick={handleEditClick}
                handleEmpChange={handleEmpChange}
                handleEditSubmit={handleEditSubmit}
                handleCancelClick={handleCancelClick}
              />
            )}
          </Container> */
}
