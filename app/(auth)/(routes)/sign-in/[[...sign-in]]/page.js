import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return <SignIn forceRedirectUrl="/after-sign-in" />;
}
