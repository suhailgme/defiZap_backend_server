const zapsStats = require('./zapStats')
const zapDetails = require('../constants/zaps')

module.exports =  async () =>{
    const zapStats = await zapsStats.getZapStats()
    const zaps = zapDetails()
    let frontierZaps = JSON.parse(JSON.stringify(zaps))
    frontierZaps.forEach(zap => {
        zapStats.forEach(zapStat =>{
            if(zap.name === zapStat.name){
                zap.stats = {}
                for(let prop in zapStat){
                    if(prop !== 'address' && prop !== 'name' && prop !== 'aggregated' ) zap.stats[prop] = zapStat[prop]
                }
            }
        })
    })
    return frontierZaps

};


