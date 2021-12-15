class Stopwatch extends HTMLElement {

    constructor(params) {
        super()
    };

    start() {
        
    };

    pause() {

    }

    resume() {

    }

    reset() {

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
            if (cssClass.selectorText == '.stopwatch') {
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
            if (cssClass.selectorText == '.stopwatch') {
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
    e.target.parentElement.remove()
    globals.stopwatchCount -= 1
    if (globals.stopwatchCount == 0)
        document.querySelector('.empty-stopwatch-list').style.display = 'inline-block'
}

function createStopwatch(e) {
    let stopwatchContainer = document.createElement('div')
    stopwatchContainer.classList.add('stopwatch-container')

    let stopwatch = document.createElement('div')
    stopwatch.classList.add('stopwatch')
    stopwatch.classList.add('animate')
    stopwatch.innerHTML = '00:00'

    let span = document.createElement('span')
    span.classList.add('remove-icon')
    span.onclick = deleteStopwatch

    stopwatchContainer.appendChild(stopwatch)
    stopwatchContainer.appendChild(span)

    globals.stopwatchCount += 1
    if (globals.stopwatchCount > 0)
        document.querySelector('.empty-stopwatch-list').style.display = 'none'

    let stopwatchList = document.querySelector('.stopwatch-list-container')
    stopwatchList.append(stopwatchContainer)
}

let stopwatch = new Stopwatch()
stopwatch.start()