'use client'

import { useState } from 'react'

export default function Home() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('PKR')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) {
      setResult('❌ Please enter a valid number.')
      return
    }
    setLoading(true)
    const res = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    const data = await res.json()
    if (data.result) {
      setResult(`💱 ${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`)
    } else {
      setResult('⚠️ Conversion failed.')
    }
    setLoading(false)
  }

  return (
    <main className="bg-black text-green-400 font-mono min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-4">
        <h1 className="text-xl mb-4">🖥️ Currency Converter CLI</h1>
        <div className="mb-2"> Enter amount:</div>
        <input
          className="w-full bg-gray-900 text-green-300 p-2 mb-4 border border-green-500 rounded"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="mb-2"> From Currency (e.g., USD):</div>
        <input
          className="w-full bg-gray-900 text-green-300 p-2 mb-4 border border-green-500 rounded"
          type="text"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
        />

        <div className="mb-2"> To Currency (e.g., PKR):</div>
        <input
          className="w-full bg-gray-900 text-green-300 p-2 mb-4 border border-green-500 rounded"
          type="text"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
        />

        <button
          onClick={convertCurrency}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-black font-bold"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result && (
          <div className="mt-4 text-green-300">
            <p> {result}</p>
          </div>
        )}
      </div>
    </main>
  )
}
