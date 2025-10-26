import { useState } from 'react'
import './App.css'
import usecurrencyinfo from './hooks/usecurrencyinfo'
import InputBox from './components/InputBox'

function App() {
  const [Amount,SetAmount] = useState("")
  const [from,Setfrom] = useState("eur")
  const [to,Setto] = useState("eur")  
  const [Result,SetResult] = useState(0)
  const currencyInfo= usecurrencyinfo(from)
  const options=Object.keys(currencyInfo)

  const swap=()=>{
    Setfrom(to)
    Setto(from)
    SetResult(Amount)
    SetAmount(Result)
  }

  const convert=()=>{
    if(!Amount) return;
    SetResult(Number(Amount) * currencyInfo[to])
  }
   return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-amber-100"
        
    >
        <h1 className='text-5xl justify-center font-bold'>Currency Convertor</h1>
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={Amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => Setfrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(Amount) => SetAmount(Amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={Result}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => Setto(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
