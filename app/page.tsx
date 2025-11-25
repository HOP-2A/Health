import DescribeUrIllness from "./_components/DescribeUrIllness";
import MenuBar from "./_components/MenuBar";

export default function Home() {
  return (
    <div className="bg-[linear-gradient(to_top,#E3FDF5,#D7FFE8)] min-h-screen">
      <MenuBar />
      <DescribeUrIllness />
    </div>
  );
}
