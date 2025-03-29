const http = require("http");
const app = require("./src/app");

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("Serser error: ", err);
})