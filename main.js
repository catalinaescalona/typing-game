// Typing Game Prototype
// Created by Catalina Escalona, Winter Semester 2023-24
// Course: "Web Coding: Intro to Web Development and Game Prototyping"
// University of Applied Arts Vienna 

const quotes = [
    "And I am bored to death with it. Bored to death with this place, bored to death with my life, bored to death with myself.",
    "There were two classes of charitable people: one, the people who did a little and made a great deal of noise; the other, the people who did a great deal and made no noise at all.",
    "Constancy in love is a good thing; but it means nothing, and is nothing, without constancy in every kind of effort.",
    "A word in earnest is as good as a speech.",
    "The universe makes rather an indifferent parent, I'm afraid.",
    "I only ask to be free. The butterflies are free. Mankind will surely not deny to Harold Skimpole what it concedes to the butterflies.",
    "When he has nothing else to do, he can always contemplate his own greatness. It is a considerable advantage to a man, to have so inexhaustible a subject.",
    "But injustice breeds injustice; the fighting with shadows and being defeated by them necessitates the setting up of substances to combat.",
    "I find the nights long, for I sleep but little, and think much.",
    "Anything to vary this detestable monotony.",
    "Chance people on the bridges peeping over the parapets into a nether sky of fog, with fog all round them, as if they were up in a balloon, and hanging in the misty clouds.",
    "Mr. Snagsby, as a timid man, is accustomed to cough with a variety of expressions, and so to save words.",
    "Trust in nothing but in Providence and your own efforts. Never separate the two, like the heathen waggoner.",
    "He is an honorable, obstinate, truthful, high-spirited, intensely prejudiced, perfectly unreasonable man.",
    "I had a confident expectation that things would come round and be all square.",
    "Lady Dedlock is always the same exhausted deity, surrounded by worshippers, and terribly liable to be bored to death, even while presiding at her own shrine.",
]

const stats = {
    words: 0,
    characters: 0,
    time: 0,
    fastest: {
        quote: '',
        time: 0,
    },
    achievements: {
        ftl: {
            label: '',
            explanation: '',
            unlocked: false
        },
        dontpanic: {
            label: '',
            explanation: '',
            unlocked: false
        },
        fourtytwo: {
            label: '',
            explanation: '',
            unlocked: false
        },
    },
    reset: function () {
        this.words = 0
        this.characters = 0
        this.time = 0
        this.fastest.quote = ''
        for (const key in this.achievements) {
            this.achievements[key].unlocked = false
        }
    }
}

let uncompleted = []
let timeStart
let typingErrors

// little helper function to get a random integer
function randInt(max) {
    return Math.floor(Math.random() * max);
}

function resetQuotes () {
    let quotePool = [...quotes]
    // use the following for debugging, to get a quick test sentence first
    //uncompleted.push('Test sentence.')
    while (quotePool.length > 0) {
      let i = randInt(quotePool.length)
      let [quote] = quotePool.splice(i, 1)
      uncompleted.push(quote)
    }
}

function resetCompletedQuotes () {
    $( '#completed ul' ).children().remove()
}

function resetGame () {
    resetCompletedQuotes()
    resetQuotes()
    stats.reset()
    $( '#input' )
      .removeClass('correct')
      .removeClass('incorrect')
      .attr('disabled', 'true')
      .val('')
    $( '#current-quote' ).html('— Hit the start button to get the first quote —')
}

function nextQuote () {
    $( '#success' ).text('')
    $( '#current-quote' ).text(uncompleted[0])
    $( '#input' )
      .removeClass('correct')
      .removeClass('incorrect')
      .val('')
      .removeAttr('disabled')
      .focus()
    timeStart = Date.now()
    typingErrors = 0
}

function processInput () {
    $input = $( '#input' )
    quote = uncompleted[0]
    value = $input.val()
    if ( quote.startsWith( value ) ) {
      $input.addClass('correct')
      $input.removeClass('incorrect')
    } else {
      // only count a typing error if the sentence was not already incorrect
      if (! $input.hasClass('incorrect')) {
        typingErrors++
      }
      $input.addClass('incorrect')
      $input.removeClass('correct')
    }
   
    if ( quote === value ) {
      let timeEnd = Date.now()
      seconds = ( timeEnd - timeStart ) / 1000
      $input.attr('disabled', 'true')
      $( '#success' ).text('Wonderful! You completed this quote in '+seconds+' seconds with '+typingErrors+' typing error(s).')
      $( '#completed ul' ).append( $( '<li>'+quote+'</li>' ) )
      uncompleted.splice(0, 1)
    }
   
    // now check if this was the last quote
    if ( uncompleted.length === 0 ) {
      $( '#start' ).remove()
      $( '#reset' ).remove()
      $( '#game-completed' ).show( 'slow' )
    }
}

$( document ).ready(function () {
    resetGame()
    $( '#reset' ).on('click', resetGame)
    $( '#start' ).on('click', nextQuote)
    $( '#input' ).on('input', processInput).val('')
})