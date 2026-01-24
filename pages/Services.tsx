import React from "react";
import { useI18n } from "../contexts/I18nContext";
import ServicesSection from "../components/ServicesSection";

const Services: React.FC = () => {
  const { t } = useI18n();

  return (
    <ServicesSection
      variant="full"
      title={t("services.title")}
      subtitle={t("services.subtitle")}
    />
  );
};

export default Services;
