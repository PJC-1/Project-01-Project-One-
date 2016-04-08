function index(req, res) {
  res.json({
    message: "Howdy!",
    documentation_url: "https://github.com/PJC-1/Project-01-Project-One",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
