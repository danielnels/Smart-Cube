const mongoose = require("mongoose");
const {
    User,
    TokenEmailVerification,
    Subject,
    BetaFeedback,
} = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

//get mongoose connection object
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/" + process.env.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    }
);

//sync index on startup to ensure token expirations happen
const syncIndexes = async () => {
    await TokenEmailVerification.syncIndexes();
    await User.syncIndexes();
};
syncIndexes();

//hash password function for seed passwords
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//data object to be inserted in to db
const userSeed = [
    {
        username: "upstudy_admin",
        email: "admin@upstudy.io",
        password: hashPassword("12345"),

        isVerified: false,
        profilePic: `../../assets/images/default-profile-pics/default-profile-pic-${randomIntFromInterval(
            1,
            5
        )}.jpg`,
        roles: [{ role: "admin" }, { role: "user" }],
        savedBooks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "mod_tester",
        email: "mod@upstudy.io",
        password: hashPassword("12345"),
        isVerified: false,
        profilePic: `../../assets/images/default-profile-pics/default-profile-pic-${randomIntFromInterval(
            1,
            5
        )}.jpg`,
        roles: [
            {
                role: "mod",
                associatedIds: [
                    "mongo generated id #1",
                    "mongo generated id #2",
                ],
            },
            { role: "user" },
        ],
        savedBooks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "user_tester",
        email: "user@upstudy.io",
        password: hashPassword("12345"),
        isVerified: false,
        profilePic: `../../assets/images/default-profile-pics/default-profile-pic-${randomIntFromInterval(
            1,
            5
        )}.jpg`,
        savedBooks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const subjectSeed = [
    {
        name: "Computer Science",
        description:
            "Computer science is the study of computers and computing as well as their theoretical and practical applications.",
        image: "./assets/images/subjects/open/computer-science.jpg",
        path: "computer-science",
        bgColor: "#0e458c",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Software Development",
        description:
            "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components.",
        image: "./assets/images/subjects/open/software-development.jpg",
        path: "software-development",
        bgColor: "#232427",
        createdBy: "ADMIN_SEED",
    },
    // {
    //     name: "Engineering",
    //     description:
    //         "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, and buildings.",
    //     image: "https://i.imgur.com/hqbFuLh.jpeg",
    //     bgColor: "#163C40",
    //     createdBy: "ADMIN_SEED",
    // },
    {
        name: "Information Technology",
        description:
            "Information technology (IT) is the use of computers to create, process, store, retrieve and exchange all kinds of electronic data[1] and information. IT is typically used within the context of business operations as opposed to personal or entertainment technologies.",
        image: "./assets/images/subjects/open/information-technology.jpg",
        path: "information-technology",
        bgColor: "#3a1dad",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Mathematics",
        description:
            "Mathematics includes the study of such topics as numbers (arithmetic and number theory), formulas and related structures (algebra), shapes and spaces in which they are contained (geometry), and quantities and their changes (calculus and analysis).",
        image: "./assets/images/subjects/open/mathematics.jpg",
        path: "mathematics",
        bgColor: "#f2353b",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Statistics",
        description:
            "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.",
        image: "./assets/images/subjects/open/statistics.jpg",
        path: "statistics",
        bgColor: "#9798c8",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Nursing",
        description:
            "Nursing is a profession within the health care sector focused on the care of individuals, families, and communities so they may attain, maintain, or recover optimal health and quality of life.",
        image: "./assets/images/subjects/open/nursing.jpg",
        path: "nursing",
        bgColor: "#e73838",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Finance",
        description:
            "Finance is a term for matters regarding the management, creation, and study of money and investments.",
        image: "./assets/images/subjects/open/finance.jpg",
        path: "finance",
        bgColor: "#49b2cd",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Accounting",
        description:
            "Accounting or accountancy is the measurement, processing, and communication of financial and non financial information about economic entities such as businesses and corporations.",
        image: "./assets/images/subjects/open/accounting.jpg",
        path: "accounting",
        bgColor: "#1b52dd",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Economics",
        description:
            "Economics is the social science that studies the production, distribution, and consumption of goods and services.",
        image: "./assets/images/subjects/open/economics.jpg",
        path: "economics",
        bgColor: "#eb8c51",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Physics",
        description:
            "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force.",
        image: "./assets/images/subjects/open/physics.jpg",
        path: "physics",
        bgColor: "#2fa55a",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Business Administration",
        description:
            "Business is the activity of making one's living or making money by producing or buying and selling products (such as goods and services).",
        image: "./assets/images/subjects/open/business-administration.jpg",
        path: "business-administration",
        bgColor: "#005b96",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Graphic Design",
        description:
            "Graphic design is the profession and academic discipline whose activity consists in projecting visual communications intended to transmit specific messages to social groups, with specific objectives.",
        image: "./assets/images/subjects/open/graphic-design.jpg",
        path: "graphic-design",
        bgColor: "#3529b2",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Marketing",
        description:
            "Marketing is the process of intentionally stimulating demand for and purchases of goods and services.",
        image: "./assets/images/subjects/open/marketing.jpg",
        path: "marketing",
        bgColor: "#0ff1ce",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "English",
        description:
            "English studies (usually called simply English) is an academic discipline taught in primary, secondary, and post-secondary education in English-speaking countries.",
        image: "./assets/images/subjects/open/english.jpg",
        path: "english",
        bgColor: "#ddb963",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Political Science",
        description:
            "Political science is the scientific study of politics. It is a social science dealing with systems of governance and power, and the analysis of political activities, political thought, political behavior, and associated constitutions and laws.",
        image: "./assets/images/subjects/open/political-science.jpg",
        path: "political-science",
        bgColor: "#b4bfd1",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "History",
        description: "History is the study of the past.",
        image: "./assets/images/subjects/open/history.jpg",
        path: "history",
        bgColor: "#d19b47",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Philosophy",
        description:
            "Philosophy is the study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language.",
        image: "./assets/images/subjects/open/philosophy.jpg",
        path: "philosophy",
        bgColor: "#ffba2d",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Spanish",
        description:
            "Spanish is a Romance language that evolved from colloquial spoken Latin in the Iberian Peninsula of Europe.",
        image: "./assets/images/subjects/open/spanish.jpg",
        path: "spanish",
        bgColor: "#febe2a",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Communications",
        description:
            "Communication studies or communication science is an academic discipline that deals with processes of human communication and behavior, patterns of communication in interpersonal relationships, social interactions and communication in different cultures.",
        image: "./assets/images/subjects/open/communications.jpg",
        path: "communications",
        bgColor: "#913886",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Chemistry",
        description:
            "Chemistry is the scientific study of the properties and behavior of matter.",
        image: "./assets/images/subjects/open/chemistry.jpg",
        path: "chemistry",
        bgColor: "#f3c442",
        // bgColor: "#f3c442",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Biology",
        description: "Biology is the scientific study of life.",
        image: "./assets/images/subjects/open/biology.jpg",
        path: "biology",
        bgColor: "#add143",
        createdBy: "ADMIN_SEED",
    },
    // {
    //     name: "Criminal Justice",
    //     description:
    //         "Criminal justice is the delivery of justice to those who have committed crimes.",
    //     image: "./assets/images/subjects/open/criminal-justice.jpg",
    //     bgColor: "#492d0c",
    //     createdBy: "ADMIN_SEED",
    // },
    {
        name: "Sociology",
        description:
            "Sociology is a social science that focuses on society, human social behaviour, patterns of social relationships, social interaction, and aspects of culture associated with everyday life.",
        image: "./assets/images/subjects/open/sociology.jpg",
        path: "sociology",
        bgColor: "#a6b991",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Electrical Engineering",
        description:
            "Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism.",
        image: "./assets/images/subjects/open/electrical-engineering.jpg",
        path: "electrical-engineering",
        bgColor: "#34c3c9",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Mechanical Engineering",
        description:
            "Mechanical engineering is an engineering branch that combines engineering physics and mathematics principles with materials science to design, analyze, manufacture, and maintain mechanical systems.",
        image: "./assets/images/subjects/open/mechanical-engineering.jpg",
        path: "mechanical-engineering",
        bgColor: "#757d8b",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Chemical Engineering",
        description:
            "Chemical engineering is a certain type of engineering which deals with the study of operation and design of chemical plants as well as methods of improving production.",
        image: "./assets/images/subjects/open/chemical-engineering.jpg",
        path: "chemical-engineering",
        bgColor: "#abb7c3",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Industrial Engineering",
        description:
            "Industrial engineering is an engineering profession that is concerned with the optimization of complex processes, systems, or organizations by developing, improving and implementing integrated systems of people, money, knowledge, information and equipment.",
        image: "./assets/images/subjects/open/industrial-engineering.jpg",
        path: "industrial-engineering",
        bgColor: "#0d5799",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Civil Engineering",
        description:
            "Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewage systems, pipelines, structural components of buildings, and railways.",
        image: "./assets/images/subjects/open/civil-engineering.jpg",
        path: "civil-engineering",
        bgColor: "#f1a443",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Computer Engineering",
        description:
            "Computer engineering is a branch of engineering that integrates several fields of computer science and electronic engineering required to develop computer hardware and software.",
        image: "./assets/images/subjects/open/computer-engineering.jpg",
        path: "computer-engineering",
        bgColor: "#13664f",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Biological Engineering",
        description:
            "Biological engineering or bioengineering is the application of principles of biology and the tools of engineering to create usable, tangible, economically-viable products.",
        image: "./assets/images/subjects/open/biological-engineering.jpg",
        path: "biological-engineering",
        bgColor: "#f78589",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Stock Market",
        description:
            "In finance, stock consists of all of the shares into which ownership of a corporation or company is divided.",
        image: "./assets/images/subjects/open/stock-market.jpg",
        path: "stock-market",
        bgColor: "#61d15d",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Cryptocurrency",
        description:
            "A cryptocurrency is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership.",
        image: "./assets/images/subjects/open/cryptocurrency.jpg",
        path: "cryptocurrency",
        bgColor: "#d3af2d",
        createdBy: "ADMIN_SEED",
    },
    {
        name: "Blockchain",
        description:
            "A blockchain is a growing list of records, called blocks, that are linked together using cryptography.",
        image: "./assets/images/subjects/open/blockchain.jpg",
        path: "blockchain",
        bgColor: "#364e66",
        createdBy: "ADMIN_SEED",
    },
];

const betaFeedbackSeed = [
    {
        username: "Example Username",
        email: "admin@upstudy.io",
        category: "Suggestion",
        message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        image: "https://via.placeholder.com/150/0000FF/808080?Text=Upstudy.io",
        archived: false,
    },
];

//first delete user data in database and then populate with seed data

setTimeout(function () {
    User.deleteMany({})
        .then(() => User.insertMany(userSeed))
        .then((data) => {
            console.log(
                data.length +
                    " " +
                    Object.keys({ userSeed })[0] +
                    " records inserted."
            );
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}, 3000);

setTimeout(function () {
    BetaFeedback.deleteMany({})
        .then(() => BetaFeedback.insertMany(betaFeedbackSeed))
        .then((data) => {
            console.log(
                data.length +
                    " " +
                    Object.keys({ betaFeedbackSeed })[0] +
                    " records inserted."
            );
            // process.exit(0);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}, 3000);

setTimeout(function () {
    Subject.deleteMany({})
        .then(() => Subject.insertMany(subjectSeed))
        .then((data) => {
            console.log(
                data.length +
                    " " +
                    Object.keys({ subjectSeed })[0] +
                    " records inserted."
            );
            process.exit(0);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}, 3000);

// const subjectSeed = [
//     {
//         name: "Computer Science",
//         description:
//             "Computer science is the study of computers and computing as well as their theoretical and practical applications.",
//         image: "./assets/images/subjects/dark/computer-science.svg",
//         bgColor: "#758262",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Software Development",
//         description:
//             "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components.",
//         image: "./assets/images/subjects/dark/software-development.svg",
//         bgColor: "#40163c",
//         createdBy: "ADMIN_SEED",
//     },
//     // {
//     //     name: "Engineering",
//     //     description:
//     //         "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, and buildings.",
//     //     image: "https://i.imgur.com/hqbFuLh.jpeg",
//     //     bgColor: "#163C40",
//     //     createdBy: "ADMIN_SEED",
//     // },
//     {
//         name: "Information Technology",
//         description:
//             "Information technology (IT) is the use of computers to create, process, store, retrieve and exchange all kinds of electronic data[1] and information. IT is typically used within the context of business operations as opposed to personal or entertainment technologies.",
//         image: "./assets/images/subjects/dark/information-Technology.svg",
//         bgColor: "#fbb640",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Mathematics",
//         description:
//             "Mathematics includes the study of such topics as numbers (arithmetic and number theory), formulas and related structures (algebra), shapes and spaces in which they are contained (geometry), and quantities and their changes (calculus and analysis).",
//         image: "./assets/images/subjects/dark/mathematics.svg",
//         bgColor: "#f2353b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Statistics",
//         description:
//             "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.",
//         image: "./assets/images/subjects/dark/statistics.svg",
//         bgColor: "#7caaa7",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Nursing",
//         description:
//             "Nursing is a profession within the health care sector focused on the care of individuals, families, and communities so they may attain, maintain, or recover optimal health and quality of life.",
//         image: "./assets/images/subjects/dark/nursing.svg",
//         bgColor: "#f2353b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Finance",
//         description:
//             "Finance is a term for matters regarding the management, creation, and study of money and investments.",
//         image: "./assets/images/subjects/dark/finance.svg",
//         bgColor: "#fbded5",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Accounting",
//         description:
//             "Accounting or accountancy is the measurement, processing, and communication of financial and non financial information about economic entities such as businesses and corporations.",
//         image: "./assets/images/subjects/dark/accounting.svg",
//         bgColor: "#40163c",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Economics",
//         description:
//             "Economics is the social science that studies the production, distribution, and consumption of goods and services.",
//         image: "./assets/images/subjects/dark/economics.svg",
//         bgColor: "#c7b8bd",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Physics",
//         description:
//             "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force.",
//         image: "./assets/images/subjects/dark/physics.svg",
//         bgColor: "#c7b8bd",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Business",
//         description:
//             "Business is the activity of making one's living or making money by producing or buying and selling products (such as goods and services).",
//         image: "./assets/images/subjects/dark/business-administration.svg",
//         bgColor: "#005b96",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Graphic Design",
//         description:
//             "Graphic design is the profession and academic discipline whose activity consists in projecting visual communications intended to transmit specific messages to social groups, with specific objectives.",
//         image: "./assets/images/subjects/dark/graphic-design.svg",
//         bgColor: "#9fb3c7",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Marketing",
//         description:
//             "Marketing is the process of intentionally stimulating demand for and purchases of goods and services.",
//         image: "./assets/images/subjects/dark/marketing.svg",
//         bgColor: "#0ff1ce",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "English",
//         description:
//             "English studies (usually called simply English) is an academic discipline taught in primary, secondary, and post-secondary education in English-speaking countries.",
//         image: "./assets/images/subjects/dark/english.svg",
//         bgColor: "#6f6282",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Political Science",
//         description:
//             "Political science is the scientific study of politics. It is a social science dealing with systems of governance and power, and the analysis of political activities, political thought, political behavior, and associated constitutions and laws.",
//         image: "./assets/images/subjects/dark/political-science.svg",
//         bgColor: "#6a6a77",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "History",
//         description: "History is the study of the past.",
//         image: "./assets/images/subjects/dark/history.svg",
//         bgColor: "#d8880b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Philosophy",
//         description:
//             "Philosophy is the study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language.",
//         image: "./assets/images/subjects/dark/philosophy.svg",
//         bgColor: "#003b4a",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Spanish",
//         description:
//             "Spanish is a Romance language that evolved from colloquial spoken Latin in the Iberian Peninsula of Europe.",
//         image: "./assets/images/subjects/dark/spanish.svg",
//         bgColor: "#6f6282",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Communications",
//         description:
//             "Communication studies or communication science is an academic discipline that deals with processes of human communication and behavior, patterns of communication in interpersonal relationships, social interactions and communication in different cultures.",
//         image: "./assets/images/subjects/dark/communications.svg",
//         bgColor: "#e4eeed",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Chemistry",
//         description:
//             "Chemistry is the scientific study of the properties and behavior of matter.",
//         image: "./assets/images/subjects/dark/chemistry.svg",
//         bgColor: "#f2353b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Biology",
//         description: "Biology is the scientific study of life.",
//         image: "./assets/images/subjects/dark/biology.svg",
//         bgColor: "#163c40",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Criminal Justice",
//         description:
//             "Criminal justice is the delivery of justice to those who have committed crimes.",
//         image: "./assets/images/subjects/dark/criminal-justice.svg",
//         bgColor: "#492d0c",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Sociology",
//         description:
//             "Sociology is a social science that focuses on society, human social behaviour, patterns of social relationships, social interaction, and aspects of culture associated with everyday life.",
//         image: "./assets/images/subjects/dark/sociology.svg",
//         bgColor: "#ffa386",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Electrical Engineering",
//         description:
//             "Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism.",
//         image: "./assets/images/subjects/dark/electrical-engineering.svg",
//         bgColor: "#d2dbcf",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Mechanical Engineering",
//         description:
//             "Mechanical engineering is an engineering branch that combines engineering physics and mathematics principles with materials science to design, analyze, manufacture, and maintain mechanical systems.",
//         image: "./assets/images/subjects/dark/mechanical-engineering.svg",
//         bgColor: "#d8880b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Chemical Engineering",
//         description:
//             "Chemical engineering is a certain type of engineering which deals with the study of operation and design of chemical plants as well as methods of improving production.",
//         image: "./assets/images/subjects/dark/chemical-engineering.svg",
//         bgColor: "#d2dbcf",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Industrial Engineering",
//         description:
//             "Industrial engineering is an engineering profession that is concerned with the optimization of complex processes, systems, or organizations by developing, improving and implementing integrated systems of people, money, knowledge, information and equipment.",
//         image: "./assets/images/subjects/dark/industrial-engineering.svg",
//         bgColor: "#008080",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Civil Engineering",
//         description:
//             "Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewage systems, pipelines, structural components of buildings, and railways.",
//         image: "./assets/images/subjects/dark/civil-engineering.svg",
//         bgColor: "#8f946a",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Computer Engineering",
//         description:
//             "Computer engineering is a branch of engineering that integrates several fields of computer science and electronic engineering required to develop computer hardware and software.",
//         image: "./assets/images/subjects/dark/computer-engineering.svg",
//         bgColor: "#163c40",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Biological Engineering",
//         description:
//             "Biological engineering or bioengineering is the application of principles of biology and the tools of engineering to create usable, tangible, economically-viable products.",
//         image: "./assets/images/subjects/dark/biological-engineering.svg",
//         bgColor: "#f78589",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Stocks",
//         description:
//             "In finance, stock consists of all of the shares into which ownership of a corporation or company is divided.",
//         image: "./assets/images/subjects/dark/stocks.svg",
//         bgColor: "#f2353b",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Cryptocurrency",
//         description:
//             "A cryptocurrency is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership.",
//         image: "./assets/images/subjects/dark/cryptocurrency.svg",
//         bgColor: "#008080",
//         createdBy: "ADMIN_SEED",
//     },
//     {
//         name: "Blockchain",
//         description:
//             "A blockchain is a growing list of records, called blocks, that are linked together using cryptography.",
//         image: "./assets/images/subjects/dark/blockchain.svg",
//         bgColor: "#492d0c",
//         createdBy: "ADMIN_SEED",
//     },
// ];
