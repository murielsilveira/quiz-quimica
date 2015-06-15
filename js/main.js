var Quiz = (function() {
    'use strict';

    var questoes = [
            {
                titulo: 'Qual o elemento químico mais abundante do universo?',
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
        questao_atual,
        nome,
        $tituloDaQuestao = $('#titulo-da-questao'),
        $conteudoDaQuestao = $('#conteudo-da-questao'),
        $btnVoltar = $('#btn-voltar'),
        $btnAvancar = $('#btn-avancar'),
        $btnFinalizar = $('#btn-finalizar');

    function init() {
        $('#form-nome').on('submit', onSubmitFormNome);
        $btnVoltar.click(mostrarQuestaoAnterior);
        $btnAvancar.click(mostrarProximaQuestao);
    }

    function onSubmitFormNome() {
        nome = $('#nome-do-aluno').val() || undefined;
        mostrarPrimeiraQuestao();
        return false;
    }

    function mostrarPrimeiraQuestao() {
        $btnVoltar.removeClass('hide');
        $btnAvancar.removeClass('hide');
        questao_atual = 0;
        mostrarQuestao(questoes[questao_atual]);
    }

    function mostrarProximaQuestao() {
        if (questao_atual + 1 < questoes.length) {
            questao_atual++;
            mostrarQuestao(questoes[questao_atual]);
        }
    }

    function mostrarQuestaoAnterior() {
        if (questao_atual > 0) {
            questao_atual--;
            mostrarQuestao(questoes[questao_atual]);
        }
    }

    function mostrarQuestao(questao) {
        var tituloHtml = '',
            alternativasHtml = '',
            numeroDeAlternativas = questao.alternativas.length;

        tituloHtml = '<h4>' + (questao_atual + 1) + '. ' + questao.titulo + '</h4>';

        for (var i = 0; i < numeroDeAlternativas; i++) {
            alternativasHtml += '<div class="alternativa">' +
                '<input type="radio" name="alternativa" id="alternativa_' + i + '" class="with-gap">' +
                '<label for="alternativa_' + i + '">' + questao.alternativas[i] + '</label>' +
                '</div>';
        }

        $tituloDaQuestao.html(tituloHtml);
        $conteudoDaQuestao.html(alternativasHtml);
        $('.alternativa input').click(selecionarAlternativa);
        if (questao.resposta !== undefined) {
            $('#alternativa_' + questao.resposta).prop('checked', true);
        }

        ajustarBotoes();
    }

    function ajustarBotoes() {
        $btnVoltar.prop('disabled', false);
        $btnAvancar.prop('disabled', false);

        if (questao_atual === 0) {
            $btnVoltar.prop('disabled', true);
        }

        if (questao_atual + 1 === questoes.length) {
            $btnAvancar.prop('disabled', true);
        }
    }

    function selecionarAlternativa() {
        var resposta = parseInt($(this).attr('id').split('_')[1]);
        questoes[questao_atual].resposta = resposta;
    }

    return {
        init: init
    };
})();

Quiz.init();
