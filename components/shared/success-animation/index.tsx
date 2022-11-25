/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import styles from "./success-animation.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const SuccessAnimation = () => {
  return (
    <div className={styles.successCheckmark}>
      <div className={styles.checkIcon}>
        <span className={[styles.iconLine, styles.lineTip].join(" ")}></span>
        <span className={[styles.iconLine, styles.lineLong].join(" ")}></span>
        <div className={styles.iconCircle}></div>
        <div className={styles.iconFix}></div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
