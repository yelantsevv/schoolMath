const first = document.querySelector(".first");
const second = document.querySelector(".second");
const argument = document.querySelector(".argument");
const result = document.querySelector(".result");
const rez = document.querySelector(".rez");

const start = { from: 2, to: 10, argument: ["+", "-", "*", "/"] };

const random = (x, y) => Math.floor(Math.random() * (y - x + 1)) + x;

const arg = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

function getArgument() {
  const x = random(start.from, start.to);
  const y = random(start.from, start.to);
  const z = start.argument[random(0, start.argument.length - 1)];
  const rez = arg[z](x, y);
  if (parseInt(rez) !== rez || rez < 0) return getArgument();
  if (z === "*" && Math.random() - 0.5 > 0 && start.argument.includes("/"))
    return [rez, y, "/", x];
  return [x, y, z, rez];
}

let answer;
let r;
function varify() {
  const rez = getArgument();
  r = random(0, 3);
  answer = rez[r];
  rez[r] = "";
  first.textContent = rez[0];
  second.textContent = rez[1];
  argument.textContent = rez[2];
  result.textContent = rez[3];
  [first, second, argument, result][r].classList.add("active");
}

function results() {
  let r = [answer];
  while (r.length < 4) {
    if (typeof answer === "string") {
      r = ["+", "-", "*", "/"];
      break;
    }
    const randomNumber = random(answer - 10, answer + 10);
    if (r.includes(randomNumber)) continue;
    r.push(randomNumber);
  }
  r.sort(() => Math.random() - 0.5);
  rez.innerHTML = ` 
            <p>${r[0]}</p>
            <p>${r[1]}</p>
            <p>${r[2]}</p>
            <p>${r[3]}</p>
                `;
}

let flag = false;
rez.addEventListener("mouseup", (e) => {
  if (flag) return;
  flag = true;
  if (e.target.textContent == answer) {
    [first, second, argument, result][r].innerHTML = e.target.textContent;
    setTimeout(() => {
      flag = false;
      [first, second, argument, result][r].classList.remove("active");
      varify();
      results();
      count(true);
    }, 1000);
  } else {
    [first, second, argument, result][r].innerHTML = e.target.textContent;
    [first, second, argument, result][r].classList.add("error");
    setTimeout(() => {
      flag = false;
      [first, second, argument, result][r].innerHTML = "";
      [first, second, argument, result][r].classList.remove("error");
      results();
      count(false);
    }, 1000);
  }
});
varify();
results();
// - - - - - - - - - - - -

const settings = document.querySelector(".settings");
const saveBtn = document.querySelector(".saveBtn");
const form = document.querySelector("form");

settings.addEventListener("click", (event) => {
  event.preventDefault();
  form.classList.toggle("hidden");
});
saveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const [a, b, c, d, e, f] = [...event.target.parentElement];
  start.from = +a.value;
  start.to = +b.value;
  start.argument = [];
  if (c.checked) start.argument.push("+");
  if (d.checked) start.argument.push("-");
  if (e.checked) start.argument.push("*");
  if (f.checked) start.argument.push("/");

  form.classList.toggle("hidden");
});

const counter = document.querySelector(".count");
function count(args = true) {
  const counts = counter.textContent;
  if (args) {
    localStorage.setItem("counter", +counts + 1);
  }
  if (!args) {
    localStorage.setItem("counter", +counts - 1);
  }
  counter.textContent = localStorage.getItem("counter");
}
counter.textContent = localStorage.getItem("counter");

counter.addEventListener("click", () => {
  localStorage.setItem("counter", 0);
  counter.textContent = localStorage.getItem("counter");
});
