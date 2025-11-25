import { Input } from "@/components/ui/input";

export const Chat = async () => {
  return (
    <div>
      <form action={"/api/ai-chat"} method="POST">
        <Input name="prompt"></Input>
      </form>
    </div>
  );
};
