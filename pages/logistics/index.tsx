import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import styles from "./index.module.scss";
import { HeroSection, ContactForm } from "@logistics/components";
import { fetchCountries } from "@logistics/resources";

const Logistics = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <main className={styles["logistics-main"]}>
        <HeroSection />
        <ContactForm countries={props.countries} />
      </main>
    </>
  );
};

export default Logistics;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const countries = await fetchCountries();
  console.log("counfr", countries);
  if (countries) {
    return {
      props: {
        countries,
      },
    };
  }
  return {
    props: {
      countries: [],
    },
  };
};
