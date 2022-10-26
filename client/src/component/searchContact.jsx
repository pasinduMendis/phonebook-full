import axios from "axios";
import { useState } from "react";

const SearchContact = (props) => {
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
