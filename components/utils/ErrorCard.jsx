import React from "react";
import { useTranslation } from "react-i18next";

const ErrorCard = () => {
  const { t } = useTranslation();

  return (
    <div className="card error-card" role="alert" aria-live="assertive">
      <div className="error-emoji" aria-hidden="true">
        !
      </div>

      <div className="card-body">
        <h4 className="error-title">{t("errorCard.title")}</h4>
        <p className="error-text">{t("errorCard.description")}</p>

        <div className="error-actions">
          <button id="retryBtn" className="btn btn-primary">
            {t("contactPage.retry")}
          </button>
          <button id="contactBtn" className="btn btn-ghost">
            {t("errorCard.contactSupport")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
