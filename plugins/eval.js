let handler = async (m, { conn, command, args, usedPrefix }) => {
    try {
    function output(msg) {
        if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
          msg = msg.toString();
        else if (msg instanceof Map) {
          let text = `Map(${msg.size}) `;
          text += JSON.stringify(mapToObj(msg), null, 2);
          msg = text;
        }
        else if (typeof msg == "object")
          msg = JSON.stringify(msg, null, 2);
        else if (typeof msg == "undefined")
          msg = "undefined";
  
        m.reply(msg);
      }
      function out(msg) {
        output(msg);
      }
      function mapToObj(map) {
        const obj = {};
        map.forEach(function (v, k) {
          obj[k] = v;
        });
        return obj;
      }
      const cmd = `
      (async () => {
        try {
          ${args.join(" ")}
        }
        catch(err) {
          console.log("eval command", err.message);
          out(err.message);
  
          }
      })()`;
      eval(cmd);
    } catch (err) {
      console.log(err);
      out(err);
    }
  }
  
  
  handler.command = ["eval"];
  handler.owner = true;

  
  
  export default handler