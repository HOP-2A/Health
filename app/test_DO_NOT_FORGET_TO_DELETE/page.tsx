import DescriptionPrompt from "@/app/_components/ai/DescriptionPrompt";
import AiResponse from "@/app/_components/ai/AiResponse";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex justify-center mt-10 px-4 ml-30 mr-20">
        <div className="h-100 w-25000">
          <DescriptionPrompt />
        </div>
        <div className="h-100 w-25000">
          <AiResponse />
        </div>
      </div>
    </div>
  );
}
