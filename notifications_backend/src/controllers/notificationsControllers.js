'use strict';

var Notifications = require('../models/notificationsModel.js');

exports.get_notifications = async( req, res) => {

    let {query:{uniqueId}} = req
    Notifications.getNotifications( uniqueId,(err, insertNotifications) => {
        if (err) res.send({msg:"something faild"}).status(500);
        if(insertNotifications.affectedRows > 0){
            Notifications.getByUiqueId(uniqueId,(err,notifications) => {
            if (err) res.send({msg:"something faild"}).status(500);
            if(Object.keys(notifications).length > 0){
                let timeForShowNew =  Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                let timeDuration =  Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                let data = order_data(notifications)
                res.send({timeForShowNew,timeDuration,data,uniqueId}).status(201)
            }else{
                res.send({msg:"something faild"}).status(200);
            }
         })
        }else{
            res.send({msg:"something faild"}).status(200);
        }
    });
};

exports.delete_notification = (req, res) => {

    const {uniqueId,alertToRemove} = req.body
    Notifications.deleteNotification(uniqueId,alertToRemove,(err, updateNotification) => {
        if (err) res.send({msg:"something faild"}).status(500);
            if(updateNotification.affectedRows > 0){
                Notifications.getByUiqueId(uniqueId,(err,notifications) => {
                    if (err) res.send({msg:"something faild"}).status(500);
                    if(Object.keys(notifications).length > 0){
                        let data = order_data(notifications)
                        res.send({data}).status(201)
                    }else{
                        res.send({msg:"something faild"}).status(200);
                    }
                 })
            }
        });
};

const order_data = notifications => {
    const alertData = [
        {type:'info',text:['New auction next month 1','Big sale next week '],icon:"fa-info-circle"},
        {type:'warning',text:['Limited edition books for next auction '],icon:"fa-exclamation-triangle"},
        {type:'success',text:['New books with limited edition coming next week '],icon:"fa-check-circle"},
        {type:'danger',text:['Last items with limited time offer '],icon:"fa-ban"},
    ]
    let data = []
    let x = 0
    for(let i in notifications){
         if(i.includes("alert_")){
             alertData[x]['alert'] = i
             alertData[x]['status'] = notifications[i]
             data.push(alertData[x])  
             x++
         }
     }
     return data
}
