import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./BlogDetailsPage.module.css";
import { blogs } from "./blogsData";

const BlogDetailsPage = () => {
  const { slug } = useParams();

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className={styles.notFoundPage}>
        <h1>Blog Not Found</h1>
        <p>The blog you are looking for does not exist.</p>
        <Link to="/blogs">Back to Blogs</Link>
      </div>
    );
  }

  const relatedBlogs = blogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  return (
    <div className={styles.detailsPage}>
      <section className={styles.detailsHero}>
        <div className={styles.container}>
          <Link to="/blogs" className={styles.backLink}>
            ← Back to Blogs
          </Link>

          <div className={styles.metaRow}>
            <span>{blog.category}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>

          <h1>{blog.title}</h1>
          <p>{blog.shortDescription}</p>
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className={styles.container}>
          <div className={styles.articleLayout}>
            <article className={styles.articleCard}>
              <div className={styles.articleImage}>
                <img src={blog.bannerImage || blog.image} alt={blog.title} />
              </div>

              <div className={styles.articleContent}>
                {blog.content.map((section, index) => (
                  <div className={styles.contentBlock} key={index}>
                    <h2>{section.heading}</h2>

                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                ))}

                <div className={styles.finalCta}>
                  <h3>Looking for comfortable accommodation?</h3>
                  <p>
                    Choose Arabella Motor Inn for a relaxing stay experience in
                    Tweed Heads with convenient access to nearby destinations.
                  </p>

                  <Link to="/contact" className={styles.contactButton}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h3>Recent Blogs</h3>

                {relatedBlogs.map((item) => (
                  <Link
                    to={`/blogs/${item.slug}`}
                    className={styles.relatedBlog}
                    key={item.id}
                  >
                    <span>{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>{item.readTime}</p>
                  </Link>
                ))}
              </div>

              <div className={styles.sideCard}>
                <h3>Quick Links</h3>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;