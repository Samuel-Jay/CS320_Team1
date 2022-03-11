const config = {
  username: "team1",
  password: "team1project",
  cluster: "cluster0.ba40p",
  db: "Sonic-Bionics",
};

const companies = new Map();
companies.set("snazzykangarooconsulting.com", "Snazzy-Kangaroo");
companies.set("sonicbionics.com", "Sonic-Bionics");
companies.set("atlastechnology.com", "Atlas-Tech");

module.exports = { config, companies };
