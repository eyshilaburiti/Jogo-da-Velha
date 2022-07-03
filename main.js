//Jogadores
const player1 = "X";
const player2 = "O";

//Jogador da vez
var play_time = player1;

//Controladora do jogo
var game_over = false;

//Auxiliar
var contador = 0;

atualizar_menu();
filtrar_entrada();

//Atualizando o menu de acordo com o jogador da vez
function atualizar_menu(){
    if(game_over){
        return;
    }

    if(play_time == player1){
        var player = document.querySelectorAll("div#menu img")[0];
        player.setAttribute("src", "Imagens/x.png");
    }else{
        var player = document.querySelectorAll("div#menu img")[0];
        player.setAttribute("src", "Imagens/o.png");
    }
}

//Preenchendo a célula de acordo com o jogador da vez
function filtrar_entrada(){
    var celulas = document.getElementsByClassName("celula");

    for(var i=0; i< celulas.length; i++){
        //Adicionando o evento onclick
        celulas[i].addEventListener("click", function(){
            if(game_over){
                return;
            }
            //Adicionando as imagem referente ao jogador da vez e guardando essa informação
            if(this.getElementsByTagName("img").length == 0){
                if(play_time == player1){
                    this.innerHTML = "<img class='opcao' src='Imagens/x.png'>";
                    this.setAttribute("entrada", player1);
                    play_time = player2;
                }else{
                    this.innerHTML = "<img class='opcao' src='Imagens/o.png'>";
                    this.setAttribute("entrada", player2);
                    play_time = player1;
                }
                atualizar_menu();
                verificar_vencedor();
                contador++;
            }
        })
    }
}

function verificar_vencedor(){
    //Pegando a entrada de cada elemento (player1 ou player2)
    var a1 = document.getElementById("a1").getAttribute("entrada");
    var a2 = document.getElementById("a2").getAttribute("entrada");
    var a3 = document.getElementById("a3").getAttribute("entrada");

    var b1 = document.getElementById("b1").getAttribute("entrada");
    var b2 = document.getElementById("b2").getAttribute("entrada");
    var b3 = document.getElementById("b3").getAttribute("entrada");

    var c1 = document.getElementById("c1").getAttribute("entrada");
    var c2 = document.getElementById("c2").getAttribute("entrada");
    var c3 = document.getElementById("c3").getAttribute("entrada");

    var celulas = document.getElementsByClassName("celula");
    var vencedor = "";

    //Analisando as possíveis combinações
    if((a1 == b2 && a1 == c3 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b1 && a1 == c1 && a1 != "")){
        vencedor = a1;
    }else if((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")){
        vencedor = b2;
    }else if((c3 == c2 && c3 == c1 && c3 != "") || (c3 == a3 && c3 == b3 && c3 != "")){
        vencedor = c3;
    }

    //Verificando se há vencedor
    if(vencedor != ""){
        game_over = true;
        var mensagem = document.createElement("div");
        mensagem.innerHTML = `<p class="mensagem">O ganhador foi o '${vencedor}'</p>`;
        document.getElementById("fim").appendChild(mensagem);
        vencedor = ""
        botao();
    }else{
        if(contador == celulas.length-1){
            game_over = true;
            var mensagem = document.createElement("div");
            mensagem.innerHTML = `<p class="mensagem">Não houve vencedor</p>`;
            document.getElementById("fim").appendChild(mensagem);
            vencedor = "";
            botao();
        }
    }
}

function botao(){
    var butao = document.createElement("div");
    butao.innerHTML = `<button id="botao" onclick="reiniciar()">Reiniciar</button>`;
    document.getElementById("fim").appendChild(butao);
}

function reiniciar(){
    var remover_mensagem = document.getElementById("fim");
    remover_mensagem.innerText = "";

    var celulas = document.getElementsByClassName("celula");

    for(var i=0; i< celulas.length; i++){
        celulas[i].innerText = "";
        celulas[i].setAttribute("entrada", "");
    }
    game_over = false;
    contador = 0;
    filtrar_entrada();
}