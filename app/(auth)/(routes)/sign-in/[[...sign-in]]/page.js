import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <SignIn
      forceRedirectUrl="/after-sign-in"
      fallbackRedirectUrl="/after-sign-in"
    />
  );
}
