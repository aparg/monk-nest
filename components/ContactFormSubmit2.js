import { sendEmail } from "@/actions/resend";
import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit2({
  msgdata,
  setSubmitbtn,
  setCredentials,
  page,
  title = null,
}) {
  // let baseUrl = "https://api.homebaba.ca";
  setSubmitbtn("Submitting...");
  // let form_data = new FormData();
  // form_data.append("name", msgdata.name);
  // form_data.append("email", msgdata.email);
  // form_data.append("phone", msgdata.phone);
  // form_data.append("message", msgdata.message);
  // form_data.append("realtor", msgdata.realtor);
  // let neww = msgdata.project_namee.replaceAll("-", " ");
  // const words = neww.split(" ");
  // for (let i = 0; i < words.length; i++) {
  //   words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  // }
  // let newwww = words.join(" ");
  // form_data.append("proj_name", newwww);
  // form_data.append("proj_slug", msgdata.project_namee);
  // form_data.append("cityy", msgdata.cityy);

  // let url = `${baseUrl}/api/contact-form-submit2/`;
  // axios
  //   .post(url, form_data, {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //     mode: "no-cors",
  //   })
  console.log(title);
  sendEmail({
    content: msgdata,
    title,
    page,
  })
    .then(() => {
      setSubmitbtn("Sucessfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    })
    .catch((errr) => {
      console.log(errr);
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit2;
