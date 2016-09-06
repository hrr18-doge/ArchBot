
'use strict'

const slack = require('slack')
const _ = require('lodash')
const config = require('./config')
const request = require('request')

let bot = slack.rtm.client()

const storedMessagesInMemory = [];

bot.started((payload) => {
  this.self = payload.self
})

var sendMsg = function(){
  request.post('https://hrr18-doge.herokuapp.com/api/messages', {
    data:JSON.stringify(storedMessagesinMemory)
  })
}

bot.message((msg) => {
  storedMessagesInMemory.push(msg);
  //console.log(storedMessagesInMemory)
  console.log(storedMessagesInMemory.length)

  if (storedMessagesInMemory.length > 2){
    console.log("time to send the messages to the database woof woof ")
    sendMsg();
  }

  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('dog'),
    channel: msg.channel,
    username: 'Dogebot',
    text: `Wow such message very doge!!! I has your message now.`
  }, (err, data) => {
    if (err) throw err

    let txt = _.truncate(data.message.text)

    console.log(`Wow! such server very bot"`)
  })
})

module.exports = bot

/////
