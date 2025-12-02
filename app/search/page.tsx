import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-fadeIn">
      <MenuBar />
      <SearchPageInput />
    </div>
  );
};

export default Page;
