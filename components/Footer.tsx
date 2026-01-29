import React, { useEffect, useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

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
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <img
                src="https://adv6ksa.com/backend_dashboard/storage/app/public/products/246f3f5f-a814-41cb-8c99-bd0ff9dac1b5.jpg"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-white dark:text-white light:text-gray-900 text-lg font-bold tracking-tight">
                {t("footer.companyName")}
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-md leading-relaxed">
              {t("footer.tagline")}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1HdHQhoeKF/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all"
              >
                <span className="text-lg">
                  <FaFacebookF />
                </span>
              </a>

              <a
                href="https://www.instagram.com/adv6ksa?igsh=bTdyYjhzdWg1bHRx"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 hover:text-white transition-all"
              >
                <span className="text-lg">
                  <FaInstagram />
                </span>
              </a>

              <a
                href="https://x.com/adv6ksa1"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all"
              >
                <span className="text-lg">
                  <FaXTwitter />
                </span>
              </a>

              <a
                href="https://www.tiktok.com/@professionaladver5?_r=1&_t=ZS-93OZ1uGTOBm"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#000000] hover:text-white transition-all"
              >
                <span className="text-lg">
                  <FaTiktok />
                </span>
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
