import DescriptionPrompt from "@/app/_components/ai/DescriptionPrompt";
import AiResponse from "@/app/_components/ai/AiResponse";
import Footer from "@/app/_components/Footer";
import MenuBar from "@/app/_components/MenuBar";

export default function Home() {
  return (
    <div>
      <MenuBar />
      <div className="flex-1 flex justify-center mt-10 px-4 ml-30 mr-20 h-[90vh] ">
        <div className="h-100 w-25000">
          <DescriptionPrompt />
        </div>
        <div className="h-100 w-25000">
          <AiResponse />
        </div>
      </div>
      <Footer />
    </div>
  );
}
