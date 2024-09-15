import fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
}

async function scrapeMemes() {
  try {
    const url = `https://memegen-link-examples-upleveled.netlify.app/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('#images div a').each(async (i, elem) => {
      const memeImage = $(elem).find('img').attr('src');
      const fileName = i++;

      await axios
        .get(memeImage, { responseType: 'arraybuffer' })
        .then((response) => {
          if (fileName <= 8) {
            fs.writeFileSync(`memes/0${fileName + 1}.jpg`, response.data);
          } else if (fileName === 9) {
            fs.writeFileSync(`memes/${fileName + 1}.jpg`, response.data);
          } else {
          }
        });
    });
  } catch (error) {
    console.log(error);
  }
}

await scrapeMemes();
