import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";

export interface ServiceItem {
  id: number;
  name: string;
  short_name: string;
  description: string;
  short_description: string;
  image?: string | null;
  icon?: string;
  category_id: number; // ← لازم يكون موجود
}

export interface ServicesSectionProps {
  variant: "compact" | "full";
  limit?: number;
  label?: string;
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  variant,
  limit = 6,
  label,
  title,
  subtitle,
  viewAllHref,
  viewAllText,
}) => {
  const { t, language } = useI18n();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = (s: ServiceItem) =>
    language === "ar" ? s.short_name : s.name;
  const getDesc = (s: ServiceItem) =>
    language === "ar" ? s.short_description : s.description;

  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/services")
      .then((res) => res.json())
      .then((data: ServiceItem[]) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayServices =
    variant === "compact" ? services.slice(0, limit) : services;

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <>
      {variant === "full" && (
        <style>{`
          .flip-card { perspective: 1200px; }
          .flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: autoFlip 8s infinite cubic-bezier(0.4, 0, 0.2, 1); will-change: transform; }
          .flip-card:hover .flip-inner { animation-play-state: paused; }
          @keyframes autoFlip { 0% { transform: rotateY(0deg); } 45% { transform: rotateY(0deg); } 55% { transform: rotateY(180deg); } 95% { transform: rotateY(180deg); } 100% { transform: rotateY(0deg); } }
          .flip-front, .flip-back { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 16px; }
          .flip-back { transform: rotateY(180deg); }
        `}</style>
      )}

      <section
        className={
          variant === "full"
            ? "pt-32 pb-24 px-6 bg-[#201213]"
            : "py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-[#201213]"
        }
        aria-label={variant === "compact" ? label || title : title}
      >
        <div
          className={
            variant === "full"
              ? "max-w-[1280px] mx-auto"
              : "max-w-[1440px] mx-auto"
          }
        >
          {/* Header Compact */}
          {variant === "compact" && (label || title || viewAllHref) && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="max-w-2xl">
                {label && (
                  <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
                    {label}
                  </h2>
                )}
                {title && (
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    {title}
                  </h3>
                )}
              </div>
              {viewAllHref && (
                <Link
                  to={viewAllHref}
                  className="text-gray-400 hover:text-white flex items-center gap-2 font-bold"
                >
                  {viewAllText || t("hero.servicesSection.viewAllServices")}
                  <span className="material-symbols-outlined">
                    arrow_outward
                  </span>
                </Link>
              )}
            </div>
          )}

          {/* Header Full */}
          {variant === "full" && (title || subtitle) && (
            <div className="text-center mb-16">
              {title && (
                <h1 className="text-white text-5xl font-black mb-6">{title}</h1>
              )}
              {subtitle && (
                <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          {/* Grid */}
          <div
            className={
              variant === "compact"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {/* Compact Cards */}
            {variant === "compact" &&
              displayServices.map((s) => (
                <div
                  key={s.id}
                  className="p-6 rounded-2xl bg-card-dark border border-white/5"
                >
                  <h4 className="text-xl font-bold text-white mb-2">
                    {getTitle(s)}
                  </h4>
                  <p className="text-gray-400 text-sm">{getDesc(s)}</p>
                </div>
              ))}

            {/* Full Flip Cards with Link */}
            {variant === "full" &&
              displayServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/portfolio?category_id=${service.category_id}`} // ← هنا
                  className="flip-card h-[320px]"
                >
                  <div className="flip-inner">
                    <div className="flip-front bg-card-dark border border-white/5 p-8 flex flex-col gap-4">
                      <div className="h-14 w-14 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
                        {service.icon ? (
                          <img
                            src={service.icon}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5" />
                        )}
                      </div>

                      <h3 className="text-white text-xl font-bold">
                        {getTitle(service)}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {getDesc(service)}
                      </p>
                    </div>

                    <div className="flip-back bg-card-dark overflow-hidden">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={getTitle(service)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-card-dark" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
