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
		{ value: 'C', isNumber: false, func: clearValue, inMoment: true },
		{ value: '=', isNumber: false , func: getResult, inMoment: true },
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
		if (secondValue === '0'){
			setError('Деление на ноль невозможно')
			return null
		}
		return String(Number(firstValue) / Number(secondValue))

	}

	const [firstValue, setFirstValue] = useState('')
	const [secondValue, setSecondValue] = useState('')
	const [operator, setOperator] = useState(null)
	const displayValue = `${firstValue} ${operator ? operator.value : ''} ${secondValue}`
	const [result, setResult] = useState('')
	const [error, setError] = useState('')
	function getResult(){
		setError('')
		if (firstValue && secondValue){
			const res = operator.func(firstValue, secondValue)
			if (res){
				setResult(res)
			}
		} else {
			setResult('0')
		}
		setFirstValue('')
		setOperator(null)
		setSecondValue('')
	}
	function clearValue(){
		setFirstValue('')
		setOperator(null)
		setSecondValue('')
		setResult('')
		setError('')
	}
	function onClickButton(button) {
		if (!button.isNumber) {
			if (button.value === '='){
				getResult()
			} else if (button.value === 'C') {
				clearValue()
			} else if (!firstValue && !result) {
				setError('Сначала введите число')
			} else {
				if (result) {
					setFirstValue(result)
					setResult('')
				}else if (secondValue){
					setFirstValue(operator.func(firstValue, secondValue))
					setSecondValue('')
				}
				setOperator(button)
			}
		} else {
			setResult('')
			setError('')
			if (operator){
				setSecondValue(secondValue + button.value)
			} else {
				setFirstValue(firstValue + button.value)
			}
		}
	}

	function getButton(buttons, expectedIsNumber) {
		return buttons.map((button) => (
			button.isNumber === expectedIsNumber ? <button
				onClick={() => onClickButton(button)}
				key={button.value}
				className={expectedIsNumber ? styles.button : `${styles.buttonOther} ${styles.button}`}
			>
				{button.value}
			</button> : false
		))
	}

	function handleKeyDown(e) {
		const key = e.key === 'Enter' ? '=' : e.key === 'Delete' ? 'C' : e.key
		const button = buttons.find((button) => button.value === key)
		if (button) {
			onClickButton(button)
		}
	}
	
	return (
		<div className={styles.wrapper} onKeyDown={handleKeyDown} tabIndex={0}>
			<div className={styles.calculator}>
				<header className={styles.header}>Calculator</header>
				<div className={`${styles.display} ${error ? `${styles.error}` : result ? `${styles.result}` : ''}`}>{error ? error : result ? result : displayValue}</div>
				<div className={styles.buttonsBlock}>
					<div className={styles.buttonsNumber}>
						{getButton(buttons, true)}
					</div>
					<div className={styles.buttonsOther}>
						{getButton(buttons, false)}
					</div>
				</div>
			</div>
		</div>
	)
}
