function TipCalc() {
    const [billAmount, setBillAmount] = useState(0);

    return (
        <div className="p-8">
            <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="Enter bill amount" className="border rounded p-2 w-full mb-4" />
        </div>
    );
}

export default TipCalc;