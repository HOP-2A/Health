import DescribeUrIllness from "./_components/DescribeUrIllness";
import MenuBar from "./_components/MenuBar";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#E3FDF5] to-[#D7FFE8] min-h-screen animate-fadeIn">
      <MenuBar />
      <DescribeUrIllness />
    </div>
  );
}
