import { useEffect, useState } from "react";
import EmpTable from "./Components/DataTables/EmpTable";
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/Footer";
import { Container } from "react-bootstrap";
import "../bootstrap.min.css";
import apiRequest from "./Components/DataTables/apiRequest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Missing from "./Components/Missing";
import NavBar from "./Components/UI/NavBar";

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
};

export interface ApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

type CRUDOptions = {
  method: string;
  headers: object;
  body: unknown;
};

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
  });
  const [fetchError, setFetchError] = useState<ApiError | null>(null);
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
  });

  const API_URL = "http://localhost:8000/data";

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("No response received");

        const dataItems = await response.json();
        setEmpDb(dataItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchData())();
    }, 2000);
    fetchData();
  }, []);

  const handleSubmit = (newEmp: UserData) => {
    setEmpDb([...empDb, newEmp]);
  };

  const validateForm = () => {
    if (newEmp.firstName && newEmp.lastName) {
      return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmp({
      ...newEmp,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleSubmitForm = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleSubmit(newEmp);

    const postOptions: CRUDOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmp),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);

    closeModal();
  };

  const handleDeleteEmp = async (targetId: number) => {
    setEmpDb((data): UserData[] =>
      data.filter((emp: UserData) => emp.id !== targetId)
    );
    const deleteOptions = { method: "DELETE" };
    const reqURL = `${API_URL}/${targetId}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if (result) setFetchError(result);
  };

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

  const handleEditSubmit = async () => {
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
    };

    const newEmp = [...empDb];
    console.log(newEmp);

    const editIndex = empDb.findIndex((emp) => emp.id === editID);

    newEmp[editIndex] = editedContact;
    setEmpDb(newEmp);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmp),
    };
    const reqURL = `${API_URL}/${editedContact.id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) setFetchError(result);

    setEditID(-1);
  };

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

                {/* {isLoading && <p> Loading data ... </p>} */}
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
                  <Route
                    path="/employeeDetails"
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
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        handleSubmitForm={handleSubmitForm}
                        handleEditClick={handleEditClick}
                        handleEmpChange={handleEmpChange}
                        handleEditSubmit={handleEditSubmit}
                        handleCancelClick={handleCancelClick}
                      />
                    }
                  />
                )}
                <Route path="*" element={<Missing />} />
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
