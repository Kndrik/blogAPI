const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const User = require("./models/user");
const Comment = require("./models/comment");
const Article = require("./models/article");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const users = [];
const articles = [];
const comments = [];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createArticles();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(first_name, last_name, email, password) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });
  users.push(user);
  await user.save();
  console.log(`Added user ${first_name}`);
}

async function articleCreate(author, title, content) {
  const article = new Article({
    author: author,
    title: title,
    content: content,
  });
  articles.push(article);
  await article.save();
  console.log(`Added article ${title}`);
}

async function commentCreate(author, content, article) {
  const comment = new Comment({
    content: content,
    author: author,
    article: article,
  });
  comments.push(comment);
  await comment.save();
  console.log(`Added comment ${content}`);
}

async function createUsers() {
  console.log("Adding users...");
  await Promise.all([
    userCreate("mark", "spencer", "markspencer@gmail.com", "12355"),
    userCreate("Paul", "Harvard", "paul.harvey@gmail.com", "ezfze"),
  ]);
}

async function createArticles() {
  console.log("Adding articles...");
  await Promise.all([
    articleCreate(
      users[0],
      "The life of Monkeys",
      "Monkeys live and die just like any other living creature on earth."
    ),
    articleCreate(
      users[1],
      "Apple pie recipee",
      "Put apple on top of the dough and cook it."
    ),
    articleCreate(
      users[0],
      "Story of my life",
      "Nothing special really. Just hangin' around."
    ),
  ]);
}

async function createComments() {
  console.log("Adding comments...");
  await Promise.all([
    commentCreate("knd", "That was very interesting", articles[0]),
    commentCreate("jybay", "Who cares", articles[0]),
    commentCreate("Blast", "But why though", articles[2]),
  ]);
}
