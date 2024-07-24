import { Spinner } from "@nextui-org/react";
import React from "react";

const SigningInPage = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Spinner
        color="#0C234B"
        size="lg"
        label="Completing sign-in and creating lead..."
      />
    </div>
  );
};

export default SigningInPage;
