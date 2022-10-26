import axios from "axios";
import { useState } from "react";

const AddContact = (props) => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/phonebook/add", { first_name, last_name, phone_number })
      .then(async (res) => {
        setLoading(false);

        await axios.get("/phonebook").then((response) => {
          props.contacts(response.data);
          props.msg(res.data);
          props.display(false);
        }).catch((err)=>{
          props.msg(err.message);
            props.display(false);
        });
      }).catch((err)=>{
        props.msg(err.message);
          props.display(false);
      });
  };
  return (
    <>
      <div className="div-block-10 aaaa">
        <div
          className="wrap-upload-popup csvUpload p-5 mt-5"
          style={{
            width: "60%",
            overflow: "auto",
            height: "auto",
            backgroundColor: "#F4FBFF",
          }}
        >
          <div className="col-12 text-center">
            <form className=" int-form" onSubmit={(e) => submit(e)}>
              <div className="form-group my-3">
                <label style={{ fontSize: 18 }} className="text-start col-12">First Name</label>
                <input
                  type="text"
                  className={"form-control"}
                  style={{
                    backgroundColor: `${"#F8FBFD"}`,
                    fontSize: 18,
                  }}
                  placeholder="Enter Your First Name"
                  required
                  value={first_name}
                  onChange={(e) => {
                    setfirst_name(e.target.value);
                  }}
                />
              </div>
              <div className="form-group my-3">
                <label style={{ fontSize: 18 }} className="text-start col-12">Last Name</label>
                <input
                  type="text"
                  className={"form-control"}
                  style={{
                    backgroundColor: `${"#F8FBFD"}`,
                    fontSize: 18,
                  }}
                  placeholder="Enter Your Last Name"
                  required
                  value={last_name}
                  onChange={(e) => {
                    setlast_name(e.target.value);
                  }}
                />
              </div>
              <div className="form-group my-3">
                <label className="text-start col-12" style={{ fontSize: 18 }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  className={"form-control"}
                  style={{
                    backgroundColor: `${"#F8FBFD"}`,
                    fontSize: 18,
                  }}
                  placeholder="Enter Your Phone Number"
                  required
                  value={phone_number}
                  onChange={(e) => {
                    setphone_number(e.target.value);
                  }}
                />
              </div>
              <div className="div-block-342 mt-5">
                <button className="btn btn-primary col-4 mx-2" type="submit">
                  {loading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : (
                    "Save"
                  )}
                </button>
                <div
                  onClick={() => props.display(false)}
                  className="btn col-4  btn-danger"
                >
                  Cancel
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddContact;
