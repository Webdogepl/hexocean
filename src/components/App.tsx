import React from 'react';
import styles from './App.module.scss';
import DishForm from './Form/DishForm';

function App() {
  return (
    <main>
    <section className={styles.app}>
    <DishForm />
    </section>
    </main>
  );
}

export default App;
