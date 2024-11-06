import puppeteer, { ElementHandle } from "puppeteer";


const launchAmazon = async () => {  // defined before it is called

    try {
        

        //Launch the browser and open a new blank page
        //pass these variables into functions so they can be used
        const browser = await puppeteer.launch({ 
            headless: false }); //need to set the launch to headless inorder to see the browser
        const page = await browser.newPage();




        // not using a timeout on the page.goto could cause an error becuase it might load too slow
        const url = (`https://www.amazon.com/`);
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 6000
        });


        //set size of page
        const viewPort = await page.setViewport({ width: 1080, height: 1024 });

        const cap = await page.$('#captchacharacters', { timeout: 5000 }); //necessary for the element to load. add timeout everytime you need an element





        clicked(cap); //pass cap into the function. function will not recieve the element
        sendKeys(cap);//pass cap into the function. function will not recieve the element
        pic(page);//pass page into the function. function will not receive 



    } catch (error) {
        console.log(`The error was ${error}`);
    }


    /*
    if you define functions inside of the main scope. know that arrow functions will have to be defined before the main function because of hoisting.
    Write them as regular functions because they will be easier to call inside of the main function.
    functions are hoisted to the top of their scope. meaning they are useable throught the main function before the point of definition. "They can be called before its reached"
    */

    async function clicked(cap) {//pass cap from the main function. Define them as regular functions do not use arrows. setting them to const will cause a hoisting issue.
        // await cap.click(); //using await to pause for the action to be completed
        //it's simply a pause before it starts typing before the click is processed


        // const clickCap = await page.click(); incorrect way of doing it. add the .click method on the end of the cap declaration

        // if (clickCap) {
        //     console.log(`clicked`);

        // } else {
        //     console.log(`not clicked`);

        // }

        if (cap) { //checking if correct cap or the cap loaded
            try {
                await cap.click();
                console.log(`clicked`);
            } catch (error) {
                console.log("not clicked");
            }
        } else {
            console.log(`Capcha element not found for clicking`);
        }
    };


    async function sendKeys(cap) {//pass cap from the main function. Define them as regular functions do not use arrows. setting them to const will cause a hoisting issue.
        try {
            if (cap) {
                await cap.type('jkjsdd');
            } else {
                console.log(`key could not send`);

            }
        } catch (error) {
            console.log(`"${error}" is the issue.`);

        }



    }

    async function pic(page) { //page needs to be passed in so it can be accessed
        try {
            await page.screenshot({ path: 'pic1.png' });
            console.log(`pic taken`);

        } catch (error) {
            if (error == "TypeError: Cannot read properties of undefined (reading 'screenshot')")
                console.log(`add page into the pic invokation`);
        }
    }
}

launchAmazon(); //main function should be the only one called outside of scope

