import { LivroWithAutorDto } from "@/app/shared";
import puppeteer, { HTTPResponse, Page } from "puppeteer";

const shouldLog = false;
const log = (...strs: unknown[]) => {
  shouldLog && console.log(...strs);
};

async function scrapeLivroInfo(titleToSearch: string) {
  log("launching");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  log("creating new page");
  const page = await browser.newPage();
  // await page.setDefaultTimeout(120 * 1000);
  // await page.setDefaultNavigationTimeout(120 * 1000);

  log("setting viewport");
  await page.setViewport({ width: 1080, height: 1024 });

  log("navigating to Amazon search page");
  // &rh=n%3A6740748011 is the id of the "Livros" category on Amazon Brazil
  const r = await gotoWithRetries(
    page,
    `https://www.amazon.com.br/s?k=${titleToSearch}&rh=n%3A6740748011`
  );
  log("response status: ", r?.status());

  log("waiting for first result link to load");
  const hrefLocator = await page
    .locator('div[role="listitem"] .puisg-row a:has(h2)')
    .waitHandle();
  const livroUrl = await hrefLocator?.evaluate((el) => el.href);
  log("Livro URL:", livroUrl);

  log("navigating to book page");
  const response = await gotoWithRetries(page, livroUrl);
  log("response status: ", response?.status());

  log("waiting for handle for titulo locator");
  const tituloLocator = await page.locator("#productTitle").waitHandle();
  const titulo =
    (await tituloLocator?.evaluate((el) => el.textContent?.trim())) ?? "";
  log("Titulo:", titulo);

  const autoresArr = [];
  const autorElements = Array.from(await page.$$(".author"));
  for (const autorElement of autorElements) {
    const contribution = await autorElement.evaluate((node) =>
      node.querySelector(".contribution")?.textContent?.trim()
    );

    if (/\(Autor\),?/.test(contribution ?? "")) {
      const autorName = await autorElement.evaluate((node) =>
        node.querySelector("a")?.textContent?.trim()
      );
      autoresArr.push(autorName);
    }
  }
  const autoresStr = autoresArr.join("; ");
  log("Autores:", autoresStr);

  const anoPublicacaoLocator = await page
    .locator("#productSubtitle")
    .waitHandle();
  const anoPublicacao = await anoPublicacaoLocator?.evaluate(
    (el) => parseInt(el.textContent?.trim().split(" ").at(-1) ?? "0") ?? ""
  );
  log("Ano de Publicação:", anoPublicacao);

  // getting the second-level category because it's the most broad category
  // (`nth-of-type(3)`) because the second item is a divider icon)
  const generoLocator = await page
    .locator("#wayfinding-breadcrumbs_feature_div li:nth-of-type(3)")
    .waitHandle();
  const genero = (await generoLocator?.evaluate((el) => el.textContent)) ?? "";
  log("Gênero:", genero);

  await browser.close();

  const livroInfo: LivroWithAutorDto = {
    titulo,
    autor: { nome: autoresStr },
    anoPublicacao,
    genero,
  } as unknown as LivroWithAutorDto;

  log("LivroInfo:", livroInfo);
  return livroInfo;
}

async function gotoWithRetries(
  page: Page,
  url: string,
  retryCount: number = 5
) {
  log("gotoWithRetries retryCount:", 5 - retryCount + 1);
  try {
    const response = await page.goto(url);
    if (response?.status() !== 200) {
      throw new Error(`Failed to navigate to ${url}`);
    }
    return response;
  } catch (error) {
    if (retryCount <= 0) {
      throw error;
    }
    return await gotoWithRetries(page, url, retryCount - 1);
  }
}

export default scrapeLivroInfo;
