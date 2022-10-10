import Form from "./components/Form/Form";
import styles from "./styles/app.module.scss"

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
      <Form />
    </div>
  );
}

export default App;
