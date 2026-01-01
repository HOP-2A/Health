import MenuBar from "@/app/_components/MenuBar";
import DescriptionPrompt from "@/app/_components/ai/DescriptionPrompt";
import AiResponse from "@/app/_components/ai/AiResponse";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      
    >
      <MenuBar />

      <div className="flex justify-center mt-10 px-4 ml-30 mr-20">
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
