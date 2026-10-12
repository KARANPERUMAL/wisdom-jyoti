import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { programs } from "../../data/programs";
import { mapUrl } from "../../data/constants";
import { Dropdown } from "../../components/ui/Dropdown";

export function ContactPage({ form, submitted, onChange, onSubmit }) {
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (e) => {
    onSubmit(e);
    setShowForm(false);
  };

  const handleReset = () => {
    setShowForm(true);
  };

  return (
    <>
      <section className="inner-hero contact-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Contact Us</p>
          <h2>Admission enquiry for Wisdom Jyoti.</h2>
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
              This frontend form is ready. In the backend step, it can send the enquiry
              directly to the manager mail ID.
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
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "#065f46",
                  fontSize: "1.4rem",
                  fontWeight: "800",
                }}
              >
                Thank You!
              </h3>
              <p
                style={{
                  margin: "0 0 1.25rem 0",
                  color: "#047857",
                  fontSize: "0.96rem",
                  lineHeight: "1.6",
                }}
              >
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
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Parent name
                <input name="parentName" value={form.parentName} onChange={onChange} placeholder="Your name" required />
              </label>
              <label>
                Child name
                <input name="childName" value={form.childName} onChange={onChange} placeholder="Child name" required />
              </label>
              <label>
                Phone number
                <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
              </label>
              <div style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontWeight: 800, color: "var(--ink)" }}>Program</span>
                <Dropdown
                  name="program"
                  value={form.program}
                  onChange={onChange}
                  options={programs.filter((p) => !p.title.toLowerCase().includes("evening"))}
                />
              </div>
              <label className="wide">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
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
