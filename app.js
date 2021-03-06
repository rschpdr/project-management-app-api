require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Configura o app para entender requisições com tipo de corpo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.REACT_APP_URL }));

const projectRouter = require("./routes/project.routes");
const taskRouter = require("./routes/task.routes");
const authRouter = require("./routes/auth.routes");

require("./configs/db.config");

require("./configs/passport.config")(app);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("*", (req, res, next) => {
  const hostUrl = req.originalUrl;
  if (!hostUrl.includes("/api")) {
    console.log(hostUrl);
    return res.sendFile(path.join(publicPath, "index.html"));
  }
  return next();
});

app.use("/api", projectRouter);
app.use("/api", taskRouter);
app.use("/api", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`running at port ${process.env.PORT}`)
);
