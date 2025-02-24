$(function (){
    var erro = new Audio("../assets/atividades/relacionar_colunas/erro.mp3");
    var acerto = new Audio("../assets/atividades/relacionar_colunas/acerto.mp3");
    $(".resp, .item").click(function (){
        $(this).toggleClass("selecionado");

        if($(".selecionado").length == 2){
            console.log($(".selecionado")[0].dataset.resp, $(".selecionado")[1])

            if($(".selecionado")[0].dataset.resp == $(".selecionado")[1].dataset.resp)
            {
                $(".selecionado").prop("disabled", "disabled")
                $(".selecionado").addClass("acertou")
                $(".selecionado .txtacao").text($(".selecionado")[0].dataset.resp)
                $(".selecionado").removeClass("selecionado");
                $("#associar_colulas_acertou").modal("show")
                acerto.play()
            }else
            {
                // $(".selecionado").addClass("errou")
                $(".selecionado").removeClass("selecionado");
                $("#associar_colulas_errou").modal("show")
                erro.play()
            }
        }
    });

    $(".resp02, .item02").click(function (){
        $(this).toggleClass("selecionado");

        if($(".selecionado").length == 2){
            console.log($(".selecionado")[0].dataset.resp02, $(".selecionado")[1])

            if($(".selecionado")[0].dataset.resp02 == $(".selecionado")[1].dataset.resp02)
            {
                $(".selecionado").prop("disabled", "disabled")
                $(".selecionado").addClass("acertou")
                $(".selecionado .txtacao").text($(".selecionado")[0].dataset.resp02)
                $(".selecionado").removeClass("selecionado");
                $("#associar_colulas_acertou").modal("show")
                acerto.play()
            }else
            {
                // $(".selecionado").addClass("errou")
                $(".selecionado").removeClass("selecionado");
                $("#associar_colulas_errou").modal("show")
                erro.play()
            }
        }
    });

    randomizeResp(50);
    randomizeResp02(50);
})


function randomizeResp(total){
    let resp = Array.from(document.querySelectorAll('.resp'))

    for (let i = 0; i < total; i++){
        $(resp).each(
            function(){ 
                $(this).insertBefore($(resp[Math.floor(Math.random()*resp.length - 1)]))
            }
        )
    }
}

function randomizeResp02(total){
    let resp02 = Array.from(document.querySelectorAll('.resp02'))

    for (let i = 0; i < total; i++){
        $(resp02).each(
            function(){ 
                $(this).insertBefore($(resp02[Math.floor(Math.random()*resp02.length - 1)]))
            }
        )
    }
}