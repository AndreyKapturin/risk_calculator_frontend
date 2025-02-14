let template = `'Таблица 3'!Cn;"!";`;

let result = '';

for (let i = 2; i <= 35; i++) {
  result += template.replace('n', i);
}

console.log(result)