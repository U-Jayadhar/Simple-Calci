let input = document.getElementById("input");
let espress = "";
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let equal = document.getElementById("equal");

const numbBtn = document.querySelectorAll("#numb");

numbBtn.forEach((numb) => {
  numb.addEventListener("click", () => {
    const value = numb.textContent;

    if (value === "%") {
      const regPerc = /(\d+(\.\d+)?)([\+\-\*\/])?(\d+(\.\d+)?)$/;
      const matchy = espress.match(regPerc);
      if (matchy) {
        const firstNumber = parseFloat(matchy[1]);
        const lastNumber = parseFloat(matchy[4]);
        const operator = matchy[3] || "";
        const percentage = lastNumber / 100;
        if (operator) {
          espress = espress.replace(
            regPerc,
            `${firstNumber}${operator}${firstNumber * percentage}`
          );
        } else {
          espress = espress.replace(
            /(\d+(\.\d+)?)([\+\-\*\/])?(\d+(\.\d+)?)$/,
            parseFloat(matchy[0]) / 100
          );
        }

        input.textContent = espress;
      }
    } else if (value === "^") {
      espress += "**";
      input.textContent += "^";
    } else {
      espress += value;
      input.textContent += value;
    }
  });
});

back.addEventListener("click", function () {
  if (input.textContent === "Error" || input.textContent === "Infinity") {
    espress = "";
  } else {
    espress = String(espress).slice(0, -1);
  }
  input.textContent = espress;
});
clear.addEventListener("click", function () {
  espress = "";
  input.textContent = "";
});

equal.addEventListener("click", function () {
  try {
    espress = eval(espress);
    input.textContent = espress;
  } catch (error) {
    input.textContent = "Error";
  }
});
