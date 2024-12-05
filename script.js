const first = document.querySelector(".first");
const second = document.querySelector(".second");
const argument = document.querySelector(".argument");
const result = document.querySelector(".result");
const rez = document.querySelector(".rez");
const settings = document.querySelector(".settings");
const saveBtn = document.querySelector(".saveBtn");
const form = document.querySelector("form");
const inp = document.querySelector(".inp");
const btn_check = document.querySelector(".btn_check");
const inputs_form = document.querySelector(".inputs_form");
let answer;
let r;
let flag = false;

const start = { from: 2, to: 10, argument: ["+", "-", "*", "/"] };

const random = (x, y) => Math.floor(Math.random() * (y - x + 1)) + x;

const active = (arg, className) => {
    [first, second, argument, result][r].classList[arg](className);
};
const resultActive = (arg = "") => {
    [first, second, argument, result][r].innerHTML = arg;
};
const correctAnswer = (e) => {
    resultActive(e);
    setTimeout(() => {
        flag = false;
        active("remove", "active");
        varify();
        results();
        inp.value = "";
        rez.classList.add("hidden");
        inputs_form.classList.remove("hidden");
        inp.focus();
    }, 1000);
};

const wrongAnswer = (e) => {
    resultActive(e);
    active("add", "error");
    setTimeout(() => {
        flag = false;
        resultActive();
        active("remove", "error");
        results();
    }, 1000);
    rez.classList.remove("hidden");
    inputs_form.classList.add("hidden");
};

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

function varify() {
    const rez = getArgument();
    r = random(0, 3);
    answer = rez[r];
    rez[r] = "";
    first.textContent = rez[0];
    second.textContent = rez[1];
    argument.textContent = rez[2];
    result.textContent = rez[3];
    active("add", "active");
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

rez.addEventListener("mouseup", (e) => {
    if (flag) return;
    flag = true;
    if (e.target.textContent == answer) {
        correctAnswer(e.target.textContent);
    } else {
        wrongAnswer(e.target.textContent);
        count(false);
    }
});

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

//-------- форма ответа --------

const checkInput = () => {
    if (inp.value == answer) {
        correctAnswer(inp.value);
        count(true);
    } else {
        wrongAnswer(inp.value);
        count(false);
    }
    inp.focus();
};

inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkInput(e.target.value);
    }
});

btn_check.addEventListener("click", checkInput);

varify();
results();
