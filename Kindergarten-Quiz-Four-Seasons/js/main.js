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
                spokenQuestion: "img/winter/Winter.m4a",
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
                spokenQuestion: "",
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
                spokenQuestion: "",
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
                spokenQuestion: "",
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
                spokenQuestion: "",
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

function titleClick(event) {
    'use strict';
    var audioObj = document.getElementById('audioObj');
    
    audioObj.play();
}

function setQuestion(q, numColumns) {
    'use strict';
    var qt = document.getElementById('questionTitle'),
        l = document.getElementById('answerList'),
        ev = null,
        rowDiv = null,
        audioObj = null,
        addedPrintButton = false;
    
    // empty past data
    qt.innerHTML = '';
    l.innerHTML = '';
    document.getElementById('confirmationCelebration').className = 'noCorrectConfirmation';
    
    // set question title
    if (q && q.questionTitle) {
        // set up sound file if it exists
        if (q.spokenQuestion) {
            audioObj = document.getElementById('audioObj');
            audioObj.setAttribute('src', q.spokenQuestion);
            
            qt.addEventListener('click', titleClick, true);
        } else {
            qt.removeEventListener('click', titleClick);
        }

        qt.textContent = q.questionTitle;
    }
                    
    // set question options
    if (q && q.options && Array.isArray(q.options)) {
        q.options.forEach(function (o, oI, oArr) {
            // add each option
            var img = document.createElement('img'),
                lnk = document.createElement('a');
            
            // set up attributes
            img.setAttribute('src', o.imageSrc);
            img.className = 'option';
            lnk.className = 'optionLink';
            
            // append to row, creating a new row if needed
            if ((oI % numColumns) === 0 || !rowDiv) {
                rowDiv = document.createElement('div');
                rowDiv.className = 'optionRow';
                l.appendChild(rowDiv);
            }
            lnk.appendChild(img);
            rowDiv.appendChild(lnk);
            
            switch (q.result) {
            case 'next':
                img.onclick = o.correct ? function (event) {
                    // confirm correct answer
                    this.className = 'chosenOptionCorrect';
                    document.getElementById('confirmationCelebration').className = 'correctConfirmation';
                    
                    document.dispatchEvent(new CustomEvent('correctAnswer', {detail: numColumns}));
                        
                    return false;
                } : function (event) {
                    // turn red
                    this.className = 'chosenOptionIncorrect';
                        
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
    window.setTimeout(function () {
        var q = document.globalVars.questions[document.globalVars.currentQuestionIndex];

        document.globalVars.currentQuestionIndex += 1;
        if (document.globalVars.currentQuestionIndex < document.globalVars.questions.length) {
            setQuestion(document.globalVars.questions[document.globalVars.currentQuestionIndex], event.detail);
        }
    }, 1500);
}

function doFirstQuestion(numColumns) {
    'use strict';
    if (document.globalVars && document.globalVars.questions && document.globalVars.questions && Array.isArray(document.globalVars.questions)) {
        document.addEventListener('correctAnswer', correctAnswer, false);

        document.globalVars.currentQuestionIndex = 0;

        setQuestion(document.globalVars.questions[0], numColumns);
    }
}