let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let statistic = document.querySelector('.statistic')
let start_field = document.querySelector('.start')
let button = document.querySelector('.start-btn')
let container = document.querySelector('.container')
function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)

}
let signs = ['+', '-', '*', '/']
function getRandomSign() {
    return signs[randint(0, 3)]
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    }
}
class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct = a + b
        }
        else if (sign == '-') {
            this.correct = a - b
        }
        else if (sign == '*') {
            this.correct = a * b
        }
        else if (sign == '/') {
            this.correct = (a / b).toFixed(2)
        }

        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(Math.round(this.correct) + 15, Math.round(this.correct) + 1),
            randint(Math.round(this.correct) + 15, Math.round(this.correct) + 1),
        ]
        shuffle(this.answers)
    }


    display() {
        question_field.innerHTML = this.question

        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

button.addEventListener('click', function () {
    start_field.style.display = 'none'
    container.style.display = 'flex'

    setTimeout(function () {
        statistic.innerHTML = `Ви дали ${correct_answers_given} з ${total_answers_given}👩🏿. Точність - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.` 
        start_field.style.display='flex'
        container.style.display='none'
    }, 15000)
})

let correct_sound = new Audio('correctsound.mp3')
let wrong_sound = new Audio('wronganswer.mp3')

let total_answers_given = 0
let correct_answers_given = 0

let current_question = new Question()
current_question.display()


for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function () {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            console.log("Правильно")
            correct_answers_given++
            correct_sound.currentTime = 0
            correct_sound.play()
            answer_buttons[i].style.background = '#00ff00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFBDE',
                duration: 500,
                easing: 'linear',
                delay: 100,

                
            })
        } else {
            console.log("Неправильно")
            wrong_sound.currentTime = 0
            wrong_sound.play()
            answer_buttons[i].style.background = '#ff0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFBDE',
                duration: 500,
                easing: 'linear',
                delay: 100,


            })
        }


        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}

