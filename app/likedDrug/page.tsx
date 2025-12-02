import LikedDrugPage from "../_components/LikedDrugCart";
import MenuBar from "../_components/MenuBar";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-fadeIn">
      <MenuBar />
      <LikedDrugPage />
    </div>
  );
};

export default Page;
