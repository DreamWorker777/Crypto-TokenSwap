import {gql, GraphQLClient} from 'graphql-request'
/**
 * Contains the logic for hitting the bitquery graphql API and get currency info
 * @param baseCurrency base Currency
 * @param quoteCurrency quote Currency
 * @param startDate sate since you require the quotes
 */
 export default async function getCurrencyQuotesData(
    baseCurrency?: string, quoteCurrency?: string, startDate?: string
) {

    const endpoint = 'https://graphql.bitquery.io';
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          // TODO:  MAKE .ENV
          'X-API-KEY': 'BQYR2bsviXVaT3wO9HHX8NgsN8GZsMNG',
        },
      })
    
      const query = gql`
      {
        ethereum(network: ethereum) {
          dexTrades(
            options: { limit: 24, desc: "timeInterval.hour" }
            date: { since: "2021-04-20" }
            baseCurrency: { is: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE" }
            quoteCurrency: { is: "0xdac17f958d2ee523a2206206994597c13d831ec7" }
          ) {
            timeInterval {
              hour(count: 1)
            }
            baseCurrency {
              symbol
              address
            }
            baseAmount
            quoteCurrency {
              symbol
              address
            }
            quoteAmount
            trades: count
            quotePrice
            maximum_price: quotePrice(calculate: maximum)
            minimum_price: quotePrice(calculate: minimum)
            open_price: minimum(of: block, get: quote_price)
            close_price: maximum(of: block, get: quote_price)
          }
        }
      }
    `

    // TODO: Handle Error cases here
    const currencyQuotesData = await graphQLClient.request(query)

    return currencyQuotesData;
    
}
