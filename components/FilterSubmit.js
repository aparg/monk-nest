import axios from "axios";
import swal from "sweetalert";

function FilterSubmit(city, msgData, leadEmail) {
  let crmUrl = `"https://backendcrm.homepapa.ca/services"`;
  // Prepare the data for the CRM API call
  let crmData = {
    name:city,
    attributes:{
        ...msgData
    },
    leadEmail: leadEmail,
  };
  delete crmData.attributes.email;

  console.log(crmData, "crmData");

  // First API call to CRM backend
  axios.post(crmUrl, crmData, {
    headers: {
      "content-type": "application/json",
    },
    mode: "no-cors",
  })
    
    .then(() => {
      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Filter Now");
      }, 2000);
      swal(
        `Thank You, ${msgData.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgData,
      });
    })
    .catch((errr) => {
      console.log(errr);
      swal("Message Failed", "Cannot save filter", "error");
    });
}

export default FilterSubmit;