const Song = require('../models/song.js').Song;

//数据库的操作
const saveSong = async( ctx ) => {
    console.log("保存歌曲");
    let song = new Song(ctx.request.body)
    console.log("song:"+song);
    await new Promise((resolve, reject) => {
        song.save((err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    });
    ctx.status = 200;
    ctx.body = {
        success: true
    };
};


const getAllSongs = async( ctx ) => {
    console.log("查询所有歌曲信息");
    //查询所有歌曲信息
    let doc = await new Promise((resolve, reject) => {
        Song.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
    ctx.status = 200;
    ctx.body = {
        message: '查询所有歌曲成功',
        result: doc
    };
};

const getSongDetail = async( ctx ) => {
    console.log("查询歌曲详情");
    let id = ctx.request.body.id;
    console.log(id);
    let doc = await new Promise((resolve, reject) => {
        Song.findOne({_id: id}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
    ctx.status = 200;
    ctx.body = {
        message: '查询歌曲详情成功',
        result: doc
    };
};

const deleteSong = async( ctx ) => {
    console.log("删除歌曲");
    let id = ctx.request.body.id;
    console.log(id);
    await new Promise((resolve, reject) => {
        Song.findOneAndRemove({_id: id}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
    ctx.status = 200;
    ctx.body = {
        message: '删除成功'
    };
};

const updateSong = async( ctx ) => {
    console.log("修改歌曲");
    let song = ctx.request.body;
    let id = song._id;
    console.log(id);
    await new Promise((resolve, reject) => {
        Song.findOneAndUpdate({ _id : id},
            { $set : { 
                song_name: song.song_name,
                singer : song.singer,
                update_at: song.update_at}
            },{new : true},(err,doc)=>{
                if(err){
                    reject(err);
                }
                resolve(doc);
         })
    });
    ctx.status = 200;
    ctx.body = {
        message: '修改成功',
        success: true
    };
};


module.exports = {
    getAllSongs,
    saveSong,
    getSongDetail,
    deleteSong,
    updateSong
};