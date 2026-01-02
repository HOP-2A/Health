import { useState } from "react";
import { Stethoscope, Send, Sparkles } from "lucide-react";

interface DescribeUrIllnessProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
}

export default function DescriptionPromptMain({
  value = "",
  onChange,
  onSubmit,
  submitLabel = "Илгээх",
}: DescribeUrIllnessProps) {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <div className="flex justify-center w-full px-4 ">
      <div className="w-full max-w-3xl">
        {/* Гарчиг хэсэг */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Stethoscope className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Өвчин шинж тэмдгээ бичнэ үү
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Таны мэдээллийг үндэслэн бид танд тохирох эм, эмчилгээний зөвлөгөө
            өгнө
          </p>
        </div>

        {/* Форм хэсэг */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          {/* Textarea */}
          <div className="mb-6">
            <label className="block mb-3 text-gray-700 font-semibold text-sm">
              Шинж тэмдгүүд ба мэдрэмж
            </label>
            <textarea
              rows={8}
              value={internalValue}
              onChange={handleChange}
              placeholder="Жишээ нь: Өглөө босоход толгой өвдөж, бие сулардаг. 2 хоног болж байна..."
              className="
                w-full p-4 rounded-xl resize-none
                bg-gray-50 text-gray-800 placeholder-gray-400
                border border-gray-200
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all duration-200
              "
            ></textarea>
            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Дэлгэрэнгүй тайлбар өгснөөр илүү сайн зөвлөгөө авна
            </p>
          </div>

          {/* Товч */}
          <button
            type="submit"
            disabled={!internalValue.trim()}
            className="
              w-full py-3.5 rounded-xl text-base font-semibold
              bg-gradient-to-r from-green-600 to-emerald-600 text-white
              shadow-md hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:from-green-700 hover:to-emerald-700
              active:scale-[0.98] transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            <Send className="w-5 h-5" />
            {submitLabel}
          </button>
        </form>

        {/* Анхааруулга */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 text-center">
            ⚠️ <strong>Анхааруулга:</strong> Энэхүү зөвлөгөө нь зөвхөн мэдээлэл
            өгөх зорилготой. Ноцтой тохиолдолд эмчид хандана уу.
          </p>
        </div>
      </div>
    </div>
  );
}
