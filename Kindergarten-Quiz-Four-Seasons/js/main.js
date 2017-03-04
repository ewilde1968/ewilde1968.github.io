function setGlobals() {
    'use strict';
    return {
        filename: "SeasonsKindergarten.txt",
        questions: null
    };
}

function loadQuestions(g) {
    'use strict';
    
    var data = { // hard coded for first implementation
        quizTitle: "Seasons",
        questions: [
            {
                questionTitle: "Winter - Which one can you do in Winter?",
                result: 'next',
                options: [
                    {correct: true, imageSrc: "img/winter/The-Dog-Sled-a4.jpg"},
                    {imageSrc: "img/spring/beautiful-spring-a4.jpg"},
                    {imageSrc: "img/summer/Beach-a4.jpg"},
                    {imageSrc: "img/fall/Autunno-27-a4.jpg"}
                ]
            },
            {
                questionTitle: "Spring - Which one can happen in Spring?",
                result: 'next',
                options: [
                    {correct: true, imageSrc: "img/spring/the-bees-and-spring-a4.jpg"},
                    {imageSrc: "img/winter/The-Ice-Hockey-a4.jpg"},
                    {imageSrc: "img/summer/Dora-a4.jpg"},
                    {imageSrc: "img/fall/The-Cute-Pilgrim-Hat-a4.jpg"}
                ]
            },
            
            {
                questionTitle: "Summer - Which one can you do in Summer?",
                result: 'next',
                options: [
                    {correct: true, imageSrc: "img/summer/Barbecue-a4.jpg"},
                    {imageSrc: "img/winter/The-Kids-Making-A-Snowman-a4.jpg"},
                    {imageSrc: "img/spring/The-a-day-in-spring-a4.jpg"},
                    {imageSrc: "img/fall/The-scarecrow-a4.jpg"}
                ]
            },
            {
                questionTitle: "Fall - Which one looks like Fall?",
                result: 'next',
                options: [
                    {correct: true, imageSrc: "img/fall/viewing-gallery-for-fall-pumpkin-a4.jpg"},
                    {imageSrc: "img/winter/winter5-a4.jpg"},
                    {imageSrc: "img/spring/spring-coloring-pages-04-a4.jpg"},
                    {imageSrc: "img/summer/Olaf-Enjoying-The-Sun-a4.jpg"}
                ]
            },
            {
                questionTitle: "What is your favorite Spring picture?",
                result: 'print',
                options: [
                    {correct: true, imageSrc: "img/spring/spring-coloring-pages-04-a4.jpg"},
                    {correct: true, imageSrc: "img/spring/beautiful-spring-a4.jpg"},
                    {correct: true, imageSrc: "img/spring/The-a-day-in-spring-a4.jpg"},
                    {correct: true, imageSrc: "img/spring/the-bees-and-spring-a4.jpg"}
                ]
            }
        ]
    };
    
    // set globals
    g.quizTitle = data.quizTitle;
    g.questions = data.questions;
}

function setQuestion(q) {
    'use strict';
    var qt = document.getElementById('questionTitle'),
        l = document.getElementById('answerList'),
        ev,
        addedPrintButton = false;
    
    // empty past data
    qt.innerHTML = '';
    l.innerHTML = '';

    // set question title
    if (q && q.questionTitle) {
        qt.textContent = q.questionTitle;
    }
                    
    // set question options
    if (q && q.options && Array.isArray(q.options)) {
        q.options.forEach(function (o, oI, oArr) {
            // add each option
            var img = document.createElement('img'),
                lnk = document.createElement('a');
            
            img.setAttribute('src', o.imageSrc);
            img.className = 'option';
            lnk.appendChild(img);
            l.appendChild(lnk);
            switch (q.result) {
            case 'next':
                img.onclick = o.correct ? function (event) {
                    // TODO
                    // turn green
                    // pause and celebrate a bit

                    ev = new Event('correctAnswer');
                    document.dispatchEvent(ev);
                        
                    return false;
                } : function (event) {
                    // TODO
                    // turn red
                    // pause and celebrate a bit
                        
                    return false;
                };
                break;
            case 'print':
                // <a href="filetoprint.jpg" class='printButton'></a>
                lnk.setAttribute('href', o.imageSrc);
                lnk.className = 'printButton';
                addedPrintButton = true;
                break;
            default:
                window.alert("Error, malformed question result");
                break;
            }
        });

        // update the DOM with new print buttons
        if (addedPrintButton) {
            ev = new Event('printButtonAdded');
            document.dispatchEvent(ev);
        }
    } else {
        window.alert("Error, malformed question options");
    }
}

function correctAnswer(event) {
    'use strict';
    var q = document.globalVars.questions[document.globalVars.currentQuestionIndex];
    
    document.globalVars.currentQuestionIndex += 1;
    if (document.globalVars.currentQuestionIndex < document.globalVars.questions.length) {
        setQuestion(document.globalVars.questions[document.globalVars.currentQuestionIndex]);
    }
}

function doFirstQuestion() {
    'use strict';
    if (document.globalVars && document.globalVars.questions && document.globalVars.questions && Array.isArray(document.globalVars.questions)) {
        document.addEventListener('correctAnswer', correctAnswer, false);

        document.globalVars.currentQuestionIndex = 0;

        setQuestion(document.globalVars.questions[0]);
    }
}