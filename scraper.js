import puppeteer from "puppeteer";

let browser;

const headless = true;

const scraperTemplate = async (
  keyword,
  baseUrl,
  baseSelector,
  priceSelector,
  imgSelector,
  titleSelector
) => {
  try {
    browser = await puppeteer.launch({ headless, devtools: true });

    const page = await browser.newPage();

    const url = `${baseUrl}${keyword}`;

    await page.goto(url);

    await page.waitForSelector(baseSelector);

    const items = await page.evaluate(
      (priceSelector, imgSelector, titleSelector) => {
        const productPrice = document.querySelector(priceSelector);
        const productImg = document.querySelector(imgSelector);
        const productTitle = document.querySelector(titleSelector);
        return {
          price: productPrice
            ? productPrice.textContent.replace("\n", "").trim()
            : null,
          img: productImg.src ? productImg.src : null,
          title: productTitle.textContent ? productTitle.textContent : null,
          url: productTitle.href ? productTitle.href : null,
        };
      },
      priceSelector,
      imgSelector,
      titleSelector
    );

    return { ...items, error: false };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
};

export const scrapeTTN = async (keyword) =>
  await scraperTemplate(
    keyword,
    "https://www.ttn.by/search?SORTBY=RELEVANSE&q=",
    ".products__in",
    ".prices__val",
    ".products__img",
    ".products-title"
  );

export const scrape5elem = async (keyword) =>
  await scraperTemplate(
    keyword,
    "https://5element.by/search/?tab=product&q=",
    ".c-price",
    ".c-price",
    ".carousel-card-img > img",
    ".c-text"
  );

export const scrapeAllo = async (keyword) =>
  await scraperTemplate(
    keyword,
    "https://alloplus.by/catalog/?q=",
    ".catalog_item",
    ".price_value",
    ".thumb > img",
    ".dark_link"
  );
