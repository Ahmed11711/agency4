import React from "react";
import { Testimonial } from "../types";
import { useI18n } from "../contexts/I18nContext";

const Testimonials: React.FC = () => {
  const { t } = useI18n();

  const testimonials: Testimonial[] = [
    {
      id: "1",
      author: "فارس الدوى",
      role: "مدير تسويق",
      quote:
        "الشركة دي فعلاً غيرت تجربة عملي بالكامل! تصميم وتنفيذ العمل كان سلس وجذاب، والفريق كان متعاون جدًا في تعديل كل التفاصيل حسب احتياجاتي.",
      rating: 5,
      avatar: "/assets/1فارس الدوى.jpeg",
    },
    {
      id: "2",
      author: "م. منة هشام",
      role: "مهندسة ديكور",
      quote:
        "اشتغلت مع الفريق على مشاريع تصميمية متعددة، وكل مرة كانوا مبدعين. الجودة والاحترافية واضحة في كل تفاصيل المشروع.",
      rating: 5,
      avatar: "/assets/2منة الدوى.jpg",
    },
    {
      id: "3",
      author: "أحمد ممدوح",
      role: "مدير مصنع",
      quote:
        "الفريق دايمًا ملتزم بالمواعيد وبجودة العمل. من التصميمات للويب والتطبيقات لحد السوشيال ميديا، كل حاجة ممتازة وتستحق الثقة.",
      rating: 5,
      avatar: "/assets/3 احمد ممدوح.jpg",
    },
    {
      id: "4",
      author: "عبد الله السيد",
      role: "مدير مشاريع",
      quote:
        "تعاملهم جيد وأفكار جديدة لأعمال أسوار المواقع ولوحات المشاريع، ومصداقية واضحة في التنفيذ، وفريق الدعم متجاوب على طول.",
      rating: 5,
      avatar: "/assets/4عبد الله السيد.jpg",
    },
    {
      id: "5",
      author: "سارة القحطاني",
      role: "",
      quote:
        "خدماتهم ممتازة في سرعة فهم المخططات والالتزام في استخدام المواد ومطابقتها، تعاملت معهم في أعمال حديد ببعض المشاريع، سعر وجودة. أنصح أي حد بجد يجرب خدماتهم.",
      rating: 5,
      avatar: "/assets/5سارة القحطانى.jpg",
    },
    {
      id: "6",
      author: "محمد السيد",
      role: "مدير تنفيذي",
      quote:
        "اشتغلنا مع الفريق على إحدى الفاعليات من التصميم حتى إقامة الفاعلية، ماشاء الله فريق العمل متعاون ووصلني شعور إنهم من موظفين شركتنا.",
      rating: 5,
      avatar: "/assets/محمد السيد 6.jpg",
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#201213] dark:bg-[#201213] light:bg-gray-50">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:text-left text-center mb-16">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="h-px w-12 bg-primary"></span>
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              {t("testimonials.label")}
            </span>
          </div>
          <h1 className="text-primary dark:text-white light:text-gray-900 text-4xl md:text-6xl font-black mb-6">
            {t("testimonials.title1")}{" "}
            <span className="text-[#CB2429]">{t("testimonials.title2")}</span>
          </h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg md:text-xl max-w-2xl">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative flex flex-col justify-between bg-[#2a1d1f] dark:bg-[#2a1d1f] light:bg-gray-100 hover:bg-[#352225] dark:hover:bg-[#352225] light:hover:bg-gray-200 border border-white/5 dark:border-white/5 light:border-gray-200 p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="absolute top-8 right-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <span className="material-symbols-outlined text-6xl">
                  format_quote
                </span>
              </div>
              <div className="mb-8 relative z-10">
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-gray-200 dark:text-gray-200 light:text-gray-800 text-lg leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto border-t border-white/10 dark:border-white/10 light:border-gray-300 pt-6">
                <div
                  className="size-14 rounded-full bg-secondary-gray bg-center bg-cover border-2 border-primary/20 shadow-md"
                  style={{ backgroundImage: `url('${t.avatar}')` }}
                />
                <div>
                  <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-base">
                    {t.author}
                  </h4>
                  <p className="text-primary text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
