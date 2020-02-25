/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");
const styleModel = require("../models/Style")

const getAverageRate = async idArtist => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async artists => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async res => {
          // AVG : things are getting tricky here ! :) 
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this artist

          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});


router.get("/artists/:id", (req, res, next) => {
  const artistId = req.params.id;
  artistModel
  .findById(artistId)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(next);
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/artists", (req, res) => {

  const { name, description, style, isBand } = req.body;

  const newArtist = {
    name,
    description,
    style,
    isBand
  };
  

  artistModel
  .create(newArtist)
  .then(createdArtist=> {
  res.status(200).json({msg: "new artist created"})
  })
  .catch(err => {
    console.log("create error", err);
    res.status(500).json(err);
  });
});

router.patch("/artists/:id", (req, res) => {
  const { name, description, style, isBand } = req.body;

  const updateArtist = {
    name,
    description,
    style,
    isBand
  };

  const artistId = req.params.id;

  artistModel
    .findByIdAndUpdate(artistId, updateArtist)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(err => {
      console.log("patch error", err);
      res.status(500).json(err);
    });

});



router.delete("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

// router.get("/admin/artists/create", (req, res, next) => {
//   styleModel
//     .find()
//     .then(styles => {
//       res.status(200).json(styles)
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
