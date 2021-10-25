
module.exports = (app) => {

const notifications = require('../controllers/notificationsControllers.js');



app.route('/get_notifications').get(notifications.get_notifications)
app.route('/delete').post(notifications.delete_notification)


}   