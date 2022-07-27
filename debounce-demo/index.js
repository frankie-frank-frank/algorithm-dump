let input = document.querySelector("input")
let defaultItem = document.getElementById("default")
let debouncer = document.getElementById("debounce")
let throttler = document.getElementById("throttle")

//INPUT LOGIC
input.addEventListener("input", e => {
    defaultItem.textContent = e.target.value
    updateDebounce(e.target.value)
    updateThrottle(e.target.value)
})

//DEBOUNCE LOGIC: INPUT
const debounce = (cb, delay=1250) => {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

const updateDebounce = debounce(text => {
    debouncer.textContent = text
})

//THROTTLING: SCROLLING
const throttle = (cb, delay=1250) => {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
        if(waitingArgs == null){
            shouldWait = false
        }
        else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }
    return (...args) => {
        if(shouldWait) {
            waitingArgs = null;
            return
        }
        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

const updateThrottle = throttle(text => {
    throttler.textContent = text
})