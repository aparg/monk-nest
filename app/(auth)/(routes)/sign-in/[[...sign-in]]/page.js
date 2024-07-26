import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return <SignIn afterSignInUrl="/after-sign-in" />;
}
