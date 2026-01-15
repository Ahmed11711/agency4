import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";

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

  // States
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

  // Fetch Portfolio (Categories + Products)
  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const allProducts = data.flatMap((c: Category) => c.products);
        setPortfolioProjects(allProducts.slice(0, 3)); // نعرض 3 مشاريع فقط في الهيرو
        setLoadingPortfolio(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPortfolio(false);
      });
  }, []);

  // Quick Links (Static)
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

  // Advantages Section (Static)
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

  // Helpers for language
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
      {/* Hero Main Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-8 lg:px-12 pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20s] ease-linear"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxkQYNXa1ppqeGoxg1MXwuIpi26E5rGrDedYXjUxYMsewL9dg25Q6aQdP9VkmTqEaOIE5_euwxRQD8krKs-Z0xITikRgD4E5HCe38vExK1NonNu7Po7oCD-UBsmiSFqp7KWjPbivzF5NaH7qF3u2qtVdis4YbIuij1SOrvGuf16d1z3Bdv8xPWtRBFIiOd21bXxQIrfj7XzH6r0IFj-kNsA49LWyLZhKwk46Nugcp57hzgDy88lDkvMYMuPpLkPvyITReDKcU7Tzk')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#201213]/80 via-[#201213]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#201213]/80 via-transparent to-[#201213]/60"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight">
            {t("hero.title1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
              {t("hero.title2")}
            </span>
            <br />
            {t("hero.title3")}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed border-l-4 border-primary pl-4 sm:pl-6">
            {t("hero.subtitle")}
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {quickLinks.map((q) => (
              <div
                key={q.n}
                className="flex flex-col bg-card-dark rounded-xl p-4 w-full sm:w-auto border border-white/5"
              >
                <span className="text-primary font-bold text-lg">{q.n}</span>
                <h4 className="text-white font-bold text-base mt-1">{q.t}</h4>
                <p className="text-gray-400 text-sm mt-1">{q.d}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <Link
              to="/portfolio"
              className="group relative overflow-hidden rounded-lg bg-primary px-6 sm:px-8 py-3 sm:py-4 text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50 w-full sm:w-auto text-center"
            >
              <div className="flex items-center justify-center gap-2 font-bold tracking-wide">
                <span>{t("hero.exploreWork")}</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </Link>

            <Link
              to="/about"
              className="group flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 sm:px-8 py-3 sm:py-4 text-white text-center w-full sm:w-auto justify-center transition-all hover:bg-white/10"
            >
              <span className="font-bold tracking-wide">
                {t("hero.ourStory")}
              </span>
            </Link>
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

          <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {loadingServices ? (
              <p className="text-white">Loading...</p>
            ) : (
              services.map((s) => (
                <div
                  key={s.id}
                  className="min-w-[250px] group p-6 sm:p-8 rounded-2xl bg-card-dark border border-white/5 hover:border-primary/50 transition-all flex-shrink-0"
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

      {/* Advantages Section */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-[#201213]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="bg-card-dark p-8 rounded-2xl border border-white/5"
            >
              <h4 className="text-white font-bold text-xl mb-2">{adv.t}</h4>
              <p className="text-gray-400 text-sm">{adv.d}</p>
            </div>
          ))}
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

          <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {loadingPortfolio ? (
              <p className="text-white">Loading...</p>
            ) : (
              portfolioProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-card-dark cursor-pointer min-w-[250px] flex-shrink-0"
                >
                  <img
                    src={
                      proj.images?.[0] || "https://via.placeholder.com/600x400"
                    }
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

      {/* باقي الأقسام مثل Testimonials أو Final CTA ممكن تترك كما هي */}
    </div>
  );
};

export default Hero;
