import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { preschoolTestimonials } from "../../data/testimonials";
import { Helmet } from "react-helmet-async";

export function TestimonialsPage() {
  return (
    <>
       <Helmet>
        <title>Why Preschool Matters | Wisdom Jyoti Preschool</title>
        <meta
          name="description"
          content="Discover how early childhood education helps children develop confidence, language skills, social connections and a strong foundation for future learning at Wisdom Jyoti Preschool."
        />
      </Helmet>
      
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
    </>
  );
}

export default TestimonialsPage;
