import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert"; // for delete confirmation
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

type Contacts={
  first_name:String,
  last_name:String,
  _id:String,
  phone_number:String,
}[]

type Props={
  setcontact:(val:Contacts)=>void,
  setLoading:(val:Boolean)=>void,
  setMsg:(val:String)=>void,
  id:String,
}

//delete conatct function
const DeleteContact = (props:Props) => {
  const getContacts = async () => {
    await axios.get("/phonebook").then((res) => {
      props.setcontact(res.data);
      props.setLoading(false);
    }).catch((err)=>{
      props.setLoading(false);
      props.setMsg(err.message);
    });
  };

  //confirmation alert
  const deleteAlert = (id:String) => {
    confirmAlert({
      title: "Are you sure?",
      message:"Do you really want to delete this contact? This process cannot be undone.",
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

  const deleteContacts = async (id:String) => {
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
