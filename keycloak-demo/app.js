// app.js
const express = require("express");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

const app = express();
const memoryStore = new session.MemoryStore();

// Configure session middleware
app.use(
  session({
    secret: "someSecretValue",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Configure Keycloak middleware
const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

// Public route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Keycloak Demo!</h1><a href='/protected'>Go to protected page</a>");
});

// Protected route (requires login)
app.get("/protected", keycloak.protect(), (req, res) => {
  res.send("<h1>Protected Content</h1><p>You are successfully logged in through Keycloak!</p>");
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ App running at http://localhost:${PORT}`);
});
