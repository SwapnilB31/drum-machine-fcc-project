import React from 'react'
import DrumSounds from './DrumSounds'
import './Drums.css'

class DrumBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey : Array(9).fill(false)
        }
        this.setPadActive = this.setPadActive.bind(this)
    }

    setPadActive(keyLetter) {
        const drumpadletters = ['Q','W','E','A','S','D','Z','X','C'];
        this.setState(state => {
            const keyState = state.activeKey.slice()
            keyState[drumpadletters.indexOf(keyLetter)] = true
            return {
                activeKey : keyState
            }
        })
        setTimeout(()=>{
            this.setState(state => {
                const keyState = state.activeKey.slice()
                keyState[drumpadletters.indexOf(keyLetter)] = false
                return {
                    activeKey : keyState
                }
            })
        },300)
    }

    componentDidMount() {
        this.setupKeys()
    }

    setupKeys() { 
        document.addEventListener('keydown',(e) => {
            //console.log(e.key)
            const found = DrumSounds.find(elem => elem.key === e.key.toUpperCase())
            if(found) {
                const sound = document.getElementById(found.key.toUpperCase())
                sound.currentTime = 0
                sound.play()
                this.setPadActive(found.key.toUpperCase())
                this.props.setKeyLabel(found.label)
            }
        })
    }

    render() {
        return(
            <div className="drum-board">
            {
                DrumSounds.map((val,ind) => 
                   (<DrumPad key={ind} keyLetter={val.key} keyLabel={val.label} audioSource={val.source} active={this.state.activeKey[ind]} setActive={this.setPadActive} setKeyLabel={this.props.setKeyLabel}/>)
                )    
            }
            </div>
        )
    }
}

function DrumPad({keyLetter,keyLabel,audioSource,active,setActive,setKeyLabel}) {
    const playAudio = () => {
        const audioElem = document.getElementById(keyLetter)
        audioElem.currentTime = 0
        audioElem.play()
        setActive(keyLetter)
        setKeyLabel(keyLabel)
    } 

    return (
        <div className={"drum-pad " + (active ? 'drum-pad-active ' : '')} onClick={playAudio}>
            <div className="key-letter">{keyLetter}</div>
            <audio
                className="clip"
                id={keyLetter}  
                src={audioSource}></audio>
        </div>
    )
}

class DrumMachine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyLabel : ''
        }
        this.setKeyLabel = this.setKeyLabel.bind(this)
    }

    /**
     * 
     * @param {String} label 
     */
    setKeyLabel(label) {
        this.setState({
            keyLabel : label
        })
    }

    render() {
        return(
            <div className="container">
                <div className="drum-machine">
                    <div className="title">Drum Machine</div>
                    <div className="display">{this.state.keyLabel}</div>
                    <DrumBoard setKeyLabel={this.setKeyLabel}/>
                </div>
            </div>
        )
    }
}

export default DrumMachine