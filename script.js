const html = document.querySelector('html')
const foco = document.querySelector('.app__card-button--foco')
const descansoCurto = document.querySelector('.app__card-button--curto')
const descansoLongo = document.querySelector('.app__card-button--longo')

const imagem = document.querySelector(".app__image")
const title = document.querySelector(".app__title")
const buttons = document.querySelectorAll(".app__card-button")

const startPause = document.querySelector("#start-pause")
const textoBtnStartPause = document.querySelector("#start-pause span")
const imgBtnComecarOuPausar = document.querySelector(".app__card-primary-butto-icon")

const musicButton = document.querySelector("#alternar-musica")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaPausar = new Audio('/sons/pause.mp3')
const musicaPlay = new Audio('/sons/play.wav')
const musicaTempoFinalizado = new Audio('/sons/beep.mp3')

const timer = document.querySelector('#timer')

let tempoPercorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicButton.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

foco.addEventListener("click", () => {
    tempoPercorridoEmSegundos = 1500
    alterarcontexto("foco")
    foco.classList.add("active")
})
descansoCurto.addEventListener("click", () => {
    tempoPercorridoEmSegundos = 300
    alterarcontexto("descanso-curto")
    descansoCurto.classList.add("active")
})
descansoLongo.addEventListener("click", () => {
    tempoPercorridoEmSegundos = 900
    alterarcontexto('descanso-longo')
    descansoLongo.classList.add("active")
})

function alterarcontexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute("src", `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            title.innerHTML = `Faça uma pausa curta!<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
    buttons.forEach((button) => {
        button.classList.remove("active")
    })
}
const contagemRegresiva = () => {
    if(tempoPercorridoEmSegundos <= 0){
        musicaTempoFinalizado.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoPercorridoEmSegundos -= 1
    mostrarTempo()
}

startPause.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        musicaPausar.play()
        zerar()
        return
    }
    textoBtnStartPause.textContent = "Pausar"
    imgBtnComecarOuPausar.setAttribute('src', '/imagens/pause.png')
    musicaPlay.play()
    intervaloId = setInterval(contagemRegresiva, 1000)
}
function zerar() {
    clearInterval(intervaloId)
    imgBtnComecarOuPausar.setAttribute('src', '/imagens/play_arrow.png')
    textoBtnStartPause.textContent = "Começar"
    intervaloId = null
}

const mostrarTempo = () => {
    const tempo = new Date(tempoPercorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pr-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`

}
mostrarTempo()