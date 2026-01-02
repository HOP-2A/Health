import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen flex items-center justify-center animate-fadeIn">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <SignedOut>
          <SignInButton>
            <button className="bg-[#6c47ff] hover:bg-[#5638c9] text-white font-semibold rounded-xl text-sm sm:text-base h-12 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="bg-[#6c47ff] hover:bg-[#5638c9] text-white font-semibold rounded-xl text-sm sm:text-base h-12 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <div className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Page;
