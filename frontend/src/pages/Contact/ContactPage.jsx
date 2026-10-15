import { useState } from "react";
import logo from "../../assets/images/logo.webp";
import { programs } from "../../data/programs";
import { mapUrl } from "../../data/constants";
import { Dropdown } from "../../components/ui/Dropdown";
import { Helmet } from "react-helmet-async";

export function ContactPage({ form, submitted, onChange, onSubmit }) {
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.parentName.trim()) e.parentName = "Parent name is required";
    if (!form.childName.trim())  e.childName  = "Child name is required";
    if (!form.phone.trim())      e.phone      = "Phone number is required";
    return e;
  };

  const handleChange = (ev) => {
    onChange(ev);
    if (errors[ev.target.name]) {
      setErrors((prev) => ({ ...prev, [ev.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(e);
    setShowForm(false);
  };

  const handleReset = () => {
    setShowForm(true);
    setErrors({});
  };

  /* helper: input border colour */
  const inputStyle = (field) => ({
    borderColor: errors[field] ? "#ef1118" : undefined,
    boxShadow:   errors[field] ? "0 0 0 3px rgba(239,17,24,0.12)" : undefined,
  });

  return (
    <>

      <Helmet>
      <title>Contact Wisdom Jyoti Preschool | Bengaluru</title>

      <meta
        name="description"
        content="Contact Wisdom Jyoti Preschool in Mahalakshmipuram, Bengaluru, for admissions enquiries. Find our school location, contact numbers and programme information."
      />
    </Helmet>

      <section className="inner-hero contact-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Contact Us</p>
          <h1>Admission enquiry for Wisdom Jyoti.</h1>
          <p>
            Wisdom Jyoti, 274, 2nd Main Rd, West of Chord Road 2nd Stage,
            Mahalakshmipuram, Bengaluru, Karnataka 560086
          </p>
          <div className="contact-phone-bar" style={{ marginTop: "0.85rem" }}>
            <span style={{ fontWeight: 800, color: "var(--red)" }}>Call Us directly: </span>
            <a href="tel:9738981455" className="contact-phone-link">9738981455</a>
            <span style={{ marginInline: "0.4rem" }}>/</span>
            <a href="tel:6362424401" className="contact-phone-link">6362424401</a>
          </div>
        </div>
        <div className="contact-logo-only" data-reveal>
          <img src={logo} alt="Wisdom Jyoti logo" />
        </div>
      </section>

      <section className="page-section-v2 enquiry-page">
        <div className="form-panel" data-reveal>
          <div>
            <p className="eyebrow">Admission Form</p>
            <h2>Tell us about your child.</h2>
            <p>
              Fill in the details with the age category of your child and submit the
              application. Our team will contact you soon with the best-suited program
              for your child.
            </p>
            <div className="contact-actions">
              <a className="paint-button" href={mapUrl} target="_blank" rel="noreferrer">
                Open Map <span aria-hidden="true">-&gt;</span>
              </a>
              <a
                className="text-button"
                href="https://www.instagram.com/wisdom_jyoti?psln=MWJmdDlianU2eTU5cQ=="
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>

          {submitted && !showForm ? (
            <div
              style={{
                background: "#ecfdf5",
                border: "2px solid #10b981",
                borderRadius: "14px",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#10b981",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  margin: "0 auto 1rem auto",
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#065f46", fontSize: "1.4rem", fontWeight: "800" }}>
                Thank You!
              </h3>
              <p style={{ margin: "0 0 1.25rem 0", color: "#047857", fontSize: "0.96rem", lineHeight: "1.6" }}>
                Your admission enquiry for Wisdom Jyoti has been received successfully.
                Our team will contact you shortly.
              </p>
              <button
                onClick={handleReset}
                style={{
                  padding: "0.65rem 1.4rem",
                  borderRadius: "999px",
                  border: "2px solid #065f46",
                  background: "#065f46",
                  color: "#ffffff",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label>
                Parent name
                <input
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle("parentName")}
                />
                {errors.parentName && <span className="field-error-text">{errors.parentName}</span>}
              </label>

              <label>
                Child name
                <input
                  name="childName"
                  value={form.childName}
                  onChange={handleChange}
                  placeholder="Child name"
                  style={inputStyle("childName")}
                />
                {errors.childName && <span className="field-error-text">{errors.childName}</span>}
              </label>

              <label>
                Phone number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  style={inputStyle("phone")}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>

              {/* div instead of label – label wrapping a custom dropdown causes double-click toggle bug */}
              <div className="form-field-group">
                <span className="form-field-label">Program</span>
                <Dropdown
                  name="program"
                  value={form.program}
                  onChange={handleChange}
                  options={programs.filter((p) => !p.title.toLowerCase().includes("evening"))}
                  variant="contact"
                />
              </div>

              <label className="wide">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Preferred timing, age, or anything you want us to know"
                  rows="4"
                />
              </label>

              <button className="paint-button wide" type="submit">
                Send Enquiry <span aria-hidden="true">-&gt;</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default ContactPage;
