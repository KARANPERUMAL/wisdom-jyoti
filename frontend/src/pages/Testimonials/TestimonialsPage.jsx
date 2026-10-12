import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { preschoolTestimonials } from "../../data/testimonials";

export function TestimonialsPage() {
  return (
    <section className="page-section-v2 testimonials-page importance-page">
      <div className="section-heading center" data-reveal>
        <p className="eyebrow red-eyebrow">Why Preschool Matters</p>
        <h2>Early childhood education shapes confidence before school begins.</h2>
      </div>

      <div data-reveal style={{ width: "100%", marginBlock: "1.5rem" }}>
        <AnimatedTestimonials testimonials={preschoolTestimonials} autoplay={true} />
      </div>

      <div className="brain-path" data-reveal>
        <span>New sounds</span>
        <i />
        <span>New words</span>
        <i />
        <span>New friends</span>
        <i />
        <span>New confidence</span>
      </div>
    </section>
  );
}

export default TestimonialsPage;
