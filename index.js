import "dotenv/config"



import { Client , GatewayIntentBits, Partials, ReactionType } from "discord.js"


const swearWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "bastard",
  "damn",
  "hell",
  "crap",
  "dick",
  "piss",
  "motherfucker",
  "bullshit",
  "fucker",
  "dumbass",
  "jackass",
  "cunt"
];



const client = new Client({
    intents : [
           GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials : [
        Partials.Message,
        Partials.Channel
    ]
})



client.on("ready",async()=> {
    console.log(`logging in as ${client.user.tag}`)


    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID) 

    if (channel) {
        channel.send("Connected!")
    }
})






client.on("messageCreate",(message)=> {

    if (message.author.bot) {return}

    swearWords.forEach((word)=> {
        if (message.content.toLowerCase().includes(word)) {
            message.reply("Hey don't say that!")
            message.delete()
            return
        }
    })

    if (message.mentions.users.size == 0) {
        return
    }


      const user = message.mentions.users.first();

  if (user.tag == client.user.tag) {
    message.reply("Hello!")
    return
  }
})


client.on("messageDelete",(message)=> {
    if (message.author.bot) {return}
    message.channel.send("Why delete : C")
})



client.login(process.env.DISCORD_TOKEN)