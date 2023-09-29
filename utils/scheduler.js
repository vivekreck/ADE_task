const schedule = require("node-schedule");
const fs = require('fs');
const path = require('path');

const deleteLogsfile = () => {
    fs.readdir(path.join(__dirname, '..', 'logs'), function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }

        filenames.forEach(function (filename) {
            let date = filename.split("=")[1]?.split('.')[0];
            if (date) {
                date = date.split('-');
                fileDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4], 0, 0)

                const minutesDifference = Math.floor(Math.abs(new Date() - fileDate) / (1000 * 60));

                if (minutesDifference > 30) {
                    fs.unlink(path.join(__dirname, '..', 'logs', filename), () => {

                    })
                }
            } else {
                fs.unlink(path.join(__dirname, '..', 'logs', filename), (err, data) => {

                })
            }
        });
    });
}

const executeJobs = () => {
    const scheduledJob = schedule.scheduleJob("0 */5 * * * *", () => {
        deleteLogsfile();
    });
}
module.exports = executeJobs;
