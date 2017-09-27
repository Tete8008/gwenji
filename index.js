const Discord = require("discord.js")



const bot = new Discord.Client();
const YoutubeStream = require("ytdl-core")
const Overwatch = require("overwatch-js")




bot.on("message", function (message) {
    if (message.content.toLowerCase().startsWith("g ")) {
        let string = message.content.split("g ")[1]
        let adresse
        switch (string) {
            case "ah":
                adresse = "./ah.mp3"
                break;
            case "i need healing":
                adresse = "./ineedhealing.mp3"
                break;
            case "ryujin":
                adresse = "./ryujin.mp3"
                break;
            case "non":
                adresse = "./non.mp3"
                break;
            case "wtf boom":
                adresse = "./wtfboom.mp3"
                break;
            case "c'est clair":
                adresse="maisoui.mp3"
                break;
            case "omae wa":
            adresse="omaewa.mp3"
            break;
            case "hi there":
            adresse="hithere.mp3"
            break;
            case "tg":
            adresse="tg.mp3"
            break;
        }
        if (string.toLowerCase().startsWith("play")) {
            let args = string.split(" ")
            if (args[1].startsWith("https://www.youtube.com/watch?v=")) {
                let voiceChannel = message.guild.channels
                    .filter(function (channel) {
                        return channel.type === "voice"
                    }).first()

                voiceChannel.join()
                    .then(function (connection) {

                        let stream = YoutubeStream(args[1])
                        stream.on("error", function () {
                            message.channel.send("'" + args[1] + "' n'est pas une URL YouTube valide. On sait pas faire un copier-coller ?")
                            connection.disconnect()
                        })
                        connection.playStream(stream)
                            .on("end", function () {
                                connection.disconnect()
                            })


                    })
            } else {
                message.channel.send("Ce n'est pas une url Youtube.")
            }

        }

        if (adresse != null) {
            let voiceChannel = message.guild.channels
                .filter(function (channel) {
                    return channel.type === "voice"
                }).first()
            voiceChannel.join()
                .then(function (connection) {
                    connection.playFile(adresse)
                        .on("end", function () {
                            connection.disconnect()
                        })
                })
        }


        if (string.toLowerCase() == "stop") {
            let voiceChannel = message.guild.channels
                .filter(function (channel) {
                    return channel.type === "voice"
                }).first()
            voiceChannel.leave()
        }

        if (string.toLowerCase().startsWith("overwatch")) {
            let name = string.split(" ")[1]
            let tag = string.split(" ")[2]
            if (name != null && tag != null) {
                Overwatch.getOverall("pc", "eu", name + "-" + tag)
                    .then(function (data) {
                        message.channel.send("Battletag: " + name + "#" + tag + "\nNiveau: " + (data.profile.tier * 100 + data.profile.level) + "\nCote actuelle: " + data.profile.rank + "\nPalier: " + data.profile.ranking)
                        console.log(data.profile.season)
                    })
            }
        }

        if (string.toLowerCase().startsWith("game")) {
            let arg = string.split(" ")[1]

            for (i = 0; i < message.guild.members.array().length; i++) {
                if (message.guild.members.array()[i].displayName == arg) {
                    if (message.guild.members.array()[i].presence.game != null) {
                        message.channel.send(message.guild.members.array()[i].displayName + " joue à " + message.guild.members.array()[i].presence.game.name)
                    } else {

                        message.channel.send(message.guild.members.array()[i].displayName + " ne joue à rien.")
                    }

                }
            }

        }

        if (string.toLowerCase().startsWith("dis")){
            let arg = string.split("dis ")[1]
            message.channel.send(arg,{tts:true})
        }

        if (string.toLowerCase()=="déco"){
            message.channel.send("Déconnexion")
            bot.user.setStatus("invisible")
            bot.destroy()
        }


    }
})



bot.login("MzYwMDk5NDY5Nzg3OTIyNDMz.DKQoaA.v0U7q0gdlg7EtUPPvVDiOEsYqQU").then(function () {

    
})


bot.on("presenceUpdate",function(oldMember,newMember){
    if (oldMember.presence.game!=newMember.presence.game && newMember.presence.game!=null){
        bot.guilds.array()[0].channels.filter(function (channel) {
            return channel.type === "text"
        }).first().send(newMember.displayName+" a commencé à jouer à "+newMember.presence.game.name)
    }
})
