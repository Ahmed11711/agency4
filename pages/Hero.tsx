import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import logoWhyUs from "../assets/fae3f853-74ba-4aaa-b185-b638d1e8b68f-1.jpg";
import heroimage from "../assets/hero.jpg";

interface ServiceItem {
  id: number;
  name: string;
  short_name: string;
  description: string;
  short_description: string;
  icon?: string;
}

interface Product {
  id: number;
  name: string;
  short_description: string;
  images: string[] | null;
  category_id: number;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[];
}

const Hero: React.FC = () => {
  const { t, language } = useI18n();

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  // Fetch Services
  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoadingServices(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingServices(false);
      });
  }, []);

  // Fetch Portfolio
  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const allProducts = data.flatMap((c: Category) => c.products);
        setPortfolioProjects(allProducts.slice(0, 3));
        setLoadingPortfolio(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPortfolio(false);
      });
  }, []);

  const quickLinks = [
    {
      n: "01",
      t: t("hero.quickLink1.title"),
      d: t("hero.quickLink1.description"),
    },
    {
      n: "02",
      t: t("hero.quickLink2.title"),
      d: t("hero.quickLink2.description"),
    },
    {
      n: "03",
      t: t("hero.quickLink3.title"),
      d: t("hero.quickLink3.description"),
    },
    {
      n: "04",
      t: t("hero.quickLink4.title"),
      d: t("hero.quickLink4.description"),
    },
  ];

  const advantages = [
    {
      t: t("hero.advantageSection.advantage1.title"),
      d: t("hero.advantageSection.advantage1.description"),
    },
    {
      t: t("hero.advantageSection.advantage2.title"),
      d: t("hero.advantageSection.advantage2.description"),
    },
    {
      t: t("hero.advantageSection.advantage3.title"),
      d: t("hero.advantageSection.advantage3.description"),
    },
  ];

  const getServiceTitle = (s: ServiceItem) =>
    language === "ar" ? s.short_name : s.name;
  const getServiceDesc = (s: ServiceItem) =>
    language === "ar" ? s.short_description : s.description;

  const getProjectTitle = (p: Product) =>
    language === "ar" ? p.short_description : p.name;
  const getProjectCategory = (p: Product) => {
    const cat = categories.find((c) => c.id === p.category_id);
    return cat ? (language === "ar" ? cat.description : cat.name) : "";
  };

  return (
    <div className="flex flex-col bg-[#201213] dark:bg-[#201213] light:bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-105"
            style={{ backgroundImage: `url(${heroimage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#201213]/70 via-[#201213]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#201213]/70 via-transparent to-[#201213]/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-20">
          <div className="max-w-4xl flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight break-words">
              {t("hero.title1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
                {t("hero.title2")}
              </span>
              <br />
              {t("hero.title3")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-full font-normal leading-relaxed border-l-4 border-primary pl-4 sm:pl-6">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link
                to="/portfolio"
                className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50"
              >
                <div className="relative z-10 flex items-center gap-2 font-bold tracking-wide">
                  <span>{t("hero.exploreWork")}</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </Link>
              <Link
                to="/about"
                className="group flex items-center gap-2 rounded-lg border border-white/20 dark:border-white/20 light:border-gray-300 bg-white/5 dark:bg-white/5 light:bg-gray-100 px-8 py-4 text-white dark:text-white light:text-gray-900 backdrop-blur-sm transition-all hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-200"
              >
                <span className="font-bold tracking-wide">
                  {t("hero.ourStory")}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="absolute bottom-0 w-full z-20 border-t border-white/5 dark:border-white/5 light:border-gray-200 bg-background-dark/80 dark:bg-background-dark/80 light:bg-white/90 backdrop-blur-md hidden lg:block">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-4 divide-x divide-white/10 dark:divide-white/10 light:divide-gray-200">
              {quickLinks.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 group cursor-pointer hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-black text-white/10 dark:text-white/10 light:text-gray-300 group-hover:text-primary transition-colors">
                      {item.n}
                    </span>
                    <div>
                      <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-sm uppercase tracking-wider mb-1">
                        {item.t}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 line-clamp-1">
                        {item.d}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-[#201213]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
                {t("hero.servicesSection.label")}
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                {t("hero.servicesSection.title")}
              </h3>
            </div>
            <Link
              to="/services"
              className="text-gray-400 hover:text-white flex items-center gap-2 font-bold mt-4 md:mt-0"
            >
              {t("hero.servicesSection.viewAllServices")}{" "}
              <span className="material-symbols-outlined">arrow_outward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loadingServices ? (
              <p className="text-white">Loading...</p>
            ) : (
              services.map((s) => (
                <div
                  key={s.id}
                  className="group p-6 sm:p-8 rounded-2xl bg-card-dark border border-white/5 hover:border-primary/50 flex flex-col"
                >
                  <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">
                      {s.icon || "design_services"}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {getServiceTitle(s)}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getServiceDesc(s)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-[#201213]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
              {t("hero.portfolioSection.label")}
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {t("hero.portfolioSection.title")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {loadingPortfolio ? (
              <p className="text-white">Loading...</p>
            ) : (
              portfolioProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-card-dark cursor-pointer flex flex-col"
                >
                  <img
                    src={proj.images || "https://via.placeholder.com/600x400"}
                    alt={getProjectTitle(proj)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                      {getProjectCategory(proj)}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
                      {getProjectTitle(proj)}
                    </h4>
                    <div className="flex items-center gap-1 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("hero.portfolioSection.viewCaseStudy")}{" "}
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-block border-b-2 border-primary text-white font-bold pb-1 hover:text-primary transition-colors"
            >
              {t("hero.portfolioSection.exploreFullPortfolio")}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Quote */}
      <section className="py-24 px-6 lg:px-12 bg-primary/5 dark:bg-primary/5 light:bg-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[20rem]">
            format_quote
          </span>
        </div>
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <span className="material-symbols-outlined text-5xl text-primary mb-8">
            star
          </span>
          <h4 className="text-2xl md:text-4xl font-medium text-white dark:text-white light:text-gray-900 italic leading-relaxed mb-12">
            "اشتغلنا مع الفريق على مشروع التطبيق الخاص بينا، وكانوا ملتزمين بكل
            تفاصيل التصميم والـ UI/UX. التجربة كلها كانت سلسة واحترافية جدًا."
          </h4>
          <div className="flex flex-col items-center">
            <div
              className="size-16 rounded-full bg-cover bg-center border-2 border-primary mb-4"
              style={{
                backgroundImage:
                  "url('https://randomuser.me/api/portraits/men/32.jpg')",
              }}
            />
            <p className="text-white dark:text-white light:text-gray-900 font-bold text-lg">
              أحمد سامي
            </p>
            <p className="text-primary text-sm font-bold uppercase tracking-widest">
              مالك مشروع تجاري
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 lg:px-12 bg-[#201213] dark:bg-[#201213] light:bg-gray-50">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-br from-[#311c1d] dark:from-[#311c1d] light:from-gray-100 to-[#201213] dark:to-[#201213] light:to-gray-50 rounded-3xl border border-white/5 dark:border-white/5 light:border-gray-200 p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white dark:text-white light:text-gray-900 mb-8">
            {t("hero.cta.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {t("hero.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/201094321637?text=" +
                    encodeURIComponent("مرحبًا! أريد الاستفسار عن خدماتكم."),
                  "_blank"
                )
              }
              className="bg-primary hover:bg-primary-dark text-white font-black px-12 py-5 rounded-xl shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1"
            >
              {t("hero.cta.startConversation")}
            </button>
            <Link
              to="/services"
              className="border border-white/20 dark:border-white/20 light:border-gray-300 hover:border-white dark:hover:border-white light:hover:border-gray-900 text-white dark:text-white light:text-gray-900 font-bold px-12 py-5 rounded-xl transition-all"
            >
              {t("hero.cta.ourServices")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
