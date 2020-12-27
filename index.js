class Carousel {
    constructor(root, animation) {
        this.animation = animation || ((fromNode, toNode, callback) => callback())
        this.root = root
        this.dotsCt = root.querySelector('.dots')
        this.dots = Array.from(root.querySelectorAll('.dots span'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')
        this.panels = Array.from(root.querySelectorAll('.panels a'))

        this.bind()
    }

    get index() {
        return this.dots.indexOf(this.root.querySelector('.dots .active'))
    }

    get preIndex() {
        let index = this.index
        if (index === 0) {
            index = this.panels.length - 1
        } else {
            index = index - 1
        }
        return index
    }

    get nextIndex() {
        let index = this.index

        if (index === this.panels.length - 1) {
            index = 0
        } else {
            index = index + 1
        }
        return index
    }

    bind() {
        this.dotsCt.onclick = e => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)

            this.setPanels(index, this.index)
            this.setDots(index)
        }

        this.pre.onclick = e => {

            this.setPanels(this.preIndex, this.index)
            this.setDots(this.preIndex)
        }

        this.next.onclick = e => {

            this.setPanels(this.nextIndex, this.index)
            this.setDots(this.nextIndex)
        }
    }


    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')
    }

    setPanels(toIndex, fromIndex) {
        console.log(toIndex, fromIndex)
        this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
            this.panels.forEach(panel => panel.style.zIndex = 1)
            this.panels[toIndex].style.zIndex = 10
        })
    }

}

function fade(fromNode, toNode, onFinish) {

    let opacityOffset1 = 1
    let opacityOffset2 = 0
    let step = 0.04

    function fromNodeAni() {
        if (opacityOffset1 > 0) {
            opacityOffset1 -= step
            fromNode.style.opacity = opacityOffset1
            requestAnimationFrame(fromNodeAni)
        } else {
            //防止出现负数
            fromNode.style.opacity = 0
        }
    }

    function toNodeAni() {
        if (opacityOffset2 < 1) {
            opacityOffset2 += step
            toNode.style.opacity = opacityOffset2
            requestAnimationFrame(toNodeAni)
        } else {
            //走到这里说明动画效果已经完成
            onFinish
        }
    }

    fromNodeAni()
    toNodeAni()
}
document.querySelectorAll(".carousel").forEach(carousel => new Carousel(carousel,fade))