import LikedDrugPage from "../_components/LikedDrugCart";
import MenuBar from "../_components/MenuBar";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen animate-fadeIn">
      <MenuBar />
      <LikedDrugPage />
    </div>
  );
};

export default Page;
