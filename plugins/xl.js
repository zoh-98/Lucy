
import axios from "axios";
import moment from "moment-timezone";

  let handler = async function (m, { conn, command, args, usedPrefix }) {

          try {
       let prompt = "";
       let aspectRatio = "1";
            let niji = {
              X: 0,
              Y: 0
               };

            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }
            const lower = "low quality, bad quality";
switch(aspectRatio.toString()) {
  case "1":
    niji.X = 1024;
    niji.Y = 1024;
    break;
  case "2":
    niji.X = 1024;
    niji.Y = 720;
    break;
  case "3":
    niji.X = 720;
    niji.Y = 1024;
    break;
  case "4": 
    niji.X = 1024;
    niji.Y = 512;
    break;
  case "5":
    niji.X = 512;
    niji.Y = 1024;
    break;
}
    
            if (args.length > 0) {
                prompt = args.join(" ");
            } else {
                m.reply("⚠️ | اكتب شيئا.");
                return;
            }
  const startTime = new Date();         
const pompt = await global.funcs.trgm(prompt, "en");

            
const options = {
  method: 'POST',
  url: 'https://api.prodia.com/v1/sdxl/generate',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Prodia-Key': 'd01a7eb8-9f10-4abe-b142-fd5248fb7e88'
  },
  data: {
width: niji.X,
height: niji.Y,
    model: 'animagineXLV3_v30.safetensors [75f2f05b]',
    prompt: pompt,
    negative_prompt: lower,
    steps: 20,
    cfg_scale: 7,
    seed: -1
  }
};
m.react("⚙️");
const nijix = await axios
  .request(options);

async function si(bro) {
    let jobStatus = '';
    while (jobStatus !== 'succeeded') {
        try {
            const yo = await axios.get(`https://api.prodia.com/job/${bro}`);

            jobStatus = yo.data.status;
            if (jobStatus != 'succeeded') {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error(error);
        }
    }
 return jobStatus;
}

await si(nijix.data.job);


const genimg = `https://images.prodia.xyz/${nijix.data.job}.png`;
const hello = await axios.get(genimg, {responseType: "arraybuffer"});
          
  const endTime = new Date();
                
                const drawingTime = (endTime - startTime) / 1000;

                const currentDate = moment.tz("Africa/Casablanca").format("YYYY-MM-DD");
                const currentTime = moment.tz("Africa/Casablanca").format("h:mm:ss A");
       
            conn.sendFile(m.chat, hello.data, "img.png",`
❨ تم تنفيذ طلبك بنجاح ⚝ ❩

⚝︙بواسطة -› ${m.pushName} ♣️
⚝︙استغرق -› ${drawingTime} 🖤
⚝︙الوقت -› ${currentTime} 🎩
⚝︙التاريخ -› ${currentDate} 🌚
              `);  
            await m.react("✔️");
        } catch (error) {
          m.react("❌")
        }
    }

    handler.command = ["xl"]

    export default handler