export class Dom {

    buttons = document.querySelectorAll(".btn");
    body = document.querySelector("body");
    infoTitle = document.querySelector("#level-title");
    
    startInfo = {
        'text': 'Press <span style="font-style: oblique; font-weight: 450">Enter</span> to start',
        'color': 'cornsilk'
    }

    endInfo = {
        'text':`<span style="font-style: oblique; font-weight: 450">Wrong!</span> Try again`,
        'color': 'red'
    }

    listenInfo = {
        'text': `<span style="color: 'rgb(220, 247, 255)'">... next sound ...</span>`,
        'color': 'lightblue'
    }


    updateLevelInfo(level) {
        this.levelInfo = {
            'text': `<span style="font-weight: 450"> Level : ${level}</span>`,
            'color': 'cornsilk'
        }
        return this.levelInfo;
    }


    setInfo(info) {
        console.log(info);
        this.infoTitle.innerHTML = info['text'];
        this.infoTitle.style.color = info['color'];
    }

}

    

