import { useState } from "react";
import ContactFormSubmit2 from "./ContactFormSubmit2";
// import { useRouter } from "next/navigation";

export default function ContactFormD(props) {
  const [submitbtn, setSubmitbtn] = useState("Contact me");
  // const route = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    project_namee: props.listing_id,
    cityy: props.city_name,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(props);
    ContactFormSubmit2({
      msgdata: credentials,
      setSubmitbtn,
      setCredentials,
      page: "Assignment Homes",
      title: "Inquiry For Assignment: " + props.projects_name,
    });
  };
  return (
    <form
      method="POST"
      className="mb-3"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row me-0 row-cols-2 g-4 me-0">
        <div className="col mb-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="fields fff"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              required={true}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <div class="form-floating">
              <select
                class="form-select"
                id="realtor"
                ariaLabel="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No" selected>
                  No
                </option>
                <option value="Yes">Yes</option>
              </select>
              <label for="floatingSelect">
                Are you a realtor or working with one?{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-3">
          <textarea
            id="message"
            name="message"
            className="fields fff mess pt-1"
            rows="3"
            cols="50"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn btn-call bg-primary-green hover:bg-primary-green btn-lg w-100 mb-3"
        id="subbtn"
      />
      <div className="d-flex">
        <p className="small-text2 mb-0">
          Monk Nest is an online pre-construction homes database. Monk Nest
          curates the list of projects that are publicly available on internet
          and does not take part in any real estate transactions. Be advised the
          information provided on this page could be outdated or inaccurate. By
          submitting above form you consent the real estate agents advertising
          on this page to connect with you. We may share your info to our
          partners or advertisers to help you with your questions. You can
          unsubscribe at any time by emailing us.
        </p>
      </div>
    </form>
  );
}
