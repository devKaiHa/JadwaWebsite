"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetContactInfoQuery,
  useSendMessageMutation,
} from "@/RTK/Api/Contact/ContactApi";
import LoadingCard from "@/components/utils/LoadingCard";

const requestTypeValues = [
  "investment-inquiry",
  "partnership",
  "media",
  "support",
];

const localize = (value, lang) =>
  value?.[lang] || value?.en || value?.ar || value?.tr || "";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const requestTypeOptions = requestTypeValues.map((value) => ({
    value,
    label: t(`contactPage.requestTypes.${value}`),
  }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    requestType: "investment-inquiry",
    message: "",
  });

  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });

  const {
    data: response,
    isLoading: isLoadingContact,
    isError: isContactError,
    refetch,
  } = useGetContactInfoQuery();

  const [sendMessage, { isLoading: isSubmitting }] = useSendMessageMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const contact = response?.data || {};

  const branches = useMemo(
    () =>
      Array.isArray(contact?.branches)
        ? [...contact.branches]
            .filter((item) => item?.isActive !== false)
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
        : [],
    [contact?.branches],
  );

  const handleChange = (field) => (e) => {
    setFormData((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      requestType: "investment-inquiry",
      message: "",
    });
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setSubmitState({
      type: "",
      message: "",
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return t("contactPage.validation.name");
    if (!formData.email.trim()) return t("contactPage.validation.email");
    if (!formData.message.trim()) return t("contactPage.validation.message");
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitState({
        type: "error",
        message: validationError,
      });
      return;
    }

    try {
      const result = await sendMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        requestType: formData.requestType,
        message: formData.message.trim(),
      }).unwrap();

      setShowSuccess(true);
      setSubmitState({
        type: "success",
        message: result?.message || t("contactPage.success.messageSent"),
      });
      clearForm();
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error?.data?.message ||
          error?.error ||
          t("contactPage.validation.submitError"),
      });
    }
  };

  if (isLoadingContact) return <LoadingCard />;

  if (isContactError) {
    return (
      <section className="jadwa-contact-v2">
        <div className="auto-container">
          <div className="jadwa-contact-v2-error">
            <h3>{t("contactPage.error.title")}</h3>
            <p>{t("contactPage.error.description")}</p>
            <button
              type="button"
              className="jadwa-contact-v2-submit"
              onClick={() => refetch()}
            >
              {t("contactPage.retry")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="jadwa-contact-v2">
      <div className="auto-container">
        <div className="jadwa-contact-v2-shell">
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--one" />
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--two" />
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--three" />

          <div className="jadwa-contact-v2-panel">
            <div className="jadwa-contact-v2-info">
              <div className="jadwa-contact-v2-info-inner">
                <div className="jadwa-pill jadwa-contact-v2-pill-dark">
                  <span className="jadwa-pill-dot" />
                  <span>{t("contactPage.infoKicker")}</span>
                </div>

                <h2 className="jadwa-contact-v2-title">
                  {t("contactPage.infoTitle")}
                </h2>

                <p className="jadwa-contact-v2-text">
                  {t("contactPage.infoDescription")}
                </p>

                <div className="jadwa-contact-v2-list">
                  {contact?.address ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-location-dot" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>{t("contactPage.address")}</h4>
                        <p>{localize(contact.address, lang)}</p>
                        {contact?.mapLink ? (
                          <a
                            href={contact.mapLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("contactPage.openMap")}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {Array.isArray(contact?.emails) &&
                  contact.emails.filter(Boolean).length > 0 ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-envelope" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>{t("contact.email")}</h4>
                        {contact.emails.filter(Boolean).map((item) => (
                          <p key={item}>
                            <a href={`mailto:${item}`}>{item}</a>
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {Array.isArray(contact?.phones) &&
                  contact.phones.filter(Boolean).length > 0 ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-phone" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>{t("contact.phone")}</h4>
                        {contact.phones.filter(Boolean).map((item) => (
                          <p key={item}>
                            <a href={`tel:${item.replace(/\s+/g, "")}`}>
                              {item}
                            </a>
                          </p>
                        ))}
                        {contact?.whatsapp ? (
                          <p>
                            <a
                              href={`https://wa.me/${contact.whatsapp.replace(
                                /[^\d]/g,
                                "",
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {t("contactPage.whatsApp")}: {contact.whatsapp}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="jadwa-contact-v2-form-side">
              <div className="jadwa-contact-v2-form-card">
                <div className="jadwa-pill jadwa-contact-v2-pill-light">
                  <span className="jadwa-pill-dot" />
                  <span>{t("contactPage.formKicker")}</span>
                </div>

                <h3 className="jadwa-contact-v2-form-title">
                  {t("contactPage.formTitle")}
                </h3>

                <form
                  autoComplete="off"
                  onSubmit={submit}
                  className="jadwa-contact-v2-form"
                >
                  <div className="jadwa-contact-v2-fields">
                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.name")}</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange("name")}
                        placeholder={t("contact.name")}
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.email")}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        placeholder={t("contact.email")}
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.phone")}</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        placeholder={t("contact.phone")}
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>{t("contactPage.subject")}</label>
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange("subject")}
                        placeholder={t("contactPage.subject")}
                      />
                    </div>

                    <div className="jadwa-contact-v2-field jadwa-contact-v2-field-full">
                      <label>{t("contactPage.requestType")}</label>
                      <select
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange("requestType")}
                      >
                        {requestTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="jadwa-contact-v2-field jadwa-contact-v2-field-full">
                      <label>{t("contact.message")}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange("message")}
                        placeholder={t("contact.message")}
                      />
                    </div>
                  </div>

                  {submitState.type === "error" && submitState.message ? (
                    <div className="jadwa-contact-v2-error-message">
                      {submitState.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="jadwa-contact-v2-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("contactPage.sending")
                      : t("contactPage.sendMessage")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {branches.length ? (
          <div className="jadwa-contact-v2-branches-section">
            <div className="jadwa-testimonials-head jadwa-contact-v2-branches-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>{t("contactPage.branchesKicker")}</span>
              </div>

              <h2 className="jadwa-testimonials-title">
                {t("contactPage.branchesTitle")}
              </h2>

              <p className="jadwa-testimonials-subtitle">
                {t("contactPage.branchesDescription")}
              </p>
            </div>

            <div className="row clearfix">
              {branches.map((branch) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  key={branch?._id}
                >
                  <div className="jadwa-contact-v2-branch-card">
                    <div className="jadwa-contact-v2-branch-card-top">
                      <div className="jadwa-contact-v2-branch-icon">
                        <i className="fa-solid fa-building" />
                      </div>

                      <div>
                        <h4>{localize(branch?.name, lang)}</h4>
                        <p>{localize(branch?.address, lang)}</p>
                      </div>
                    </div>

                    {branch?.phones?.[0] ? (
                      <a
                        className="jadwa-contact-v2-branch-phone"
                        href={`tel:${branch.phones[0].replace(/\s+/g, "")}`}
                      >
                        {branch.phones[0]}
                      </a>
                    ) : null}

                    <div className="jadwa-contact-v2-branch-card-links">
                      {branch?.mapLink ? (
                        <a
                          href={branch.mapLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("contactPage.map")}
                        </a>
                      ) : null}

                      {branch?.whatsapp ? (
                        <a
                          href={`https://wa.me/${branch.whatsapp.replace(
                            /[^\d]/g,
                            "",
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("contactPage.whatsApp")}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {showSuccess ? (
        <div
          className="jadwa-contact-v2-success-overlay"
          onClick={closeSuccessModal}
        >
          <div
            className="jadwa-contact-v2-success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="jadwa-contact-v2-success-close"
              onClick={closeSuccessModal}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="jadwa-contact-v2-success-icon">
              <i className="fa-solid fa-check" />
            </div>

            <h3>{t("contactPage.success.title")}</h3>

            <p>{t("contactPage.success.description")}</p>

            <button
              type="button"
              onClick={closeSuccessModal}
              className="jadwa-contact-v2-submit"
            >
              {t("contactPage.success.continue")}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ContactForm;
