import React, { useEffect, useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import { Link } from "react-router-dom";

interface ServiceItem {
  id: number;
  name: string;
  short_name: string;
}

const Footer: React.FC = () => {
  const { t, language } = useI18n();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  const getServiceName = (s: ServiceItem) =>
    language === "ar" ? s.short_name : s.name;

  return (
    <footer className="bg-[#1a0f10] dark:bg-[#1a0f10] light:bg-gray-50 border-t border-white/10 dark:border-white/10 light:border-gray-200 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">
                  campaign
                </span>
              </div>
              <h2 className="text-white dark:text-white light:text-gray-900 text-lg font-bold tracking-tight">
                {t("footer.companyName")}
              </h2>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-xl">
                  public
                </span>
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-xl">call</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-base uppercase tracking-widest">
              {t("footer.company")}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/about"
                className="text-gray-400 hover:text-primary text-sm"
              >
                {t("footer.aboutUs")}
              </Link>
              <Link
                to="/portfolio"
                className="text-gray-400 hover:text-primary text-sm"
              >
                {t("footer.ourWork")}
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-primary text-sm"
              >
                {t("footer.careers")}
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-primary text-sm"
              >
                {t("common.contact")}
              </Link>
            </nav>
          </div>

          {/* ✅ Services (Dynamic – Name Only) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-base uppercase tracking-widest">
              {t("footer.services")}
            </h4>
            <nav className="flex flex-col gap-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to="/services"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  {getServiceName(service)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-base uppercase tracking-widest">
              {t("footer.newsletter")}
            </h4>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
              {t("footer.newsletterDescription")}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t("common.email")}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary flex-grow"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold">
                {t("common.join")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-gray-500 text-xs">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-white text-xs"
            >
              {t("common.privacyPolicy")}
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-white text-xs"
            >
              {t("common.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
