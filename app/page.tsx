import DescribeUrIllness from "./_components/DescribeUrIllness";
import MenuBar from "./_components/MenuBar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen animate-fadeIn">
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignUpButton>
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <MenuBar />
      <DescribeUrIllness />
    </div>
  );
}
