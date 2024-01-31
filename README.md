# EventHub - Demo
A full-stack app for all your event needs! Seamlessly combines AI-generated to-do lists, text reminders, a centralized platform for shared images, and integration with Google Maps API for directions, revolutionizing event planning and organization. Create an account, log in and plan your next event!

Check it out and let me know your thoughts! - https://theeventhub.onrender.com/
To demo a fully populated site, feel free to use these login credentials:
- Email: cindy@gmail.com
- Password: testingone

## Tech Used:
- Javascript, Node.js, Express, Multer, Passport, HTML / EJS, CSS, MongoDB
- APIs: OpenAI for ChatGPT curated to-do-list for any task, Twilio for SMS text reminders/ invitations, and Google Maps for directions
- Model View Controller Framework (MVC) 

![EventHub](public/imgs/readme.png)

### Things I'm proud of:
- Integrating openAI API to parse through its resulting data and split it into bullet points that are then placed into my database (MongoDB) so that the user can interact with it as an actual to do list that they can check off, delete and add tasks too!
- Incorportating Twilio's API to not only send text reminders, but that it's dependent on a curated guest list that the user creates. This was thanks to me structuring my model databases out in MVC!
- Learning MVC and switching my architecture the same week!
- Being able to seperate my logic so that the app functions differently depending on who views the site. There is a view for both the host of the party, and a guest of the party! (For example when the host accesses the photo board, they have the ability to delete images while guests are only able to post)

### Next steps:
- Currently the user has the ability to text their guest the link to the photoboard page of the app. This is a centralized area where guests can populate the board with images from the event with a caption. I would like to incorporate a security procation where user's that send out the link will also need to give a special code in order to access this specific page.

## On your own machine: 
Note - This app requires MongoDB, Twilio, Cloudinary, OpenAI and Google Maps accounts, which can be configured through the following enviroment variables: 

PORT\
DB_STRING\
CLOUD_NAME\
API_KEY\
API_SECRET\
OPENAI_API_KEY\
TWILIO_ACCOUNT_SID\
TWILIO_AUTH_TOKEN\
MY_PHONE_NUMBER\
GOOGLE_KEY

### Installation

1. Clone repo
2. run `npm install`

---

### Usage

1. run `node server.js`
2. Open [http://localhost:2121](http://localhost:2121) to view it in your browser