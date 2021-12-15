class Stopwatch extends HTMLElement {

    milliseconds = 0
    timerInterval;
    clockface;
    startbutton;
    pausebutton;
    resumebutton;
    resetbutton;
    buttonpanel;

    constructor(params) {
        super()
        
        this.classList.add('stopwatch-container')
        this.classList.add('animate')

        this.clockface = document.createElement('div')
        this.clockface.classList.add('clock-face')
        this.clockface.innerHTML = '00:00:00:00'

        this.buttonpanel = document.createElement('div')
        this.buttonpanel.classList.add('stopwatch-buttons')

        this.startbutton = document.createElement('div')
        this.startbutton.classList.add('button-small')
        this.startbutton.classList.add('start')
        this.startbutton.innerHTML = 'Start'
        this.startbutton.onclick = this.start(this)

        this.resumebutton = document.createElement('div')
        this.resumebutton.classList.add('button-small')
        this.resumebutton.classList.add('start')
        this.resumebutton.innerHTML = 'Resume'
        this.resumebutton.onclick = this.resume(this)

        this.pausebutton = document.createElement('div')
        this.pausebutton.classList.add('button-small')
        this.pausebutton.classList.add('start')
        this.pausebutton.innerHTML = 'Pause'
        this.pausebutton.onclick = this.pause(this)

        this.resetbutton = document.createElement('div')
        this.resetbutton.classList.add('button-small')
        this.resetbutton.classList.add('reset')
        this.resetbutton.innerHTML = 'Reset'
        this.resetbutton.onclick = this.reset(this)


        this.buttonpanel.appendChild(this.startbutton)
        this.buttonpanel.appendChild(this.resetbutton)
    
        let span = document.createElement('span')
        span.classList.add('remove-icon')
        span.onclick = deleteStopwatch
    
        this.appendChild(this.clockface)
        this.appendChild(this.buttonpanel)
        this.appendChild(span)
    };

    start(self) {
        return () => {
            self.buttonpanel.replaceChild(self.pausebutton, self.startbutton)
            self.timerInterval = setInterval(self.timerFunction(self), 10)
        }
    };

    resume(self) {
        return () => {
            self.buttonpanel.replaceChild(self.pausebutton, self.resumebutton)
            self.timerInterval = setInterval(self.timerFunction(self), 10)
        }
    };

    pause(self) {
        return () => {
            self.buttonpanel.replaceChild(self.resumebutton, self.pausebutton)
            clearInterval(self.timerInterval)
        }
    }

    reset(self) {
        return () => {
            self.buttonpanel.removeChild(self.buttonpanel.childNodes[0])
            self.buttonpanel.insertBefore(self.startbutton, self.resetbutton)
            clearInterval(self.timerInterval)
            self.milliseconds = 0
            self.clockface.innerHTML = '00:00:00:00'
        }
    }

    timerFunction(self) {
        return () => {
            self.milliseconds += 10
            self.clockface.innerHTML = self.formatClock(self.milliseconds)
        }
    }

    formatClock(milliseconds) {
        let hr = Math.floor(milliseconds / 3600000)
        let remainder = milliseconds - (hr * 3600000)
        let min = Math.floor(remainder / 60000)
        remainder = milliseconds - (min * 60000)
        let sec = Math.floor(remainder / 1000)
        remainder = milliseconds - (sec * 1000)
        let ms = Math.floor(remainder / 10)

        return ('0' + hr).slice(-2) + 
            ':' + ('0' + min).slice(-2) + 
            ':' + ('0' + sec).slice(-2) +
            ':' + ('0' + ms).slice(-2)
    }
}

customElements.define('stop-watch', Stopwatch)

let globals = {
    isRemoving: false,
    stopwatchCount: 0
}


function removeButtonClicked(e) {
    if (globals.isRemoving == false) {
        for (let cssClass of document.styleSheets[0].cssRules) {
            if (cssClass.selectorText == '.stopwatch-container') {
                cssClass.style.animation = '0.3s ease 0s infinite wiggle'
                globals.isRemoving = true
            } else if (cssClass.selectorText == '.remove-icon') {
                cssClass.style.display = 'inline-block'
            }
        }
        e.target.innerHTML = 'Done'
        e.target.classList.add('is-removing-button-state')
    } else {
        for (let cssClass of document.styleSheets[0].cssRules) {
            if (cssClass.selectorText == '.stopwatch-container') {
                cssClass.style.animation = ''
            } else if (cssClass.selectorText == '.remove-icon') {
                cssClass.style.display = 'none'
            }
    
        }
        e.target.classList.remove('is-removing-button-state')
        e.target.innerHTML = 'Remove'
        globals.isRemoving = false
    }
}

function deleteStopwatch(e) {
    e.target.parentElement.reset()
    e.target.parentElement.remove()
    globals.stopwatchCount -= 1
    if (globals.stopwatchCount == 0)
        document.querySelector('.empty-stopwatch-list').style.display = 'inline-block'
}

function createStopwatch(e) {
    let stopwatch = new Stopwatch()

    if (globals.stopwatchCount == 0)
        document.querySelector('.empty-stopwatch-list').style.display = 'none'

    globals.stopwatchCount += 1

    let stopwatchList = document.querySelector('.stopwatch-list-container')
    stopwatchList.append(stopwatch)
}