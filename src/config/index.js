// _DEV_

const config = {
    ENV: process.env.NODE_ENV || "development",
    IP: process.env.IP_ADDRESS || "127.0.0.1",
    PORT: process.env.PORT || 3000,
    SERVER: process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "http://localhost:3000/"
};

export default config;
