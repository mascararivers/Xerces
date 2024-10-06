import axios from "axios";
import dotenv from 'dotenv'
import { bot } from "..";
dotenv.config()

function convertToSnakeCase(str) {
    return str.toLowerCase().replace(/\s+/g, '_');
}

async function fetchPage(page) {
    const response = await axios.get('https://api.hypixel.net/v2/skyblock/auctions', {
      params: {
        key: process.env.API_KEY,
        page: page
      }
    });
    return response.data;
}
async function getLowestBinPrice(item_name) {
    console.log(`${item_name} converted to ${convertToSnakeCase(item_name)}`)
    const snaked = convertToSnakeCase(item_name)
    const request = await axios.get('https://raw.githubusercontent.com/SkyHelperBot/Prices/main/prices.json')
    return request.data[snaked]
}


setInterval(() => {
    let response = axios.get('https://api.hypixel.net/v2/skyblock/auctions', {
        params: {
            key: process.env.API_KEY
        }
    }).then(response => {
        const lbin = getLowestBinPrice(response.data.auctions[0].item_name)
        console.log(`LBIN OF THIS ITEM: ${lbin}`)

        // log most recent auction
        /*
        console.log(`NAME: ${response.data.auctions[0].item_name};
                    IS-BIN: ${response.data.auctions[0].bin};
                    PRICE: ${response.data.auctions[0].starting_bid};
                    LOWEST-BIN: `)
        */

    })
}, 1000)

