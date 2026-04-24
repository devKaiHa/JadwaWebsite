import React from "react";
import { useTranslation } from "react-i18next";

const LoadingCard = () => {
  const { t } = useTranslation();

  return (
    <div
      className="card loading-card"
      role="status"
      aria-live="polite"
      aria-label={t("loadingCard.company")}
    >
      <div className="card-right">
        <div className="spinner" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
