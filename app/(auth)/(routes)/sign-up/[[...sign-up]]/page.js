import { SignUp } from "@clerk/nextjs";
export default function Page(){
    return <SignUp afterSignInUrl="/after-sign-in"/>
}