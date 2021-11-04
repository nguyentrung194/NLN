const local = {
    api: 'http://localhost:5000/api/',
};

const staging = {
    api: 'https://api-sor.gcalls.vn/api/',
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === 'staging') {
    envConfig = staging;
} else {
    envConfig = local;
}

const environment = envConfig;

export default environment;
