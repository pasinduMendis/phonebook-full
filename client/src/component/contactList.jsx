import ContactPageIcon from "@mui/icons-material/ContactPage";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import { useEffect, useState } from "react";
import axios from "axios";
import AddContact from "./addContact";
import SearchContact from "./searchContact";
import DeleteContact from "./deleteContact";

const ContactList = () => {
  const [contact, setcontact] = useState([]);
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
    }).catch((err)=>{
     setMsg(err.message);
     setLoading(false);
    });
  };

  return (
    <div className="container">
      {addNew && (
        <AddContact
          display={(val) => setAddNew(val)}
          msg={(val) => {
            setMsg(val);
          }}
          contacts={(val) => {
            setcontact(val);
          }}
        />
      )}
      <h1 className="row d-flex justify-content-center align-items-center py-4">
        <ContactPageIcon sx={{ fontSize: 80 }} /> Phone Book App
      </h1>

      <div className="row d-flex jd-flex justify-content-between px-5 mt-3">
        <h1 className="col-2">Contacts</h1>
        <button
          className="col-2 btn btn-lg btn-primary"
          onClick={() => {
            setAddNew(true);
          }}
        >
          +Add Contact
        </button>
      </div>

      <SearchContact
        setLoading={(val) => setLoading(val)}
        setcontact={(contacts) => setcontact(contacts)}
      />

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
                  <div className="col-2 text-end">
                    <DeleteContact
                      id={item._id}
                      setcontact={(contacts) => setcontact(contacts)}
                      setLoading={(val) => setLoading(val)}
                      setMsg={(val) => setMsg(val)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default ContactList;
