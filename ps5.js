import puppeteer from "puppeteer"; //puppeteer library
import { timeout } from "puppeteer";

const psFive = async () => {
    try {
        async function getBroswer(puppeteer) { //puppeteer only refers to the module that is imported. imoprts all of the built-in functions
            const browser = await puppeteer.launch({
                headless: false,
                args: ['--start-maximized'], // max window
                defaultViewport: null
            });
            const page = await browser.newPage();
            const url = "https://www.walmart.com/search?q=ps5%20console&typeahead=ps5";
            // const view = await page.setViewport({width: 1080, height: 1024});


            return { browser, page, url }; //must return the methods so they will be stored when calling the function. will send these obejects to the getBroswers invokation.
        }


        /*
        Waiting for getBrowser.
        passing in multiple objects to getBrowser
        (//destructing//) <= learn this

        1. Will run the function getBrowser
        2. Will return the objects
        */
        const { browser, page, url } = await getBroswer(puppeteer); //await the page. passing in multiple objects. (destructing) The object values are assinged to the names in that order.
        await launchPage(page, url); //wait the function
        await getElement(page);


        async function launchPage(page, url) { //passing in page and url so it will go to the url using the page object with the .goto method.
            try {
                const launch = await page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 6000,
                });
                console.log(`Page loaded successfully`);

            } catch (e) {
                console.log(`there is an error with the launch object: "${e.stack}"`);

            }
        }

        async function getElement(page) { //learn element handling
            try {
                // let's just call them tweetHandle 
                const productsHandles = await page.$$('[class*="flex"][class*="w-100"]', {timeout: 5000});
                    
                // loop thru all handles
                for (const productsHandle of productsHandles) {
                    const title = await page.evaluate((productElement) => {
                        if (productElement && productElement.querySelector) {
                            const titleElement = productElement.querySelector("span > span");
                            return titleElement ? titleElement.textContent.trim() : null;
                        }
                        return null; // Return null if el is not a valid element

                       



                        // pass the single handle below
                        // const title = await page.evaluate(el => el.querySelector("span > span").textContent, productsHandles)

                        // do whatever you want with the data
                        // if (title) {
                        // console.log(title);
                        // }
                    }, productsHandle);
                }

            } catch (e) {
                console.log(`the problem is "${e}"`);
                
            }
        }
        







        // await browser.close();









    } catch (e) {
        console.log(`There is an error with the browser: "${e.stack}"`);

    }

    }
psFive();