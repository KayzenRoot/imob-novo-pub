const app = require("./app");
const db = require("./db");

db.sync()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(process.env.PORT, () => {
	console.log("Server started on http://localhost:" + process.env.PORT);
});
