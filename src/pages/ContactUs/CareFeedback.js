import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CareFeedback.module.css";
import { MessageSquare } from "lucide-react";

const CareFeedback = () => {
  const [activeType, setActiveType] = useState("feedback");

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+61 (AU)",
    dateOfStay: "",
    comments: "",
    subject: "",
    suggestionDetails: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      mobile,
      countryCode,
      dateOfStay,
      comments,
      subject,
      suggestionDetails,
    } = formData;

    let mailtoLink = "";
    const subjectLine =
      activeType === "feedback"
        ? `Feedback from ${name}`
        : `Suggestion: ${subject || "General"}`;

    let body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A`;

    if (activeType === "feedback") {
      body += `Mobile: ${countryCode} ${mobile}%0D%0A`;
      body += `Hotel: Arabella Motor Inn%0D%0A`;
      if (dateOfStay) body += `Date of Stay: ${dateOfStay}%0D%0A`;
      body += `Comments:%0D%0A${comments}`;

      mailtoLink = `mailto:arabellamotorinn@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
    } else {
      // Suggestion
      body += `Topic: ${subject}%0D%0A`;
      body += `Suggestion Details:%0D%0A${suggestionDetails}`;

      mailtoLink = `mailto:arabellamotorinn@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
    }

    // Open default mail client
    window.location.href = mailtoLink;
  };

  return (
    <section
      className={styles.careSection}
      style={{ backgroundImage: 'url("/images/arabella.jpg")' }}
    >
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.careTitle}>CARE@ARABELLA</h2>
          <p className={styles.careDesc}>
            Share your thoughts, feedback and suggestions through our
            easy-to-use online form designed to capture your Arabella
            experience.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tabs */}
          <div className={styles.tabsRow}>
            <button
              className={`${styles.tabBtn} ${activeType === "feedback" ? styles.activeTab : ""
                }`}
              onClick={() => setActiveType("feedback")}
              type="button"
            >
              FEEDBACK
            </button>
            <button
              className={`${styles.tabBtn} ${activeType === "suggestion" ? styles.activeTab : ""
                }`}
              onClick={() => setActiveType("suggestion")}
              type="button"
            >
              SUGGESTIONS
            </button>
          </div>

          <form className={styles.formGrid} onSubmit={handleSubmit}>

            {/* --- COMMON FIELDS (Name & Email) --- */}
            <div className={styles.inputGroup}>
              <label>NAME*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>EMAIL*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={styles.input}
                required
              />
            </div>

            {/* --- FEEDBACK FORM SPECIFIC --- */}
            {activeType === "feedback" && (
              <>
                <div className={styles.inputGroup}>
                  <label>MOBILE NUMBER*</label>
                  <div className={styles.phoneInputWrapper}>
                    <select
                      className={styles.countrySelect}
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                    >
                      <option>+61 (AU)</option>
                      <option>+91 (IN)</option>
                      <option>+1 (US)</option>
                    </select>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className={styles.phoneInput}
                      required
                    />
                  </div>
                </div>

                {/* <div className={styles.inputGroup}>
                  <label>HOTEL*</label>
                  <input
                    type="text"
                    value="Arabella Motor Inn"
                    readOnly
                    className={styles.input}
                    style={{ backgroundColor: "rgba(255,255,255,0.7)", cursor: "default" }}
                  />
                </div> */}

                <div className={styles.inputGroup}>
                  <label>DATE OF STAY</label>
                  <input
                    type="date"
                    name="dateOfStay"
                    value={formData.dateOfStay}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>COMMENTS / FEEDBACK</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Tell us about your stay..."
                    className={styles.textarea}
                  ></textarea>
                </div>
              </>
            )}

            {/* --- SUGGESTION FORM SPECIFIC --- */}
            {activeType === "suggestion" && (
              <>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>SUBJECT / TOPIC</label>
                  <select
                    className={styles.input}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a topic...</option>
                    <option value="website">Website / Online Booking</option>
                    <option value="service">Customer Service</option>
                    <option value="amenities">Rooms & Amenities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>SUGGESTION DETAILS</label>
                  <textarea
                    name="suggestionDetails"
                    value={formData.suggestionDetails}
                    onChange={handleChange}
                    placeholder="How can we improve? Share your ideas..."
                    className={styles.textarea}
                  ></textarea>
                </div>
              </>
            )}

            <div className={`${styles.checkboxRow} ${styles.fullWidth}`}>
              <input type="checkbox" id="privacy" className={styles.checkbox} required />
              <label htmlFor="privacy">
                I have read and agree to the{" "}
                <a href="/privacy">Privacy Policy</a> and{" "}
                <a href="/terms">Terms & Conditions</a>
              </label>
            </div>

            <div className={`${styles.submitRow} ${styles.fullWidth}`}>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT
              </button>
            </div>
          </form>
        </motion.div>

        <a
          href="https://wa.me/61755243111"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.chatIcon}
        >
          <MessageSquare size={24} color="white" />
        </a>
      </div>
    </section>
  );
};

export default CareFeedback;
