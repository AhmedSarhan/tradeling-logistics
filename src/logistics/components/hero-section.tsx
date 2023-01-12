import styles from "@logistics/logistics.module.scss";

export const HeroSection = () => {
  return (
    <>
      <section className={styles["hero-section"]}>
        <h1>Tradeling Logistics</h1>
        <p>
          Comprehensive logistics solutions for sellers and buyers!
          <br />
          Enjoy expert assistance combined with our seamless digital platform.
          We simplify every step of the trade journey from the supplier’s
          location to the product’s final destination, including shipping,
          warehousing and last-mile delivery. For your convenience, logistics
          services are integrated into our checkout.
        </p>
      </section>
    </>
  );
};
