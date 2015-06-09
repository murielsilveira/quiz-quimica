'use strict';

var questoes = [
        {
            titulo: 'Primeira questão?',
            alternativas: [
                'Alternativa 1.1',
                'Alternativa 1.2',
                'Alternativa 1.3',
                'Alternativa 1.4',
                'Alternativa 1.5'
            ]
        },
        {
            titulo: 'Segunda questão?',
            alternativas: [
                'Alternativa 2.1',
                'Alternativa 2.2',
                'Alternativa 2.3',
                'Alternativa 2.4',
                'Alternativa 2.5'
            ]
        }
    ],
    questao_atual;


function init() {
    mostrarPrimeiraQuestao();

    $('#btn-voltar').click(mostrarQuestaoAnterior);
    $('#btn-proxima').click(mostrarProximaQuestao);
}

function mostrarPrimeiraQuestao() {
    questao_atual = 0;
    mostrarQuestao(questoes[questao_atual]);
}

function mostrarProximaQuestao() {
    if (questao_atual + 1 < questoes.length) {
        questao_atual++;
        mostrarQuestao(questoes[questao_atual]);
    } else {
        console.log('não há mais questões');
    }
}

function mostrarQuestaoAnterior() {
    if (questao_atual > 0) {
        questao_atual--;
        mostrarQuestao(questoes[questao_atual]);
    } else {
        console.log('não há mais questões');
    }
}

function mostrarQuestao(questao) {
    var tituloHtml = '',
        alternativasHtml = '',
        numeroDeAlternativas = questao.alternativas.length;

    tituloHtml = '<h2>' + questao.titulo + '</h2>';

    for (var i = 0; i < numeroDeAlternativas; i++) {
        alternativasHtml += '<div>' +
            '<input type="radio" name="alternativa" id="alternativa_' + i + '">' +
            '<span class="texto-alternativa">' + questao.alternativas[i] + '</span>' +
            '</div>';
    }

    $('#questao-title').html(tituloHtml);
    $('#questao-content').html(alternativasHtml);
}

init();
