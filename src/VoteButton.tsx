interface ModuleSetProps {
    text: string,
    breaked: number,
    setBreaked: React.Dispatch<React.SetStateAction<number>>
    
}

function VoteButton({text, breaked, setBreaked}: ModuleSetProps) {
    function actionAdd() {
        if (breaked !== 1) {
            setBreaked(breaked + 1)
        }
    }

    function actionSub() {
        if (breaked !== 1) {
            setBreaked(breaked - 1)
        }
    }
    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h3>{text}</h3>
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <button onClick={actionSub}>-</button>
                <span>{breaked}</span>
                <button onClick={actionAdd}>+</button>
            </div>
        </div>
    )
}

export default VoteButton