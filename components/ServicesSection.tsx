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

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [pausedCards, setPausedCards] = useState<Record<number, boolean>>({});

  const getTitle = (s: ServiceItem) =>
    language === "ar" ? s.short_name : s.name;
  const getDesc = (s: ServiceItem) =>
    language === "ar" ? s.short_description : s.description;

  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);

        if (variant === "full") {
          data.forEach((service: ServiceItem) => {
            setFlippedCards((prev) => ({ ...prev, [service.id]: false }));
            const randomDelay = Math.random() * 1500;
            setTimeout(() => {
              setInterval(() => {
                setFlippedCards((prev) => {
                  if (pausedCards[service.id])
                    return { ...prev, [service.id]: false };
                  return { ...prev, [service.id]: !prev[service.id] };
                });
              }, 5000);
            }, randomDelay);
          });
        }
      })
      .catch(() => setLoading(false));
  }, [variant, pausedCards]);

  const displayServices =
    variant === "compact" ? services.slice(0, limit) : services;

  if (loading)
    return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <>
      {variant === "full" && (
        <style>{`
          .flip-card {
            perspective: 1200px;
          }
          .flip-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.9s ease-in-out;
            will-change: transform;
          }
          .flip-card.flipped .flip-inner {
            transform: rotateY(180deg);
          }
          .flip-front,
          .flip-back {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: 12px;
          }
          .flip-back {
            transform: rotateY(180deg);
          }
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
          {/* Header */}
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
                  className="text-gray-400 hover:text-white flex items-center gap-2 font-bold mt-4 md:mt-0"
                >
                  {viewAllText || t("hero.servicesSection.viewAllServices")}{" "}
                  <span className="material-symbols-outlined">
                    arrow_outward
                  </span>
                </Link>
              )}
            </div>
          )}

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
            {variant === "compact" &&
              displayServices.map((s) => (
                <div
                  key={s.id}
                  className="group p-6 sm:p-8 rounded-2xl bg-card-dark border border-white/5 hover:border-primary/50 flex flex-col"
                >
                  <div className="size-14 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-all shrink-0">
                    {s.image ? (
                      <img
                        src={s.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" aria-hidden />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {getTitle(s)}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getDesc(s)}
                  </p>
                </div>
              ))}

            {variant === "full" &&
              displayServices.map((service) => (
                <div
                  key={service.id}
                  className={`flip-card h-[320px] ${flippedCards[service.id] ? "flipped" : ""}`}
                  onMouseEnter={() =>
                    setPausedCards((prev) => ({ ...prev, [service.id]: true }))
                  }
                  onMouseLeave={() =>
                    setPausedCards((prev) => ({ ...prev, [service.id]: false }))
                  }
                >
                  <div className="flip-inner">
                    <div className="flip-front bg-card-dark border border-white/5 p-8 flex flex-col gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-primary/10">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full bg-white/5"
                            aria-hidden
                          />
                        )}
                      </div>
                      <h3 className="text-white text-xl font-bold">
                        {getTitle(service)}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {getDesc(service)}
                      </p>
                    </div>
                    <div className="flip-back overflow-hidden bg-card-dark">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={getTitle(service)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center bg-card-dark"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
