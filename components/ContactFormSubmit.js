import { sendEmail } from "@/actions/resend";
import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit({
  msgdata,
  setSubmitbtn = null,
  setCredentials = null,
  title = null,
  page = null,
  contactType = null,
  leadEmail = null,
}) {
  // let baseUrl = "https://api.homebaba.ca";
  setSubmitbtn && setSubmitbtn("Submitting...");
  let form_data = new FormData();
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);
  let baseUrl = "https://api.homebaba.ca";
  let crmUrl = "https://backendcrm.homepapa.ca/services";
  // let url = `${baseUrl}/api/contact-form-submit/`;
  // axios
  //   .post(url, form_data, {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //     mode: "no-cors",
  //   })

  // Prepare the data for the CRM API call
  let crmData = {
    name: contactType,
    attributes: {
      ...msgdata,
    },
    leadEmail: leadEmail,
  };
  delete crmData.attributes.name;
  delete crmData.attributes.email;

  sendEmail({ content: msgdata, title: title, page: page })
    .then(() => {
      axios
        .post(crmUrl, crmData, {
          headers: {
            "content-type": "application/json",
          },
          mode: "no-cors",
        })
        .then(() => {
          setSubmitbtn && setSubmitbtn("Sucessfully Submitted");
          setTimeout(() => {
            setSubmitbtn && setSubmitbtn("Contact Now");
          }, 2000);
          swal(
            `Thank You, ${msgdata.name}`,
            "Please expect an email or call from us shortly",
            "success"
          );
          setCredentials &&
            setCredentials({
              ...msgdata,
              name: "",
              phone: "",
              email: "",
              message: "",
            });
        });
    })

    .catch((errr) => {
      console.log(errr);
      setSubmitbtn && setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit;
