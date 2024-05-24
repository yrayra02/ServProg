function triangle(value1, type1, value2, type2) {
    // Перевірка некоректних значень
    if (value1 <= 0 || value2 <= 0) {
        console.log("Неправильні значення: сторони та кути повинні бути більшими за нуль.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = Math.atan(a / b) * (180 / Math.PI);
        beta = Math.atan(b / a) * (180 / Math.PI);
    } else if (type1 === "hypotenuse" && type2 === "leg" || type1 === "leg" && type2 === "hypotenuse") {
        c = type1 === "hypotenuse" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        if (a >= c) {
            console.log("Неправильні значення: катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = Math.asin(b / c) * (180 / Math.PI);
    } else if (type1 === "adjacent angle" && type2 === "leg" || type1 === "leg" && type2 === "adjacent angle") {
        alpha = type1 === "adjacent angle" ? value1 : value2;
        if (alpha >= 90 || alpha <= 0) {
            console.log("Неправильні значення: кут повинен бути між 0 і 90 градусів.");
            return "failed";
        }
        a = type1 === "leg" ? value1 : value2;
        c = a / Math.cos(alpha * Math.PI / 180);
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    } else if (type1 === "opposite angle" && type2 === "leg" || type1 === "leg" && type2 === "opposite angle") {
        beta = type1 === "opposite angle" ? value1 : value2;
        if (beta >= 90 || beta <= 0) {
            console.log("Неправильні значення: кут повинен бути між 0 і 90 градусів.");
            return "failed";
        }
        b = type1 === "leg" ? value1 : value2;
        c = b / Math.sin(beta * Math.PI / 180);
        a = Math.sqrt(c * c - b * b);
        alpha = 90 - beta;
    } else if (type1 === "angle" && type2 === "hypotenuse" || type1 === "hypotenuse" && type2 === "angle") {
        alpha = type1 === "angle" ? value1 : value2;
        c = type1 === "hypotenuse" ? value1 : value2;
        if (alpha >= 90 || alpha <= 0) {
            console.log("Неправильні значення: кут повинен бути між 0 і 90 градусів.");
            return "failed";
        }
        a = c * Math.sin(alpha * Math.PI / 180);
        b = c * Math.cos(alpha * Math.PI / 180);
        beta = 90 - alpha;
    } else {
        console.log("Неправильні типи елементів. Будь ласка, перевірте введені значення.");
        return "failed";
    }

    console.log(`a = ${a}, b = ${b}, c = ${c}, alpha = ${alpha}, beta = ${beta}`);
    return "success";
}

const args = process.argv.slice(2);
if (args.length !== 4) {
    console.log("Будь ласка, введіть рівно чотири аргументи.");
    process.exit(1);
}

const value1 = parseFloat(args[0]);
const type1 = args[1];
const value2 = parseFloat(args[2]);
const type2 = args[3];

triangle(value1, type1, value2, type2);
