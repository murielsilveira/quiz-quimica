var Quiz = (function() {
    'use strict';

    var questoes = [
            {
                titulo: '(PUC-RIO 2007) Nossos corpos podem sintetizar onze aminoácidos em quantidades suficientes para nossas necessidades. Não podemos, porém, produzir as proteínas para a vida a não ser ingerindo os outros nove, conhecidos como aminoácidos essenciais.'+
                    '<br><br><img src="img/questao-1.jpg" height="120"/><br><br>'+
                    'Assinale a alternativa que indica apenas funções orgânicas encontradas no aminoácido essencial fenilalanina, mostrada na figura acima.',
                alternativas: [
                    'Álcool e amida.',
                    'Éter e éster.',
                    'Ácido orgânico e amida.',
                    'Ácido orgânico e amina primária.',
                    'Amina primária e aldeído.'
                ],
                alternativaCorreta: 3
            },
            {
                titulo: '(UFRS) O GLP (gás liquefeito de petróleo) é uma fração de destilação constituída essencialmente de:',
                alternativas: [
                    'Metano.',
                    'Propano e butano.',
                    'Hexano.',
                    'Metano, etano e propano.',
                    'Hidrocarbonetos parafínicos com até dez carbonos na molécula.'
                ],
                alternativaCorreta: 1
            },
            {
                titulo: '(CEFET – PR) O gás de cozinha (GLP) é produzido por refino do petróleo. É falso afirmar que:',
                alternativas: [
                    'É gasoso na temperatura ambiente.',
                    'Sob pressão, está liquefeito dentro do bujão.',
                    'É formado por compostos de 5 a 6 átomos de carbono.',
                    'É menos denso que a gasolina.',
                    'Tem ponto de ebulição mais baixo que o querosene.'
                ],
                alternativaCorreta: 2
            },
            {
                titulo: '(PUC-RIO 2009) Considere as informações apresentadas sobre as seguintes substâncias:'+
                    '<br><br>'+
                    '<br>I - ácido clorídrico: de fórmula HCl, age como ácido forte quando dissolvido em água.'+
                    '<br>II - nitrato de potássio: de fórmula KNO3, é um sal iônico que se dissocia totalmente em água.'+
                    '<br>III - argônio: de fórmula Ar, é um gás nobre, inerte.'+
                    '<br>IV - metano: de fórmula CH4, é um alcano, gasoso, cuja geometria molecular é a de um tetraedro regular.'+
                    '<br><br>'+
                    'A partir dessas informações, pode-se afirmar que:',
                alternativas: [
                    'Apenas o argônio é apolar.',
                    'Argônio e metano são muito pouco solúveis em água.',
                    'Nitrato de potássio é solúvel apenas em solventes apolares.',
                    'Metano forma ligações de hidrogênio entre suas moléculas.',
                    'O HCl, em meio aquoso não conduz eletricidade.'
                ],
                alternativaCorreta: 1
            },
            {
                titulo: '(UFPR 2010) As plantas sintetizam a estrutura de poliisopreno das borrachas naturais usando o pirofosfato de 3-metil-3-butenila. Muitos outros produtos naturais são derivados desse composto, incluindo os terpenos. O sesquiterpeno farnesol é uma das substâncias mais comuns do reino vegetal e é um precursor biossintético da estrutura de esteroides.'+
                    '<br><br><img src="img/questao-5.jpg" height="120"/><br><br>'+
                    'Sobre o composto orgânico farnesol, considere as seguintes afirmativas:',
                alternativas: [
                    'A estrutura do farnesol apresenta seis átomos de carbono sp2.',
                    'O produto de oxidação do farnesol é uma cetona.',
                    'O farnesol é um álcool insaturado.',
                    'O composto farnesol apresenta cadeia ramificada.',
                    'A cadeia hidrocarbônica do farnesol apresenta três ligações duplas na configuração trans.'
                ],
                alternativaCorreta: 3
            },
            {
                titulo: '(CESGRANRIO) Identifique, entre os compostos mencionados abaixo, o composto iônico:',
                alternativas: [
                    'BCl3',
                    'NaCl',
                    'CsCl',
                    'HCl',
                    'Cl2'
                ],
                alternativaCorreta: 1
            },
            {
                titulo: '(ABC) Pertencem à família dos calcogênios:',
                alternativas: [
                    'O cloro e o bromo.',
                    'O oxigênio e o nitrogênio.',
                    'O selênio e o telúrio.',
                    'O sódio e o potássio.',
                    'O cálcio e o bário.'
                ],
                alternativaCorreta: 2
            },
            {
                titulo: '(ABC) Entre as moléculas abaixo, a que forma pontes de hidrogênio entre suas moléculas é:',
                alternativas: [
                    'CH4',
                    'CH3 – CH2 – OH',
                    'CH3 – O – CH3',
                    'C2H6',
                    'N(CH3)3'
                ],
                alternativaCorreta: 1
            },
            {
                titulo: '(PUC) As pontes de hidrogênio aparecem:',
                alternativas: [
                    'Quando o hidrogênio está ligado a um elemento muito eletropositivo.',
                    'Quando o hidrogênio está ligado a um elemento muito eletronegativo.',
                    'Em todos os compostos hidrogenados.',
                    'Somente em compostos inorgânicos.',
                    'Somente nos ácidos de Arrhenius.'
                ],
                alternativaCorreta: 1
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
            dicaHtml = '',
            numeroDeAlternativas = questao.alternativas.length;

        tituloHtml = '<h5>' + (questao_atual + 1) + '. ' + questao.titulo + '</h5>';

        for (var i = 0; i < numeroDeAlternativas; i++) {
            alternativasHtml += '<div class="alternativa">' +
                '<input type="radio" name="alternativa" id="alternativa_' + i + '" class="with-gap">' +
                '<label for="alternativa_' + i + '">' + questao.alternativas[i] + '</label>' +
                '</div>';
        }

        dicaHtml ='<br><button id="dica_' + questao_atual + '" class="btn btn-flat waves-effect waves-light btn-action" type="button">Dica</button>';

        $tituloDaQuestao.html(tituloHtml);
        $conteudoDaQuestao.html(alternativasHtml);
        $('.alternativa input').click(selecionarAlternativa);
        if (questao.resposta !== undefined) {
            $('#alternativa_' + questao.resposta).prop('checked', true);
        }

        $('#dica_' + questao_atual).click(mostrarDica);

        ajustarBotoes();
    }

    function mostrarDica(e) {
        var $btn = $(e.target),
            questao_index = $btn.attr('id').split('_')[1],
            questao = questoes[questao_index];
            // terminar
        $btn.hide();
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
