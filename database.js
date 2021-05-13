const MongoClient = require("mongodb").MongoClient;
const { getDay } = require("./utils/day");

const uri = process.env.collectionString;
let collection = null;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err, data) => {
  collection = client.db("91algo").collection("my-solution");
});

const findSolution = function (name) {
  return new Promise((resolve, reject) => {
    collection.find({ name }, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const dailyCheck = async function (name, data, callback) {
  try {
    const solution = await findSolution();
    console.log(solution);
    solution[getDay() - 1] = data;
    collection.updateOne({ name }, { $set: solution });
    return data;
  } catch (_) {
    const solution = Array(91);
    solution[getDay() - 1] = data;
    return new Promise((resolve, reject) => {
      collection.insert({ name: solution }, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = {
  dailyCheck,
};
