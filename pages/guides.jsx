import { useContext, useEffect, useState } from "react";
import AuthContext from "../Stores/AuthContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to see this content.");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by: {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              ipsa suscipit dolore possimus cum fugiat sed quas placeat dolores.
              Veniam repudiandae minus atque officiis fuga dolorum fugiat
              consectetur nisi praesentium id explicabo fugit repellendus culpa,
              iste nesciunt numquam, non accusantium, aut omnis corrupti?
              Impedit quas perspiciatis id eaque laborum at?
            </p>
          </div>
        ))}
    </div>
  );
}
