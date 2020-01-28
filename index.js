const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/top-secret-bot", (req, res) => {
  const { space, type, message } = req.body || {};

  console.log(req.body);
  
  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
    res.send({ text: `Thanks for adding me to ${space.displayName}` });
  } else if (type === "MESSAGE") {
    fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=Dub6e35MTTaaV0tcKxcqGMy9cpvfD12w&tag=${
        message.text
      }&rating=G`
    )
      .then(response => response.json())
      .then(json =>
        res.send({
          cards: [
            {
              sections: [
                {
                  widgets: [
                    {
                      image: {
                        imageUrl: json.data.images.fixed_height_small.url
                      }
                    },
                    {
                      buttons: [
                        {
                          textButton: {
                            text: "View on GIPHY",
                            onClick: {
                              openLink: {
                                url: json.data.url
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
      );
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});