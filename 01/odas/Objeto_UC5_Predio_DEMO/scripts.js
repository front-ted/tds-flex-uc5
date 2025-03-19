var unityInstance = null;

let isSoundEnabled = true;

document.addEventListener("DOMContentLoaded", function() {
    const clickSound = document.getElementById("click-sound");
    const buttons = document.querySelectorAll("button");
    const soundIcon = document.getElementById("sound-icon");

    buttons.forEach(button => {
        // Evento de clique para reproduzir o som
        button.addEventListener("click", function() {
            if (isSoundEnabled && this.className !== 'sound-btn') {
                clickSound.currentTime = 0;  // Rewind to the start
                clickSound.play();
            }
        });
    });

    // Inicializa o ícone de som
    updateSoundIcon();
});

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    updateSoundIcon();
    
    // Envia mensagem para a Unity
    if (unityInstance) {
        // Envia 1 para ativar o som, 0 para desativar
        unityInstance.SendMessage('AudioManager', 'SetMute', isSoundEnabled ? 0 : 1);
    }
}

function updateSoundIcon() {
    const icon = document.getElementById("sound-icon");
    // Quando o som está habilitado, mostramos o ícone de mutar
    // Quando está mudo, mostramos o ícone de som ligado
    if (isSoundEnabled) {
        icon.src = "image/sound-off.svg";
        icon.alt = "Mutar Som";
    } else {
        icon.src = "image/sound-on.svg";
        icon.alt = "Ativar Som";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var menuPanel = document.getElementById('menu-panel');
    var menuButton = document.getElementById('menu');
    
    // Calcula a largura do painel e ajusta a posição inicial
    var panelWidth = menuPanel.offsetWidth;
    menuPanel.style.left = `-${panelWidth}px`;

    menuButton.addEventListener('click', function() {
        if (menuPanel.classList.contains('open')) {
            menuPanel.classList.remove('open');
            menuPanel.style.left = `-${panelWidth}px`;
            menuButton.style.left = '0.5%';
        } else {
            menuPanel.classList.add('open');
            menuPanel.style.left = '0';
            menuButton.style.left = `${panelWidth}px`;
        }
    });
});

function updateProgressBar(value) {
    const filler = document.getElementById('progressFiller');
    filler.style.width = `${Math.min(value * 100, 100)}%`;
    if (value >= 1) {
        filler.style.animation = 'none';
        filler.style.backgroundColor = '#00ff00'; // Cor de destaque ao finalizar
    }
}

function updateButtonIcon() {
    const icon = document.getElementById("fullscreen-icon");
    if (document.fullscreenElement) {
        icon.src = "image/fullscreen-exit.svg";
        icon.alt = "Sair da Tela Cheia";
    } else {
        icon.src = "image/fullscreen-enter.svg";
        icon.alt = "Entrar em Tela Cheia";
    }
}

function toggleFullscreen() {
    let docElm = document.documentElement;
    if (!document.fullscreenElement) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.webkitRequestFullscreen) { 
            docElm.webkitRequestFullscreen(); 
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); 
        }
    }
}

function disableF11(event) {
    if (event.key === "F11") {
        event.preventDefault();
        alert("Use o botão de ZOOM para zoom in e zoom out");
    }
}

function resizeCanvas() {
    const canvas = document.getElementById("unityCanvas");
    const container = document.getElementById("unityContainer");
    const containerAspectRatio = container.clientWidth / container.clientHeight;
    const canvasAspectRatio = 16 / 9;
    
    if (containerAspectRatio > canvasAspectRatio) {
        canvas.style.width = `${container.clientHeight * canvasAspectRatio}px`;
        canvas.style.height = `${container.clientHeight}px`;
    } else {
        canvas.style.width = `${container.clientWidth}px`;
        canvas.style.height = `${container.clientWidth / canvasAspectRatio}px`;
    }

    if (unityInstance != null) {
        unityInstance.SendMessage('CanvasResizeHandler', 'OnResize', `${canvas.width},${canvas.height}`);
    }
}

function applyFilter(filterType) {
    const body = document.body;
    body.classList.remove('grayscale', 'deuteranopia', 'protanopia', 'tritanopia');
    
    if (filterType !== 'normal') {
        body.classList.add(filterType);
    }
}

// Desabilitar F11
document.addEventListener("keydown", disableF11);

// Atualiza o ícone ao carregar a página
document.addEventListener('DOMContentLoaded', updateButtonIcon);

// Verifica se a tela cheia foi ativada ou desativada
document.addEventListener('fullscreenchange', updateButtonIcon);

window.addEventListener("resize", resizeCanvas);

// Carrega o Unity WebGL
var script = document.createElement("script");
script.src = "Build/Build.loader.js";
script.onload = () => {
    // Criar a instância Unity com progressão de carregamento
    createUnityInstance(document.querySelector("#unityCanvas"), {
        dataUrl: "Build/Build.data.unityweb",
        frameworkUrl: "Build/Build.framework.js.unityweb",
        codeUrl: "Build/Build.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "SENAC-RS",
        productName: "UC5 Situação Prédio",
        productVersion: "0.1",
    }, (progress) => {
        // Atualizar barra de progresso
        updateProgressBar(progress);
    }).then(function (instance) {
        unityInstance = instance;

        // Sincroniza o estado inicial do som
        if (!isSoundEnabled) {
            unityInstance.SendMessage('AudioManager', 'SetMute', 1);
        }

        // Ocultar a barra de carregamento quando o conteúdo estiver totalmente carregado
        var loadingBar = document.getElementById("loadingBar");
        if (loadingBar) {
            loadingBar.style.display = "none";
        }

        // Reaplica o estilo e garante o redimensionamento após o carregamento completo
        resizeCanvas();
    }).catch(function (message) {
        alert(message);
    });
};
// Adicionar o script ao documento
document.body.appendChild(script);
