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
                ],
                alternativaCorreta: 0
            },
            {
                titulo: 'Segunda questão?',
                alternativas: [
                    'Alternativa 2.1',
                    'Alternativa 2.2',
                    'Alternativa 2.3',
                    'Alternativa 2.4',
                    'Alternativa 2.5'
                ],
                alternativaCorreta: 4
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
        $btnFinalizar.click(finalizarQuiz)
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
        var resposta = parseInt($(this).attr('id').split('_')[1]),
            questoesRespondidas = 0,
            numeroDeQuestoes = questoes.length;

        questoes[questao_atual].resposta = resposta;

        if (! $btnFinalizar.is(":visible")) {
            for (var i = 0; i < numeroDeQuestoes; i++) {
                if (questoes[i].resposta !== undefined) {
                    questoesRespondidas++;
                }
            }

            if (questoesRespondidas === numeroDeQuestoes) {
                $btnFinalizar.removeClass('hide');
            }
        }
    }

    function finalizarQuiz() {
        $tituloDaQuestao.html('');
        $conteudoDaQuestao.html('');
        $btnVoltar.addClass('hide');
        $btnAvancar.addClass('hide');
        $btnFinalizar.addClass('hide');
        gerarResumo();
    }

    function gerarResumo() {
        var conteudoHtml,
            numeroDeQuestoes = questoes.length,
            numeroDeAlternativas,
            questao,
            checkedHtml;

        conteudoHtml = '';
        for (var i = 0; i < numeroDeQuestoes; i++) {
            questao = questoes[i];
            numeroDeAlternativas = questao.alternativas.length;

            conteudoHtml += '<div class="questao"><h5>' + (i + 1) + '. ' + questao.titulo + '</h5>';
            for (var j = 0; j < numeroDeAlternativas; j++) {
                checkedHtml = '';
                if (questao.resposta === j) {
                    checkedHtml = 'checked="checked"';
                }

                conteudoHtml += '<div class="alternativa">' +
                    '<input type="radio" name="alternativa_' + i + '" id="alternativa_' + i + '_'  + j + '" class="with-gap" ' + checkedHtml + '>' +
                    '<label for="alternativa_' + i + '_'  + j + '">' + questao.alternativas[j] + '</label>' +
                    '</div>';
            }
            conteudoHtml += '</div>';
        }
        conteudoHtml += '<button id="btn-enviar-respostas" class="btn waves-effect waves-light right" type="button">' +
            'Enviar respostas para correção' +
            '<i class="mdi-content-send right"></i>' +
            '</button>';

        $tituloDaQuestao.html('<h4>Resumo das suas respostas</h4>');
        $conteudoDaQuestao.html(conteudoHtml);

        $('#btn-enviar-respostas').click(enviarRespostas);
    }

    function enviarRespostas() {
        var respostasCorretas = 0,
            numeroDeQuestoes = questoes.length,
            questao;

        for (var i = 0; i < numeroDeQuestoes; i++) {
            questao = questoes[i];
            if (questao.resposta === questao.alternativaCorreta) {
                respostasCorretas++;
            }
        }

        $tituloDaQuestao.html('<h4>Respostas enviadas</h4>');
        $conteudoDaQuestao.html('<h5>Você acertou ' + respostasCorretas + ' de ' + numeroDeQuestoes + ' questões.</h5>');
    }

    return {
        init: init
    };
})();

Quiz.init();
