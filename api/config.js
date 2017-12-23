var config = {
    base: {
        protocol: 'http',
        //domain: '47.94.1.230:8080'
        domain: 'core.91bcl.com'
    },
    dev: {
    },
    test: {

    },
    production: {
        domain: 'astraea_prod'
    }
};

for(var p in config.base) {
    config['dev'][p] = config['dev'][p] ? config['dev'][p] : config['base'][p];
    config['test'][p] = config['test'][p] ? config['test'][p] : config['base'][p];
    config['production'][p] = config['production'][p] ? config['production'][p] : config['base'][p];
}

module.exports = config;