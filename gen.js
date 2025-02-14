import { readFile, writeFile  } from "node:fs/promises";

let template = await readFile('template.js', { encoding: 'utf8' })

const str = '';


function generateObject(template, objectString) {
  const [header, values] = objectString.split('!!');
  const [name, indicator] = header.split('!');
  const valuesArray = values.split('!');

  template = template.replace(/\{\{name\}\}/, `'${name}'`);
  template = template.replace(/\{\{indicator\}\}/, indicator.replace(',', '.'));

  valuesArray.forEach((v, i) => {
    let regExp = new RegExp(`\\{\\{${i + 1}\\}\\}`);
    let value = v === '-' ? 0 : v;
    template = template.replace(regExp, value)
  })

  return template;
}

function generateAllObjects(template, allObjectsString) {
  const objectsStringsArray = allObjectsString.split('!!!');
  const result = objectsStringsArray.map(o => generateObject(template, o));
  return result.join(',\n');
}

let all = generateAllObjects(template, str);

await writeFile('res' + '.js', all);

console.log('success')