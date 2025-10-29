var typeOfMedia = ["film", "book", "TV show", "play", "quote"];

// Quote, Speaker, Title, Year

var quotes = [
    [
        "Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
        "Jesus Christ",
        "Matthew 25:40",
        "1384",
    ],
    [
        "Is this a dagger which I see before me",
        "Macbeth",
        "Macbeth: Act 2, Scene 1",
        1611,
    ],
    [
        "Abashed the devil stood and felt how awful goodness is and saw Virtue in her shape how lovely: and pined his loss",
        "John Milton",
        "Paradise Lost",
        1667,
    ],
    [
        "For although we may fully respect our social conventions, and dutifully abide by the restrictions which education has imposed on us, it may unfortunately happen that through the perversity of others we encounter only the thorns of life, whilst the wicked gather nothing but roses.",
        "Marquis de Sade",
        "Justine",
        1791,
    ],
    [
        "There are books of which the backs and covers are by far the best parts.",
        "Mr Brownlow",
        "Oliver Twist",
        1838,
    ],
    [
        "It’s a pleasant world we live in, sir, a very pleasant world. There are bad people in it, Mr. Richard, but if there were no bad people, there would be no good lawyers.",
        "Sampson Brass",
        "The Old Curiosity Shop",
        1841,
    ],
    ["Humbug", "Ebenezer Scrooge", "A Christmas Carol", 1843],
    [
        "I will honour Christmas in my heart, and try to keep it all the year. I will live in the Past, the Present, and the Future. The Spirits of all Three shall strive within me. I will not shut out the lessons that they teach!",
        "Ebenezer Scrooge",
        "A Christmas Carol",
        1843,
    ],
    [
        "But the rich man--not to make any invidious comparison--is always sold to the institution which makes him rich.",
        "Henry David Thoreau",
        "Civil Disobedience",
        1849,
    ],
    [
        "My advice is, never do to-morrow what you can do today. Procrastination is the thief of time.",
        "Mr Micawber",
        "David Copperfield",
        1850,
    ],
    [
        "Dead, your Majesty. Dead, my lords and gentlemen. Dead, Right Reverends and Wrong Reverends of every order. Dead, men and women, born with Heavenly compassion in your hearts. And dying thus around us every day.",
        "Charles Dickens",
        "Bleak House",
        1853,
    ],
    [
        "As natural selection acts solely by the preservation of profitable modifications, each new form will tend in a fully-stocked country to take the place of, and finally to exterminate, its own less improved parent or other less-favoured forms with which it comes into competition.",
        "Charles Darwin",
        "On the Origin of Species",
        1859,
    ],
    [
        "Go on, get out! Last words are for fools who haven’t said enough!",
        "Karl Marx",
        "",
        1883,
    ],
    [
        "No amount of assistance will give a jellyfish a backbone. No outside propping will make some men stand errect. All material help from without is useful only in so far as it develops moral strength within.",
        "William Booth",
        "In Darkest England and the Way Out",
        1890,
    ],
    [
        "The only way to get rid of a temptation is to yield to it.",
        "Lord Henry Wotton",
        "The Picture of Dorian Gray",
        1890,
    ],
    [
        "We learn from failure, not from success!",
        "Professor Abraham Van Helsing",
        "Dracula",
        1897,
    ],
    [
        "His soul swooned slowly as he heard the snow falling faintly through the universe and faintly falling, like the descent of their last end, upon all the living and the dead.",
        "James Joyce",
        "The Dubliners",
        1914,
    ],
    [
        "That's no moon. It's a space station.",
        "Obi-Wan Kenobi",
        "Star Wars",
        1977,
    ],
    [
        "No. *I* am your father.",
        "Darth Vader",
        "Star Wars: Episode V - The Empire Strikes Back",
        1980,
    ],
    [
        "Ray, when someone asks you if you're a god, you say YES!",
        "Winston Zeddemore",
        "Ghostbusters",
        1984,
    ],
    [
        "You ever dance with the devil in the pale moonlight?",
        "The Joker",
        "Batman",
        1989,
    ],
    ["EXCELLENT!", "Bill & Ted", "Bill & Ted's Excellent Adventure", 1989],
    ["THIS IS NOT AN EXIT.", "Bret Easton Ellis", "American Psycho", 1991],
    [
        "Contract or no, I will not bow to any sponsor.",
        "Wayne",
        "Wayne's World",
        1992,
    ],
    [
        "You are not special. You are not a beautiful or unique snowflake. You're the same decaying organic matter as everything else.",
        "Tyler Durden",
        "Fight Club",
        1999,
    ],
    [
        "Can't we go home yet? My feet hurt. All this fresh air is making my hair move. And I don't know how much longer I can complain.",
        "Homer Simpson",
        "The Simpsons: Monty Can't Buy Me Love",
        1999,
    ],
    [
        "This I don't need",
        "Krusty the Clown",
        "The Simpsons: Lisa the Tree Hugger",
        2000,
    ],
    [
        "[referring to Tommy's gun] Heavy is good, heavy is reliable. If it doesn't work you can always hit them with it.",
        "Boris 'The Blade' Yurinov",
        "Snatch",
        2000,
    ],
    [
        "A wise man told me don't argue with fools/Cause people from a distance can't tell who is who",
        "Jay Z",
        "The Blueprint",
        2001,
    ],
    ["I am the one who knocks!", "Walter White", "Breaking Bad", 2008],
    [
        "It's not about money... it's about *sending a message*: everything burns!",
        "The Joker",
        "The Dark Knight",
        2008,
    ],
];

var colours = [
    "98878f",
    "8c938a",
    "626e60",
    "ff6833",
    "b56357",
    "ff5992",
    "ee6e73",
    "945d60",
    "af473c",
];

function randomQuote() {
    var randomNumber = Math.floor(Math.random() * quotes.length);

    document.getElementById("quote").innerHTML = quotes[randomNumber][0];

    document.getElementById("speaker").innerHTML = quotes[randomNumber][1];

    document.getElementById("title").innerHTML = quotes[randomNumber][2];

    document.getElementById("year").innerHTML = quotes[randomNumber][3];

    randomBackgroundColour();
}

function tweet() {
    var quote = document.getElementById("quote").innerHTML;
    var speaker = document.getElementById("speaker").innerHTML;
    var title = document.getElementById("title").innerHTML;

    var tweet = "";

    if (title) {
        tweet =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(quote + " - " + title + " #quotes");
    } else {
        tweet =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(quote + " - " + speaker + " #quotes");
    }

    window.open(tweet);
}

$(document).ready(randomQuote());

function randomBackgroundColour() {
    var randomNumber = Math.floor(Math.random() * colours.length);

    document.body.style.backgroundColor = "#" + colours[randomNumber];
}
