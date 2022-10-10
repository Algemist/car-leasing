import React, {useEffect, useState} from 'react';
import styles from './form.module.scss'
import PrimeBtn from "../UI/buttons/PrimeBtn";
import InputRange from "../UI/Input/InputRange";
const Form = () => {
    const [price, setPrice] = useState(3300000); // Стоимость автомобиля
    const [priceInput, setPriceInput] = useState(price); // Стоимость автомобиля (input type number)
    const [initPercent, setInitPercent] = useState(13); // Первоначальный взнос в %
    const [init, setInit] = useState(0); // Первоначальный взнос в руб
    const [initInput, setInitInput] = useState(0); //Первоначальный взнос в руб (input type number)
    const [months, setMonths] = useState(60); // Кол-во месяцев
    const [monthsInput, setMonthInput] = useState(months); //Кол-во месяцев (input type number)
    const [isSend, setIsSend] = useState(false);
    const interestRate = 3.5;
    const monthPay = Math.round((price - init) * ((interestRate / 100 * Math.pow((1 + interestRate / 100), months)) / (Math.pow((1 + interestRate / 100), months) - 1)));
    const costDeal = Math.round(init + months * monthPay);

    useEffect(() => {
        setInit(price * initPercent / 100);
        setInitInput(price * initPercent / 100);
    }, [costDeal, initPercent, monthPay, price])

    const handleBlur = (e) => {
        if (Number(e.target.value) > e.target.getAttribute("max")) {
            setInit(e.target.getAttribute("max"));
            setInitInput(e.target.getAttribute("max"));
            setInitPercent(60);
        } else if (Number(e.target.value) < e.target.getAttribute("min")) {
            setInit(e.target.getAttribute("min"));
            setInitInput(e.target.getAttribute("min"));
            setInitPercent(10);
        } else {
            setInit(e.target.value);
            setInitPercent(Number(Math.floor(e.target.value * 100 / price)));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "car_coast": price,
            "initail_payment": init,
            "initail_payment_percent": initPercent,
            "lease_term": months,
            "total_sum": costDeal,
            "monthly_payment_from": monthPay
        }
        console.log("Data send: ", data);
        try {
            setIsSend(true);
            await fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => console.log(res));
        } catch(e) {
            console.log(e);
        } finally {
            setIsSend(false);
        }
    }
    // Проверка на ввод не валидных значений
    const checkRange = (e) => {
        if (Number(e.target.value) > e.target.getAttribute("max")) return e.target.getAttribute("max");
        if (Number(e.target.value) < e.target.getAttribute("min")) return e.target.getAttribute("min");
        return Number(e.target.value)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                <span className={styles.title}>Стоимость автомобиля</span>
                <input
                    type="number"
                    min={1000000}
                    max={6000000}
                    value={priceInput}
                    onChange={(e) => {setPriceInput(Number(e.target.value))}}
                    onBlur={(e) => {setPrice(checkRange(e)); setPriceInput(checkRange(e))}}
                    className={styles.input}
                />
                <InputRange
                    step={1}
                    min={1000000}
                    max={6000000}
                    value={price}
                    setValue={(value) => {setPrice(value); setPriceInput(value)}}
                />
                <p className={styles.type}>₽</p>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>Первоначальный взнос</span>
                <input
                    type="number"
                    min={price * 0.1}
                    max={price * 0.6}
                    value={initInput}
                    onChange={(e) => {setInitInput(Number(e.target.value))}}
                    onBlur={handleBlur}
                    className={styles.input}
                />
                <InputRange
                    step={1}
                    min={10}
                    max={60}
                    value={initPercent}
                    setValue={(value) => {setInitPercent(Number(value));
                        setInitInput(Number(value * price / 100));
                        setInit(Number(value * price / 100));}}
                />
                <p className={styles.percent}>{initPercent}%</p>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>Срок лизинга</span>
                <input
                    type="number"
                    min={1}
                    max={60}
                    value={monthsInput}
                    onChange={(e) => {setMonthInput(Number(e.target.value))}}
                    onBlur={(e) => {setMonths(checkRange(e)); setMonthInput(checkRange(e))}}
                    className={styles.input}
                />
                <InputRange
                    step={1}
                    min={1}
                    max={60}
                    value={months}
                    setValue={(value) => {setMonths(value); setMonthInput(value)}}
                />
                <p className={styles.type}>мес.</p>
            </label>
                <div className={styles.cost}>
                    <h2 className={styles.title}>Сумма договора лизинга</h2>
                    <span className={styles.value}>{costDeal} ₽</span>
                </div>
                <div className={styles.payment}>
                    <h2 className={styles.title}>Ежемесячный платеж от</h2>
                    <span className={styles.value}>{monthPay} ₽</span>
                </div>
           <PrimeBtn isDisabled={isSend} />
        </form>
    );
};

export default Form;