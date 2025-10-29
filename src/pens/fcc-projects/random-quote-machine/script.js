const quotes = [
    {
        quote: "Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
        speaker: "Jesus Christ",
        title: "Matthew 25:40",
        year: 1384,
    },
    {
        quote: "Is this a dagger which I see before me",
        speaker: "Macbeth",
        title: "Macbeth: Act 2, Scene 1",
        year: 1611,
    },
    {
        quote: "Abashed the devil stood and felt how awful goodness is and saw Virtue in her shape how lovely: and pined his loss",
        speaker: "John Milton",
        title: "Paradise Lost",
        year: 1667,
    },
    {
        quote: "For although we may fully respect our social conventions, and dutifully abide by the restrictions which education has imposed on us, it may unfortunately happen that through the perversity of others we encounter only the thorns of life, whilst the wicked gather nothing but roses.",
        speaker: "Marquis de Sade",
        title: "Justine",
        year: 1791,
    },
    {
        quote: "There are books of which the backs and covers are by far the best parts.",
        speaker: "Mr Brownlow",
        title: "Oliver Twist",
        year: 1838,
    },
    {
        quote: "It’s a pleasant world we live in, sir, a very pleasant world. There are bad people in it, Mr. Richard, but if there were no bad people, there would be no good lawyers.",
        speaker: "Sampson Brass",
        title: "The Old Curiosity Shop",
        year: 1841,
    },
    {
        quote: "Humbug",
        speaker: "Ebenezer Scrooge",
        title: "A Christmas Carol",
        year: 1843,
    },
    {
        quote: "I will honour Christmas in my heart, and try to keep it all the year. I will live in the Past, the Present, and the Future. The Spirits of all Three shall strive within me. I will not shut out the lessons that they teach!",
        speaker: "Ebenezer Scrooge",
        title: "A Christmas Carol",
        year: 1843,
    },
    {
        quote: "But the rich man--not to make any invidious comparison--is always sold to the institution which makes him rich.",
        speaker: "Henry David Thoreau",
        title: "Civil Disobedience",
        year: 1849,
    },
    {
        quote: "My advice is, never do to-morrow what you can do today. Procrastination is the thief of time.",
        speaker: "Mr Micawber",
        title: "David Copperfield",
        year: 1850,
    },
    {
        quote: "Dead, your Majesty. Dead, my lords and gentlemen. Dead, Right Reverends and Wrong Reverends of every order. Dead, men and women, born with Heavenly compassion in your hearts. And dying thus around us every day.",
        speaker: "Charles Dickens",
        title: "Bleak House",
        year: 1853,
    },
    {
        quote: "As natural selection acts solely by the preservation of profitable modifications, each new form will tend in a fully-stocked country to take the place of, and finally to exterminate, its own less improved parent or other less-favoured forms with which it comes into competition.",
        speaker: "Charles Darwin",
        title: "On the Origin of Species",
        year: 1859,
    },
    {
        quote: "Go on, get out! Last words are for fools who haven’t said enough!",
        speaker: "Karl Marx",
        title: "Reportedly said on his deathbed",
        year: 1883,
    },
    {
        quote: "No amount of assistance will give a jellyfish a backbone. No outside propping will make some men stand errect. All material help from without is useful only in so far as it develops moral strength within.",
        speaker: "William Booth",
        title: "In Darkest England and the Way Out",
        year: 1890,
    },
    {
        quote: "The only way to get rid of a temptation is to yield to it.",
        speaker: "Lord Henry Wotton",
        title: "The Picture of Dorian Gray",
        year: 1890,
    },
    {
        quote: "We learn from failure, not from success!",
        speaker: "Professor Abraham Van Helsing",
        title: "Dracula",
        year: 1897,
    },
    {
        quote: "His soul swooned slowly as he heard the snow falling faintly through the universe and faintly falling, like the descent of their last end, upon all the living and the dead.",
        speaker: "James Joyce",
        title: "The Dubliners",
        year: 1914,
    },
    {
        quote: "That's no moon. It's a space station.",
        speaker: "Obi-Wan Kenobi",
        title: "Star Wars",
        year: 1977,
    },
    {
        quote: "No. <em>I</em> am your father.",
        speaker: "Darth Vader",
        title: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    {
        quote: "Ray, when someone asks you if you're a god, you say YES!",
        speaker: "Winston Zeddemore",
        title: "Ghostbusters",
        year: 1984,
    },
    {
        quote: "You ever dance with the devil in the pale moonlight?",
        speaker: "The Joker",
        title: "Batman",
        year: 1989,
    },
    {
        quote: "EXCELLENT!",
        speaker: "Bill & Ted",
        title: "Bill & Ted's Excellent Adventure",
        year: 1989,
    },
    {
        quote: "THIS IS NOT AN EXIT.",
        speaker: "Bret Easton Ellis",
        title: "American Psycho",
        year: 1991,
    },
    {
        quote: "Contract or no, I will not bow to any sponsor.",
        speaker: "Wayne",
        title: "Wayne's World",
        year: 1992,
    },
    {
        quote: "You are not special. You are not a beautiful or unique snowflake. You're the same decaying organic matter as everything else.",
        speaker: "Tyler Durden",
        title: "Fight Club",
        year: 1999,
    },
    {
        quote: "Can't we go home yet? My feet hurt. All this fresh air is making my hair move. And I don't know how much longer I can complain.",
        speaker: "Homer Simpson",
        title: "The Simpsons: Monty Can't Buy Me Love",
        year: 1999,
    },
    {
        quote: "This I don't need",
        speaker: "Krusty the Clown",
        title: "The Simpsons: Lisa the Tree Hugger",
        year: 2000,
    },
    {
        quote: "(Referring to Tommy's gun): Heavy is good, heavy is reliable. If it doesn't work you can always hit them with it.",
        speaker: "Boris 'The Blade' Yurinov",
        title: "Snatch",
        year: 2000,
    },
    {
        quote: "A wise man told me don't argue with fools/Cause people from a distance can't tell who is who",
        speaker: "Jay Z",
        title: "The Blueprint",
        year: 2001,
    },
    {
        quote: "I am the one who knocks!",
        speaker: "Walter White",
        title: "Breaking Bad",
        year: 2008,
    },
    {
        quote: "It's not about money... it's about <em>sending a message</em>: everything burns!",
        speaker: "The Joker",
        title: "The Dark Knight",
        year: 2008,
    },
];

const elTweetBtn = document.getElementById("tweet");
const elNewQuoteBtn = document.getElementById("new-quote");
const elQuote = document.querySelector(".quote-text");
const elSource = document.querySelector(".source");

function getRandomNumberInRange(maxNum) {
    return Math.floor(Math.random() * maxNum);
}

function changePageBackgroundToRandomColor() {
    const backgroundColors = [
        "radial-gradient(circle, #845ec2, #7658a5, #685189, #5a4b6d, #4b4453)",
        "radial-gradient(circle, #4b79a1, #426a8c, #395b78, #304c64, #283e51)",
        "radial-gradient(circle, #be5869, #9d5166, #7c4a5d, #5c4350, #403a3e)",
        "radial-gradient(circle, #6a9113, #007746, #005656, #003341, #141517)",
        "radial-gradient(circle, #0b8793, #00698c, #014a7b, #2e295c, #360033)",
        "radial-gradient(circle, #73c8a9, #4fa4a1, #457f8c, #425b6b, #373b44)",
        "radial-gradient(circle, #00c6ff, #00b4ff, #00a1ff, #008bff, #0072ff)",
        "radial-gradient(circle, #e74c3c, #ad363b, #722631, #3a1820, #000000)",
        "radial-gradient(circle, #f0c27b, #d98b65, #b5595a, #853053, #4b1248)",
        "linear-gradient(to right, #5f2c82, #49a09d)",
        "radial-gradient(circle, #f09819, #f58919, #f9781e, #fd6626, #ff512f)",
        "radial-gradient(circle, #a5cc82, #48b18c, #009199, #006d98, #00467f)",
        "radial-gradient(circle, #cc2b5e, #bc2a6d, #a82e7a, #903483, #753a88)",
        "radial-gradient(circle, #ea384d, #e53044, #df273a, #d91d31, #d31027)",
        "radial-gradient(circle, #928dab, #736e89, #555168, #393549, #1f1c2c)",
    ];
    newColor =
        backgroundColors[getRandomNumberInRange(backgroundColors.length)];
    document.querySelector(".flex-container").style.background = newColor;
    document.body.style.background = newColor;
}

function tweet() {
    const tweet = `https://twitter.com/intent/tweet?text=${
        elQuote.innerText
    } - ${elSource.innerText} ${encodeURIComponent("#quotes")}`;
    window.open(tweet);
}

function getRandomQuote() {
    const randomNumber = getRandomNumberInRange(quotes.length);
    elQuote.innerHTML = quotes[randomNumber]["quote"];
    elSource.innerHTML = `${quotes[randomNumber]["speaker"]}, <em>${quotes[randomNumber]["title"]}</em> (${quotes[randomNumber]["year"]})`;
}

function changeBackgroundAndQuote() {
    changePageBackgroundToRandomColor();
    getRandomQuote();
}

function checkIfSpacebar(e) {
    if (e.keyCode == 32) {
        changeBackgroundAndQuote();
    }
}

function checkIfTkey(e) {
    if (e.keyCode == 84) {
        tweet();
    }
}

elTweetBtn.addEventListener("click", tweet);
elNewQuoteBtn.addEventListener("click", changeBackgroundAndQuote);

document.addEventListener("keyup", checkIfSpacebar);
document.addEventListener("keyup", checkIfTkey);
document.addEventListener("DOMContentLoaded", function (event) {
    changeBackgroundAndQuote();
});
