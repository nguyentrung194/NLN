const local = {
    api: 'https://api-sor.gcalls.vn/api/',
};

const staging = {
    api: 'http://51.79.142.43:5000/',
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === 'staging') {
    envConfig = staging;
} else {
    envConfig = local;
}

const environment = envConfig;

export default environment;
