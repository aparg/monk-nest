"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SigningInPage from "@/components/SigningInPage";

export default function AfterSignInPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const createLead = async () => {
        console.log("Starting lead creation process...");

        try {
          const leadData = {
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName,
            phone: user.primaryPhoneNumber?.phoneNumber || "",
          };

          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL_LEADS}/leads/dolphy/create`;

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
          });
          const responseJSON = await response.json();
          console.log(responseJSON)
          console.log(response.ok);
          if (response.ok) {
            router.push("/");
          }
          if (!response.ok) {
            throw new Error(
              `Failed to create lead: ${response.status} ${response.statusText}`
            );
          }

          const result = await response.json();
          router.push("/");
        } catch (error) {
          console.error("Error creating lead:", error);
        }
      };

      createLead();
    } else if (isLoaded && !isSignedIn) {
      console.log("User not signed in, redirecting to sign-in page...");
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, user, router]);
  console.log("HERE");
  return (
    // <div>Completing sign-in and creating lead... Check console for logs.</div>
    <SigningInPage />
  );
}
