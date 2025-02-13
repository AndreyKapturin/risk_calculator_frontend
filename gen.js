import { readFile, writeFile  } from "node:fs/promises";

let text = await readFile('template.js', { encoding: 'utf8' })

const str = '0!1!3!0!2!4!4!0!0!3!5!7!8!10!40!0!20!0!10!0!-15!0!0!-3!-5!5!0!2!0!5!0!10!0!15!0!6!0!2!0!-10!0!3!0!3!0!5!0!-5!0!20!0!30!0!20!0!5!0!10!0!10!0!10!0!-10!0!-10!0';
const values = str.split('!');

values.forEach((v, i) => {
  let regExp = new RegExp(`\\{\\{${i + 1}\\}\\}`);
  text = text.replace(regExp, v)
})

let filename = 'Объекты социальной защиты';

await writeFile(filename + '.js', text);
