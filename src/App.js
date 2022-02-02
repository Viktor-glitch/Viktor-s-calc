import{ useState } from "react";

function App() {

	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");
	const [history, setHistory] = useState([]);

	const operators = ['/','*','+','-','.'];

	const updateCalc = value => {
		if(calc.length == 0 && value == '-'){
			setCalc(calc+value);
			setResult(eval(calc+value).toString());
			return;
		} else if(
			operators.includes(value) && calc === '' ||
			operators.includes(value) && operators.includes(calc.slice(-1))
		){
			return;
		}

		setCalc(calc+value);

		if(!operators.includes(value)){
			setResult(eval(calc+value).toString());
		}
	}

	const deleteLast = () =>{
		if(calc.length == 1 && calc == '0'){
			return;
		}else{
			const value = calc.slice(0,-1);
			setCalc(value);
			if (operators.includes(value.slice(-1))) {
				setResult(eval(value.toString().slice(0,-1)));
			}
			else{
				setResult(eval(value.toString()));
			}
		}
	}

	const createDigits = () => {
		const digits = [];

		for(let i = 1; i<10;i++){
			digits.push(
				<button onClick={() => updateCalc(i.toString())}
					key={i}>
					{i}
				</button>
			)
		}
		return digits;
	}

	const calculate = () => {
		let val = eval(calc).toString();
        setHistory([...history, calc + '=' + val]);
		setCalc(val);
	}

	return (
		<div className="App">
			<div className="history">
				{history.map(h => {
					 return(<p>{h}</p>);
				})}
			</div>
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})   </span> : ''}

					{calc || "0"}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>

					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{ createDigits() }
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>

					<button onClick={calculate}>=</button>
				</div>

            </div>
		</div>
	);
}

export default App;
