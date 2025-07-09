import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Set specific commit range here
const startDate = moment("2025-02-01", "YYYY-MM-DD");
const endDate = moment("2025-03-31", "YYYY-MM-DD");
const totalDays = endDate.diff(startDate, 'days');

const getRandomDateInRange = () => {
  const randomOffset = random.int(0, totalDays);
  return startDate.clone().add(randomOffset, 'days').format();
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const date = getRandomDateInRange();
  const data = { date };

  console.log("Committing on:", date);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(200); // Change number of commits here
