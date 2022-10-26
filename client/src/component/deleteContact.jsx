import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert"; // for delete confirmation
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

//delete conatct function
const DeleteContact = (props) => {
  const getContacts = async () => {
    await axios.get("/phonebook").then((res) => {
      props.setcontact(res.data);
      props.setLoading(false);
    }).catch((err)=>{
      props.setMsg(err.message);
      props.setLoading(false);
    });
  };

  //confirmation alert
  const deleteAlert = (id) => {
    confirmAlert({
      title: "Are you sure?",
      message:
        <p className="text-danger">Do you really want to delete this contact? This process cannot be undone.</p>,
      buttons: [
        {
          label: "Yes",
          className: "btn bg-danger",
          onClick: async () => {
            deleteContacts(id);
          },
        },
        {
          label: "No",
          className: "btn",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteContacts = async (id) => {
    props.setLoading(true);
    await axios.delete(`/phonebook/${id}`).then((res) => {
      props.setMsg(res.data);
      getContacts();
    }).catch((err)=>{
      props.setMsg(err.message);
      props.setLoading(false);
    });
  };

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteAlert(props.id);
        }}
      >
        <DeleteIcon />
      </button>
    </>
  );
};

export default DeleteContact;
