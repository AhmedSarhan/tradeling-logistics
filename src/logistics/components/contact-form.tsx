import styles from "@logistics/logistics.module.scss";
import { ICountries } from "@logistics/types";
import { ChangeEvent, FormEvent, useReducer } from "react";

const phoneNums = [
  { label: "(+971) UAE", value: "+971" },
  { label: "(+44) UK", value: "+44" },
  { label: "(+2) EG", value: "+2" },
];
const initialState = {
  ["company-name"]: "",
  email: "",
  ["phone-key"]: "",
  ["phone-number"]: "",
  country: "",
};

const ActionTypes = {
  DEFAULT_CASE: "DEFAULT_CASE",
  PHONE_NUM: "PHONE_NUM",
  COUNTRY: "COUNTRY",
};
const formReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ActionTypes.DEFAULT_CASE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }

    default:
      return state;
  }
};
export const ContactForm = ({ countries }: { countries: ICountries[] }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const changeValueHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: ActionTypes.DEFAULT_CASE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formState,
      phoneNumber: `${formState["phone-key"]}${formState["phone-number"]}`,
    } as { [key: string]: string };

    delete data["phone-key"];
    delete data["phone-number"];
    alert(JSON.stringify(data));
  };
  return (
    <section className={styles["contact-form_section"]}>
      <h3>Contact us</h3>
      <p>
        Get expert help and peace of mind whenever you want to get goods to the
        MENA region. We’ll respond within 1-2 working days!
      </p>
      <form onSubmit={formSubmitHandler}>
        <div className={styles["form-group"]}>
          <label htmlFor="company-name">Company Name</label>
          <input
            type="text"
            name="company-name"
            value={formState["company-name"]}
            onChange={changeValueHandler}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={changeValueHandler}
          />
        </div>

        <div className={styles["form-group_grid"]}>
          <div className={styles["form-group"]}>
            <label>Contact Number</label>
            <select
              name="phone-key"
              value={formState["phone-key"]}
              onChange={changeValueHandler}
            >
              {phoneNums.map((phone) => (
                <option key={phone.value} value={phone.value}>
                  {phone.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles["form-group"]}>
            <input
              type="tel"
              name="phone-number"
              value={formState["phone-number"]}
              onChange={changeValueHandler}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label>Country</label>
          <select
            name="country"
            value={formState["country"]}
            onChange={changeValueHandler}
          >
            {countries?.length > 0
              ? countries?.map((country) => (
                  <option key={country.code} value={country.country}>
                    ({country.code}) {country.country}
                  </option>
                ))
              : null}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
