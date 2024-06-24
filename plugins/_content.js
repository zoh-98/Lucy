import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import fs from 'fs'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto }  = (await import(global.baileys))

var handler = m => m
handler.all = async function (m) {

const response = await fetch('https://raw.githubusercontent.com/GataNina-Li/GataBot-MD/master/official_accounts.json')  
const data = await response.json()
let { accounts, channels, groups, collaboration, sponsors, others } = data.info


global.fakeChannel = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: false }}, { quoted: m }
global.fakeChannel2 = { mentionedJid: [m.sender], isForwarded: false}

}
export default handler
