import styles from './App.module.css'
import {useState} from "react";

export const App = () => {
	const buttons = [
		{ value: '1', isNumber: true },
		{ value: '2', isNumber: true },
		{ value: '3', isNumber: true },
		{ value: '4', isNumber: true },
		{ value: '5', isNumber: true },
		{ value: '6', isNumber: true },
		{ value: '7', isNumber: true },
		{ value: '8', isNumber: true },
		{ value: '9', isNumber: true },
		{ value: '0', isNumber: true },
		{ value: '/', isNumber: false, func: divideCalculation },
		{ value: '*', isNumber: false, func: multiplyCalculation },
		{ value: '-', isNumber: false, func: subtractCalculation },
		{ value: '+', isNumber: false, func: sumCalculation },
		{ value: 'C', isNumber: false },
		{ value: '=', isNumber: false },
	]
	function sumCalculation (firstValue, secondValue){
		return String(Number(firstValue) + Number(secondValue))
	}
	function subtractCalculation (firstValue, secondValue){
		return String(Number(firstValue) - Number(secondValue))
	}
	function multiplyCalculation (firstValue, secondValue){
		return String(Number(firstValue) * Number(secondValue))
	}
	function divideCalculation (firstValue, secondValue){
		return String(Number(firstValue) / Number(secondValue))
	}

	const [firstValue, setFirstValue] = useState('')
	const [secondValue, setSecondValue] = useState('')
	const [operator, setOperator] = useState(null)
	const displayValue = `${firstValue} ${operator ? operator.value : ''} ${secondValue}`
	const [result, setResult] = useState('')
	const [error, setError] = useState('')
	function getResult(){
		if (firstValue && secondValue){
			setResult(operator.func(firstValue, secondValue))
		} else {
			setResult('0')
		}
		setFirstValue('')
		setOperator(null)
		setSecondValue('')
		setError('')
		console.log(1)
	}
	function clearValue(){
		setFirstValue('')
		setOperator(null)
		setSecondValue('')
		setResult('')
		setError('')
	}
	function onClickButton(value, isNumber, func) {
		if (!isNumber) {
			if (value === '='){
				getResult()
			} else if (value === 'C') {
				clearValue()
			} else if (!firstValue && !result) {
				setError('Сначала введите число')
			} else {
				if (result) {
					setFirstValue(result)
					setResult('')
				}else if (secondValue){
					getResult()
					console.log(2)
					setFirstValue(result)
					setResult('')
				}
				setOperator({value: value, func: func})
			}
		} else {
			setResult('')
			setError('')
			if (operator){
				setSecondValue(secondValue + value)
			} else {
				setFirstValue(firstValue + value)
			}
		}
	}


	function getButton(buttons, expectedIsNumber) {
		return buttons.map(({value, isNumber, func}) => (
			isNumber === expectedIsNumber ? <button
				onClick={() => onClickButton(value, isNumber, func)}
				key={value}
				className={expectedIsNumber ? styles.button : `${styles.buttonOther} ${styles.button}`}
			>
				{value}
			</button> : false
		))
	}
	return (
		<div className={styles.calculator}>
			<header className={styles.header}>Calculator</header>
			<div className={error ? `${styles.display} ${styles.error}` : result ? `${styles.display} ${styles.result}` : styles.display}>{error ? error : result ? result : displayValue}</div>
			<div className={styles.buttonsBlock}>
				<div className={styles.buttonsNumber}>
					{getButton(buttons, true)}
				</div>
				<div className={styles.buttonsOther}>
					{getButton(buttons, false)}
				</div>
			</div>
		</div>
	)
}
