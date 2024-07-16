"use client";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/navigation";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Send a message");
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
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
    gtag_report_conversion();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials)
      .then((res) => router.push("/thank-you"))
      .catch((err) => console.log(err));
  };
  return (
    <form
      method="POST"
      className="mb-2"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row me-0 row-cols-2 g-4 me-0">
        <div className="col mb-2">
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
          <div className="mb-2">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-2">
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
          <div className="mb-2">
            <div className="form-floating">
              <select
                className="form-select"
                id="realtor"
                aria-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <label htmlFor="floatingSelect">
                Are you a realtor or working with a realtor?{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-2">
          <textarea
            id="message"
            name="message"
            className="fields fff mess"
            rows="3"
            cols="50"
            placeholder="Enter your message here"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <div className="d-flex">
        <p className="small-text2 mb-3 text-center">
          Dolphy is an online pre-construction homes database. Dolphy curates
          the list of projects that are publicly available on internet Be
          advised the information provided on this page could be outdated or
          inaccurate. By submitting above form you consent the real estate
          agents from Dolphin Realty Inc. to connect with you. We may share your
          info to our brokerage partners and agents to help you with your
          questions. You can unsubscribe at any time by emailing us.
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <input
          type="submit"
          value={submitbtn}
          className="btn btn-call btn-lg mb-2"
          id="subbtn"
        />
      </div>
    </form>
  );
}
