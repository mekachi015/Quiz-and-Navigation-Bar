var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWEr

    data: [
        {
            q: "Who is the president of South Africa?",
            o: ["David Tlale", "Cyril Ramaphosa", "Julius Malema", "Donald Trump"],
            a: 1 // arrays start with 0, so answer is 70 meters
        },
        {
            q: "How many does a circle have?",
            o: ["1","5","3","0"],
            a: 3
        },
        {
            q: "What is the capital city of South Africa?",
            o: ["Gauteng", "Johannesburg", "Pretoria","Cape Town"
            ],
            a: 2 || 3
        },
        {
            q: "Which is the seventh planet from the sun?",
            o: ["Uranus","Earth","Pluto", "Mars"],
            a: 0
        },
        {
            q: "Which is the largest ocean on Earth?",
            o: ["Atlantic Ocean", "Indian Ocean","Arctic Ocean","Pacific Ocean"],
            a: 3
        },
        {
            q: "What is the chemical symbol for water?",
            o: ["H20", "CO2", "NaCl", "O2"],
            a: 0
        },
        {
            q: "Which planet is known as the Red Planet?",
            o: ["Jupiter", "Venus", "Mars", "Saturn"],
            a: 2
        },
        {
            q: "What is the tallest mountain in the world?",
            o: ["Mount Everest", "K2", "Killamanjaro", "Mount Fiji"],
            a: 0
        },
        {
            q: "Who wrote the play Romeo and Julliet?",
            o:["Jane Austen", "Charles Dicken", "Mark Twain", "William Shakespeare"],
            a: 3
        },
        {
            q:"What is the chemical symbol for gold?",
            o: ["Au", "Ag", "Fe", "Pb"],
            a: 0
        },
        {
            q: "What is the capital of France?",
            o: ["London", "Berlin", "Paris", "Rome"],
            a: 2
        },
        {
            q: "Who painted the Mona Lisa?",
            o: ["Leonardo da Vinci","Vincent Van Gogh", "Pablo Picasso", "Michelangelo"],
            a: 0
        },
        {
            q: "What is the largest mammal in the world?",
            o: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            a: 1
        },
        {
            q: "Who invented the telephone?",
            o: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
            a: 1
        }

    ],

    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) INIT QUIZ HTML
    init: () => {
        // (B1) WRAPPER
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: () => {
        // (C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        // (C2) OPTIONS
        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => { quiz.select(label); });
            quiz.hAns.appendChild(label);
        }
    },

    // (D) OPTION SELECTED
    select: (option) => {
        // (D1) DETACH ALL ONCLICK
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // (D2) CHECK IF CORRECT
        let correct = option.dataset.idx == quiz.data[quiz.now].a;
        if (correct) {
            quiz.score++;
            option.classList.add("correct");
        } else {
            option.classList.add("wrong");
        }

        // (D3) NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(() => {
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
                quiz.hAns.innerHTML = "";
            }
        }, 1000);
    },

    // (E) RESTART QUIZ
    reset: () => {
        quiz.now = 0;
        quiz.score = 0;
        quiz.draw();
    }
};
window.addEventListener("load", quiz.init);
