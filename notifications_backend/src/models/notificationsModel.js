var sql = require('./DB.js');

const  Notifications = {};


Notifications.getNotifications =  (uniqueId, result) => {     
     
    sql.query("INSERT INTO `notifications_users` VALUES (NULL,?,?,?,?,?)", [uniqueId,1,1,1,1],  (err, res) => {  
       if(err) result(err, null);
       else result(null,res)
   });           
}
Notifications.deleteNotification =  (uniqueId,alertToRemove, result) => {   
       let updateData = {[alertToRemove]:0}
       sql.query('UPDATE notifications_users set ?  WHERE uniqueId = ?', [updateData,uniqueId],  (err, res) => {  
        if(err) result(err, null);
        else result(null,res)
   });          
}

Notifications.getByUiqueId = (uniqueId,result) => {
    sql.query("SELECT alert_1,alert_2,alert_3,alert_4,uniqueId FROM notifications_users WHERE uniqueId = ?",[uniqueId] ,(err,res) => {
        if(err)  result(err, null);
        else result(null, res[0]);
    })
}
module.exports = Notifications;