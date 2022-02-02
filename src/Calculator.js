import React from 'react';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            calc: '',
            result: '',
            history: JSON.parse(localStorage.getItem('history')),
            operators: ['/','*','+','-','.'],
        }
    }

    updateCalc = value => {
        if(this.state.calc.length == 0 && value == '-'){
            this.setState = ({result:eval(this.state.calc+value).toString(),
                calc:(this.state.calc+value)});
            return;
        } else if(
            this.state.operators.includes(value) && this.state.calc === '' ||
            this.state.operators.includes(value) && this.state.operators.includes(this.state.calc.slice(-1))
        ){
            return;
        }

        this.setState({calc:(this.state.calc+value).toString()}) ;

        if(!this.state.operators.includes(value)){
            this.setState({result:eval(this.state.calc+value).toString()});
        }
    }

     deleteLast = () =>{
        if(this.state.calc.length == 1 && this.state.calc == '0'){
            return;
        }else{
            const value = this.state.calc.slice(0,-1);
            this.setState({calc: value});
            if (this.state.operators.includes(value.slice(-1))) {
                this.setState({result: eval(value.toString().slice(0,-1))});
            }
            else{
                this.setState({result:(value.toString())});
            }
        }
    }

    createDigits = () => {
        const digits = [];

        for(let i = 1; i<10;i++){
            digits.push(
                <button onClick={() => this.updateCalc(i.toString())}
                        key={i}>
                    {i}
                </button>
            )
        }
        return digits;
    }


     calculate = () => {
         let val = eval(this.state.calc).toString();
         let array = [... this.state.history, this.state.calc + '=' + val];
         localStorage.setItem("history",JSON.stringify(array));
         this.setState({history: JSON.parse(localStorage.getItem('history')),
             calc: val});
     }

    render(){
        return(
            <div className="App">
                <div className="history">
                    {this.state.history.map(h => {
                        return(<p>{h}</p>);
                    })}
                </div>
                <div className="calculator">
                    <div className="display">
                        {this.state.result ? <span>({this.state.result})   </span> : ''}

                        {this.state.calc || "0"}
                    </div>

                    <div className="operators">
                        <button onClick={() => this.updateCalc('/')}>/</button>
                        <button onClick={() => this.updateCalc('*')}>*</button>
                        <button onClick={() => this.updateCalc('+')}>+</button>
                        <button onClick={() => this.updateCalc('-')}>-</button>

                        <button onClick={this.deleteLast}>DEL</button>
                    </div>

                    <div className="digits">
                        { this.createDigits() }
                        <button onClick={() => this.updateCalc('0')}>0</button>
                        <button onClick={() => this.updateCalc('.')}>.</button>

                        <button onClick={this.calculate}>=</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Calculator;