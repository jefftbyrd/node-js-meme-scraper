import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeMemes() {
  try {
    const url = `https://memegen-link-examples-upleveled.netlify.app/`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const memeImages = [];
    const fileNames = [];

    $('#images div a').each((i, elem) => {
      const memeImage = $(elem).find('img').attr('src');
      let fileName = i++;

      if (memeImage && fileNames.length < 10) {
        axios
          .get(memeImage, { responseType: 'arraybuffer' })
          .then((response) => {
            if (fileName <= 8) {
              fs.writeFileSync(`memes/0${fileName + 1}.jpg`, response.data);
            } else {
              fs.writeFileSync(`memes/${fileName + 1}.jpg`, response.data);
            }
          });

        memeImages.push(memeImage);
        fileNames.push(fileName);
      }
    });

    return memeImages;
  } catch (error) {
    console.log(error);
  }
}

scrapeMemes();
