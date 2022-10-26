import axios from "axios";
import { useState } from "react";
type Contacts={
  first_name:String,
  last_name:String,
  _id:String,
  phone_number:String,
}[]

type Props={
  setcontact:(val:Contacts)=>void,
  setLoading:(val:Boolean)=>void,
}
const SearchContact = (props:Props) => {
  const [filter, setFilter] = useState("");
  const filterContacts = async () => {
    props.setLoading(true);
    await axios.get(`/phonebook/${filter}`).then((res) => {
      props.setcontact(res.data);
      props.setLoading(false);
    }).catch((err)=>{
      props.setLoading(false);
    });
  };

  return (
    <>
      {/* search part */}
      <div className="py-3 px-5 mt-4">
        <input
          type="email"
          className={"form-control"}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              filterContacts();
            }
          }}
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
    </>
  );
};
export default SearchContact;
