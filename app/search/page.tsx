import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen animate-fadeIn">
      <MenuBar />
      <SearchPageInput />
    </div>
  );
};

export default Page;
