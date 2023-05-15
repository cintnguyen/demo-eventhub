require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')

// import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-vMpv1b4Blv47JzS7bQJlSnf5",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateList = async ({event}) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Create a to do list for a college graduation party"}],
      });
      let response = completion.data.choices[0].message
      const items = response.content.split(/\d+\. /);
    items.shift(); // Remove empty first item
    const modifiedItems = items.map(item => item.replace(/\n/g, ''));
    console.log(modifiedItems)
}

module.exports = { generateList }