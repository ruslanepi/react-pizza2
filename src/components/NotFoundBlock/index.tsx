import styles from "./NotFoundBlock.module.scss";
const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>На данной странице ничего не найдено</h1>
      <p className={styles.description}>Совсем ничего нет</p>
    </div>
  );
};

export default NotFoundBlock;
