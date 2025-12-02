import DrugCartPage from "../_components/DrugCartPage";
import MenuBar from "../_components/MenuBar";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-fadeIn">
      <MenuBar />
      <DrugCartPage />
    </div>
  );
};

export default Page;
