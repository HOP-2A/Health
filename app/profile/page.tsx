import MenuBar from "../_components/MenuBar";
import UIProfilePage from "../_components/UIProfilepage";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen animate-fadeIn">
      <MenuBar />
      <UIProfilePage />
    </div>
  );
};

export default Page;
