const first = document.querySelector(".first");
const second = document.querySelector(".second");
const argument = document.querySelector(".argument");
const result = document.querySelector(".result");
const rez = document.querySelector(".rez");

const random = (x, y) => Math.floor(Math.random() * (y - x + 1)) + x;

const arg = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

function getArgument() {
  const x = random(2, 10);
  const y = random(2, 10);
  const z = ["+", "-", "*", "/", "*"][random(0, 4)];
  const rez = arg[z](x, y);
  if (parseInt(rez) !== rez || rez < 0) return getArgument();
  if (z === "*" && Math.random() - 0.5 > 0) return [rez, y, "/", x];
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
    const randomNumber = random(1, answer + 10);
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
rez.addEventListener("click", (e) => {
  if (flag) return;
  flag = true;
  if (e.target.textContent == answer) {
    [first, second, argument, result][r].innerHTML = e.target.textContent;
    setTimeout(() => {
      flag = false;
      [first, second, argument, result][r].classList.remove("active");
      varify();
      results();
    }, 2000);
  } else {
    [first, second, argument, result][r].innerHTML = e.target.textContent;
    [first, second, argument, result][r].classList.add("error");
    setTimeout(() => {
      flag = false;
      [first, second, argument, result][r].innerHTML = "";
      [first, second, argument, result][r].classList.remove("error");
      results();
    }, 2000);
  }
});
varify();

results();
