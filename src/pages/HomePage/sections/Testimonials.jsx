import React, { useState, useRef } from "react";
import ClientStoriesCard from "../../../components/ClientStoriesCard/ClientStoriesCard";
import styles from "./Testimonials.module.css";

const stories = [
  {
    name: "CLINTON (GOOGLE REVIEW, 5 MONTHS AGO)",
    image: "https://i.pravatar.cc/300?img=8",
    text: "Great service, lovely rooms, highly recommend. Rooms 5.0, Service 5.0, Location 5.0.",
  },
  {
    name: "EMMA WILSON",
    image: "https://i.pravatar.cc/300?img=12",
    text: "Stayed for a short trip and everything was smooth from check-in to checkout. Clean room and very friendly staff. 5/5.",
  },
  {
    name: "JASON THOMAS",
    image: "https://i.pravatar.cc/300?img=15",
    text: "Comfortable bed, tidy bathroom, and a peaceful night. Great value for the location and service quality. 5/5.",
  },
  {
    name: "SOPHIE ANDERSON",
    image: "https://i.pravatar.cc/300?img=21",
    text: "Excellent stopover option with easy parking and polite hosts. Room was neat and exactly what we needed. 5/5.",
  },
  {
    name: "GOOGLE GUEST 5",
    image: "https://i.pravatar.cc/300?img=26",
    text: "Quick check-in, quiet atmosphere, and reliable amenities. We would definitely choose this place again. 5/5.",
  },
  {
    name: "GEOFF COY",
    image: "https://i.pravatar.cc/300?img=31",
    text: "Very convenient location and welcoming team. The room was clean and comfortable throughout our stay. 5/5.",
  },
  {
    name: "KAREN BROWN",
    image: "https://i.pravatar.cc/300?img=37",
    text: "Great hospitality and hassle-free experience. Everything was well maintained and easy to access. 5/5.",
  },
  {
    name: "CLAIRE HOGLAND",
    image: "https://i.pravatar.cc/300?img=42",
    text: "Loved the overall stay: clean rooms, friendly service, and a convenient base for local travel. 5/5.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (stories.length <= 1) return;
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      if (totalWidth <= 0) return;
      const progress = scrollLeft / totalWidth;
      const index = Math.min(
        stories.length - 1,
        Math.max(0, Math.round(progress * (stories.length - 1)))
      );
      setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (stories.length <= 1) return;
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      if (totalWidth <= 0) return;
      const targetScroll = (index / (stories.length - 1)) * totalWidth;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Google 5-Star Reviews</h2>

        <div
          className={styles.scrollContainer}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {stories.map((story, idx) => (
            <ClientStoriesCard
              key={idx}
              name={story.name}
              image={story.image}
              text={story.text}
            />
          ))}
        </div>

        {stories.length > 1 && (
          <div className={styles.dotsContainer}>
            {stories.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ""}`}
                onClick={() => scrollTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div className={styles.googleLinkWrap}>
          <a
            href="https://www.google.com/travel/hotels/entity/CgsIgevylvbdmoe6ARAB/reviews?q=arabella%20motor%20inn&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764%2C121529350&hl=en-IN&gl=in&ssta=1&ts=CAEaSQorEicyJTB4NmI5MGZmYzgxZmNkMGM2ZDoweGJhMGU2YWVmNjJkY2I1ODEaABIaEhQKBwjqDxAFGBYSBwjqDxAFGBcYATICEAAqCQoFOgNJTlIaAA&qs=CAE4AkIJCYG13GLvag66QgkJgbXcYu9qDro&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.googleLink}
          >
            View More Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
