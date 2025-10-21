require('dotenv').config();
const elasticsearchService = require('../src/services/elasticsearch');

// Sample book data 
const sampleBooks = [
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Programming",
    published_date: "2008-05-08",
    description: "A comprehensive guide to the best practices and features of JavaScript programming language.",
    isbn: "978-0596517748",
    pages: 176,
    rating: 4.2
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Programming",
    published_date: "2008-08-01",
    description: "A guide to writing clean, readable, and maintainable code.",
    isbn: "978-0132350884",
    pages: 464,
    rating: 4.4
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma",
    category: "Programming",
    published_date: "1994-10-31",
    description: "The classic book on design patterns in software engineering.",
    isbn: "978-0201633610",
    pages: 395,
    rating: 4.3
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    published_date: "1999-10-20",
    description: "Your journey to mastery in software development.",
    isbn: "978-0201616224",
    pages: 352,
    rating: 4.5
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    published_date: "2009-07-31",
    description: "The comprehensive guide to algorithms and data structures.",
    isbn: "978-0262033848",
    pages: 1312,
    rating: 4.4
  },
  {
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson",
    category: "Computer Science",
    published_date: "1996-07-25",
    description: "A classic computer science textbook focusing on programming concepts.",
    isbn: "978-0262510875",
    pages: 657,
    rating: 4.6
  },
  {
    title: "The Art of Computer Programming, Volume 1",
    author: "Donald E. Knuth",
    category: "Computer Science",
    published_date: "1997-07-17",
    description: "The legendary multi-volume work on computer programming.",
    isbn: "978-0201896831",
    pages: 672,
    rating: 4.7
  },
  {
    title: "Code Complete",
    author: "Steve McConnell",
    category: "Programming",
    published_date: "2004-06-09",
    description: "A practical handbook of software construction techniques.",
    isbn: "978-0735619678",
    pages: 960,
    rating: 4.3
  },
  {
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    category: "Programming",
    published_date: "2018-11-19",
    description: "How to improve the design of existing code without changing its functionality.",
    isbn: "978-0134757599",
    pages: 448,
    rating: 4.4
  },
  {
    title: "Patterns of Enterprise Application Architecture",
    author: "Martin Fowler",
    category: "Programming",
    published_date: "2002-11-05",
    description: "Architectural patterns for enterprise application development.",
    isbn: "978-0321127426",
    pages: 560,
    rating: 4.2
  },
  {
    title: "Domain-Driven Design",
    author: "Eric Evans",
    category: "Software Architecture",
    published_date: "2003-08-20",
    description: "Tackling complexity in the heart of software development.",
    isbn: "978-0321125217",
    pages: 560,
    rating: 4.1
  },
  {
    title: "Building Microservices",
    author: "Sam Newman",
    category: "Software Architecture",
    published_date: "2015-02-02",
    description: "Designing fine-grained systems for scalable applications.",
    isbn: "978-1491950357",
    pages: 280,
    rating: 4.3
  },
  {
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    category: "Programming",
    published_date: "2014-03-24",
    description: "Deep dive into JavaScript's scope and closure mechanisms.",
    isbn: "978-1449335588",
    pages: 98,
    rating: 4.5
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Programming",
    published_date: "2018-12-04",
    description: "A modern introduction to programming with JavaScript.",
    isbn: "978-1593279509",
    pages: 472,
    rating: 4.4
  },
  {
    title: "Learning React",
    author: "Alex Banks",
    category: "Web Development",
    published_date: "2020-06-12",
    description: "Modern patterns for developing React applications.",
    isbn: "978-1492051718",
    pages: 310,
    rating: 4.2
  },
  {
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    category: "Web Development",
    published_date: "2020-07-29",
    description: "Design and implement production-grade Node.js applications.",
    isbn: "978-1839214110",
    pages: 660,
    rating: 4.3
  },
  {
    title: "Effective Java",
    author: "Joshua Bloch",
    category: "Programming",
    published_date: "2017-12-27",
    description: "Best practices for the Java platform.",
    isbn: "978-0134685991",
    pages: 416,
    rating: 4.6
  },
  {
    title: "Spring in Action",
    author: "Craig Walls",
    category: "Web Development",
    published_date: "2020-10-05",
    description: "Comprehensive guide to the Spring Framework.",
    isbn: "978-1617297571",
    pages: 520,
    rating: 4.1
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    published_date: "2019-05-03",
    description: "A hands-on, project-based introduction to programming with Python.",
    isbn: "978-1593279288",
    pages: 544,
    rating: 4.5
  },
  {
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    category: "Programming",
    published_date: "2019-11-12",
    description: "Practical programming for total beginners using Python.",
    isbn: "978-1593279929",
    pages: 592,
    rating: 4.4
  },
  {
    title: "Data Science from Scratch",
    author: "Joel Grus",
    category: "Data Science",
    published_date: "2019-05-10",
    description: "First principles approach to data science with Python.",
    isbn: "978-1492041139",
    pages: 406,
    rating: 4.2
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "Machine Learning",
    published_date: "2019-10-15",
    description: "Build intelligent systems with scikit-learn and TensorFlow.",
    isbn: "978-1492032649",
    pages: 856,
    rating: 4.6
  },
  {
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "Machine Learning",
    published_date: "2016-11-10",
    description: "Comprehensive introduction to deep learning techniques.",
    isbn: "978-0262035613",
    pages: 800,
    rating: 4.4
  },
  {
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie",
    category: "Data Science",
    published_date: "2016-12-12",
    description: "Data mining, inference, and prediction methods.",
    isbn: "978-0387848570",
    pages: 745,
    rating: 4.5
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    published_date: "2019-02-15",
    description: "Comprehensive introduction to database systems.",
    isbn: "978-0078022159",
    pages: 1376,
    rating: 4.2
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Database",
    published_date: "2017-03-16",
    description: "The big ideas behind reliable, scalable, and maintainable systems.",
    isbn: "978-1449373320",
    pages: 616,
    rating: 4.7
  },
  {
    title: "MongoDB: The Definitive Guide",
    author: "Shannon Bradshaw",
    category: "Database",
    published_date: "2019-12-09",
    description: "Powerful and scalable data storage with MongoDB.",
    isbn: "978-1491954461",
    pages: 514,
    rating: 4.1
  },
  {
    title: "Redis in Action",
    author: "Josiah L. Carlson",
    category: "Database",
    published_date: "2013-06-16",
    description: "Using Redis for caching, messaging, and more.",
    isbn: "978-1617290855",
    pages: 320,
    rating: 4.3
  },
  {
    title: "Learning Elasticsearch",
    author: "Abhishek Andhavarapu",
    category: "Search Technology",
    published_date: "2017-02-28",
    description: "Index, search, and analyze your data effectively with Elasticsearch.",
    isbn: "978-1787128453",
    pages: 404,
    rating: 4.0
  },
  {
    title: "Elasticsearch: The Definitive Guide",
    author: "Clinton Gormley",
    category: "Search Technology",
    published_date: "2015-02-07",
    description: "A distributed real-time search and analytics engine.",
    isbn: "978-1449358549",
    pages: 724,
    rating: 4.2
  },
  {
    title: "High Performance MySQL",
    author: "Baron Schwartz",
    category: "Database",
    published_date: "2012-03-15",
    description: "Optimization, backups, and replication for MySQL.",
    isbn: "978-1449314286",
    pages: 826,
    rating: 4.4
  },
  {
    title: "PostgreSQL: Up and Running",
    author: "Regina Obe",
    category: "Database",
    published_date: "2017-01-05",
    description: "A practical guide to the advanced open source database.",
    isbn: "978-1491963418",
    pages: 288,
    rating: 4.2
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    category: "Software Architecture",
    published_date: "2020-06-04",
    description: "An insider's guide to system design interviews.",
    isbn: "978-1736049112",
    pages: 322,
    rating: 4.5
  },
  {
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    category: "Computer Science",
    published_date: "2016-05-12",
    description: "An illustrated guide for programmers and other curious people.",
    isbn: "978-1617292231",
    pages: 256,
    rating: 4.4
  },
  {
    title: "The Algorithm Design Manual",
    author: "Steven S Skiena",
    category: "Computer Science",
    published_date: "2020-05-05",
    description: "Essential techniques for algorithmic problem solving.",
    isbn: "978-3030542559",
    pages: 800,
    rating: 4.3
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "Programming",
    published_date: "2015-07-01",
    description: "189 programming questions and solutions for technical interviews.",
    isbn: "978-0984782857",
    pages: 687,
    rating: 4.2
  },
  {
    title: "Elements of Programming Interviews",
    author: "Adnan Aziz",
    category: "Programming",
    published_date: "2017-10-11",
    description: "The insiders' guide to coding interviews.",
    isbn: "978-1537713946",
    pages: 527,
    rating: 4.1
  },
  {
    title: "Programming Pearls",
    author: "Jon Bentley",
    category: "Programming",
    published_date: "1999-10-07",
    description: "Creative problem solving through programming techniques.",
    isbn: "978-0201657883",
    pages: 256,
    rating: 4.4
  },
  {
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    category: "Software Engineering",
    published_date: "1995-08-02",
    description: "Essays on software engineering and project management.",
    isbn: "978-0201835953",
    pages: 336,
    rating: 4.3
  },
  {
    title: "Peopleware",
    author: "Tom DeMarco",
    category: "Software Engineering",
    published_date: "2013-07-30",
    description: "Productive projects and teams in software development.",
    isbn: "978-0321934116",
    pages: 272,
    rating: 4.2
  }
];

async function seedData() {
  try {
    await elasticsearchService.bulkIndex(sampleBooks);
  } catch (error) {
    console.error('Error', error.message);
    process.exit(1);
  }
}

seedData();