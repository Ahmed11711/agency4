import React, { useState, useEffect } from "react";
import { useI18n } from "../contexts/I18nContext";

interface ServiceItem {
  id: number;
  name: string; // الاسم الإنجليزي
  short_name: string; // الاسم العربي
  description: string; // الوصف الإنجليزي
  short_description: string; // الوصف العربي
  icon?: string; // أيقونة اختيارية من API (مش هنعتمدها)
  images?: string[] | null;
  price?: string;
  category_id?: number;
}

const Services: React.FC = () => {
  const { t, language } = useI18n();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // قائمة أيقونات استيتك (Frontend) عشوائية
  const icons = [
    "design_services",
    "campaign",
    "print",
    "signpost",
    "safety_divider",
    "precision_manufacturing",
    "architecture",
    "theater_comedy",
    "video_camera_front",
  ];

  // دالة لإرجاع أيقونة عشوائية
  const getRandomIcon = () => {
    const index = Math.floor(Math.random() * icons.length);
    return icons[index];
  };

  // fetch data from API
  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // دوال لاختيار العنوان والوصف حسب اللغة
  const getServiceTitle = (service: ServiceItem) =>
    language === "ar" ? service.short_name : service.name;

  const getServiceDescription = (service: ServiceItem) =>
    language === "ar" ? service.short_description : service.description;

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-[#201213] dark:bg-[#201213] light:bg-gray-50">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-white dark:text-white light:text-gray-900 text-4xl md:text-6xl font-black mb-6">
            {t("services.title")}
          </h1>
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg md:text-xl font-normal max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col gap-4 rounded-xl border border-white/5 dark:border-white/5 light:border-gray-200 bg-card-dark dark:bg-card-dark light:bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-[#361e21] dark:hover:bg-[#361e21] light:hover:bg-gray-100 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* أيقونة عشوائية */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">
                  {getRandomIcon()}
                </span>
              </div>

              {/* محتوى الخدمة */}
              <div className="flex flex-col gap-3">
                <h3 className="text-white dark:text-white light:text-gray-900 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {getServiceTitle(service)}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm font-normal leading-relaxed">
                  {getServiceDescription(service)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center bg-gradient-to-br from-card-dark dark:from-card-dark light:from-gray-100 to-[#311c1d] dark:to-[#311c1d] light:to-gray-200 p-12 md:p-16 rounded-3xl border border-white/5 dark:border-white/5 light:border-gray-200">
          <h2 className="text-white dark:text-white light:text-gray-900 text-3xl md:text-4xl font-black mb-6">
            {t("services.cta.title")}
          </h2>
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-dark text-white font-bold h-12 px-10 rounded-lg transition-all shadow-lg shadow-primary/20">
              {t("common.startProject")}
            </button>
            <button className="border border-white/20 dark:border-white/20 light:border-gray-300 hover:border-white dark:hover:border-white light:hover:border-gray-900 text-white dark:text-white light:text-gray-900 font-bold h-12 px-10 rounded-lg transition-all">
              {t("common.downloadPortfolio")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
