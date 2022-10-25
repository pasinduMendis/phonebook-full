import ContactPageIcon from "@mui/icons-material/ContactPage";
import DeleteIcon from "@mui/icons-material/Delete";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import { useEffect, useState } from "react";
import axios from "axios";
import NewContact from "./newContact";

const Main = () => {
  const [contact, setcontact] = useState([]);
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts();
  }, [msg]);
  const getContacts = async () => {
    await axios.get("/phonebook").then((res) => {
      setcontact(res.data);
      setLoading(false);
    });
  };

  const filterContacts = async () => {
    setLoading(true);
    await axios.get(`/phonebook/${filter}`).then((res) => {
      setcontact(res.data);
      setLoading(false);
    });
  };

  const deleteContacts = async (id) => {
    setLoading(true);
    await axios.delete(`/phonebook/${id}`).then((res) => {
      setMsg(res.data);
      getContacts();
    });
  };
  return (
    <div className="container">
      {addNew && (
        <NewContact
          display={(val) => setAddNew(val)}
          msg={(val) => {
            setMsg(val);
          }}
          contacts={(val)=>{setcontact(val)}}
        />
      )}
      <h1 className="row d-flex justify-content-center align-items-center py-4">
        <ContactPageIcon sx={{ fontSize: 80 }} /> Phone Book App
      </h1>

      <div className="row d-flex jd-flex justify-content-between px-5 mt-3">
        <h1 className="col-2">Contacts</h1>
        <div
          className="col-2 btn btn-lg btn-primary"
          onClick={() => {
            setAddNew(true);
          }}
        >
          +Add Contact
        </div>
      </div>

      {/* search part */}
      <div
        className="py-3 px-5 mt-4"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            filterContacts();
          }
        }}
      >
        <input
          type="email"
          className={"form-control"}
          style={{
            backgroundColor: `${"#F8FBFD"}`,
            fontSize: 23,
          }}
          placeholder="search for the contact by last name..."
          required
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      {msg && <p className="text-danger">{msg}</p>}

      {/* display contact */}
      {loading ? (
        <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="py-3 px-5 ">
          {contact &&
            contact.map((item, id) => {
              return (
                <div
                  className="row d-flex jd-flex justify-content-between mt-4"
                  key={id}
                >
                  <div className="col-8">
                    <h2 className="text-dark">
                      {item.first_name} {item.last_name}
                    </h2>
                    <h5 className="text-secondary">
                      <CallSharpIcon /> {item.phone_number}
                    </h5>
                  </div>
                  <div
                    className="col-2 text-end"
                    onClick={() => {
                      deleteContacts(item._id);
                    }}
                  >
                    <div className="btn btn-danger">
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Main;
