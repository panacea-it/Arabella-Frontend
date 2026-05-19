import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogsPage.module.css";
import { blogs, blogsHeroImage } from "./blogsData";

const categories = [
  "All",
  "Accommodation",
  "Travel Guide",
  "Airport Stay",
  "Tweed Heads",
];

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];

  return (
    <div className={styles.blogPage}>
      <section
        className={styles.heroSection}
        style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)), url(${blogsHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.heroContent}>

          <h1>Travel Tips, Accommodation Guides & Local Insights</h1>

          <p>
            Explore helpful articles about staying near Gold Coast Airport,
            holiday accommodation in Tweed Heads, and choosing the right stay for
            a comfortable trip.
          </p>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Featured Article</span>
            <h2>Latest From Our Blog</h2>
          </div>

          <div className={styles.featuredCard}>
            <Link
              to={`/blogs/${featuredBlog.slug}`}
              className={styles.featuredImage}
            >
              <img src={featuredBlog.image} alt={featuredBlog.title} />
            </Link>

            <div className={styles.featuredContent}>
              <div className={styles.blogMeta}>
                <span className={styles.category}>{featuredBlog.category}</span>
                <span>{featuredBlog.date}</span>
                <span>{featuredBlog.readTime}</span>
              </div>

              <Link
                to={`/blogs/${featuredBlog.slug}`}
                className={styles.featuredTitleLink}
              >
                {featuredBlog.title}
              </Link>

              <p>{featuredBlog.shortDescription}</p>

              <Link
                to={`/blogs/${featuredBlog.slug}`}
                className={styles.readButton}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.blogListSection}>
        <div className={styles.container}>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? styles.activeTab : ""}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.blogGrid}>
            {filteredBlogs.map((blog) => (
              <div className={styles.blogCard} key={blog.id}>
                <Link to={`/blogs/${blog.slug}`} className={styles.blogImage}>
                  <img src={blog.image} alt={blog.title} />

                  <span className={styles.blogCategory}>{blog.category}</span>
                </Link>

                <div className={styles.blogContent}>
                  <div className={styles.blogInfo}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <Link
                    to={`/blogs/${blog.slug}`}
                    className={styles.blogTitleLink}
                  >
                    {blog.title}
                  </Link>

                  <p>{blog.shortDescription}</p>

                  <Link
                    to={`/blogs/${blog.slug}`}
                    className={styles.cardReadBtn}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div>
              <span>Stay Updated</span>
              <h2>Get Travel & Accommodation Tips</h2>
              <p>
                Stay connected with Arabella Motor Inn for helpful travel
                guides, local destination tips, and accommodation updates.
              </p>
            </div>

            <div className={styles.subscribeBox}>
              <input type="email" placeholder="Enter your email" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;