var log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console'},
        file: {
	        type: 'file',
	        filename: 'logs/log.log',
	        maxLogSize: 102400,
	        backups:10
        }
    },
    categories: {
        default: {
            appenders: ["console", "file"],
            level: "info"
        },
	    normal: {
		    appenders: ["file"],
		    level: "info"
	    }
    },
    replaceConsole: true
});

module.exports = function(name) {
    name = name ? name : 'default';
    var logger = log4js.getLogger(name);
    return logger;
};