const express = require("express");
const router = express.Router();
const {
    addCityLocation,
    editCityLocation,
    destroyCityLocation,
    getCityAllLocations,
    addAffiliateLocation,
    getCityAffiliateLocations,
    editAffiliateLocation,
    destroyAffiliateLocation,
    getCityAllLocationsAndAffiliate
} = require("../controllers/map.controller");

router.post("/add-city-location", (req, res) => {
  addCityLocation(req.body)
    .then((location) => {
      const text = `${location.cityName} успешно добавлена`;
      res.status(200).json({ location, text });
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/edit-city-location", (req, res) => {
  editCityLocation(req.body)
    .then((city) => {
      const text = `${city[1][0].cityName} успешно изминен`;
      res.status(200).json({ city: city[1][0], text });
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

router.post("/destroy-city-location", (req, res) => {
  destroyCityLocation(req.body)
    .then((location) => {
      const text = `${location.affiliateName} успешно добавлена`;
      res.status(200).json(text);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/add-affiliate-location", (req, res) => {
  addAffiliateLocation(req.body)
    .then((location) => {
      const resText = `${location.affiliateName} успешно добавлена`;
      res.status(200).json(resText);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/edit-affiliate-location", (req, res) => {
  editAffiliateLocation(req.body)
    .then((affiliate) => {
        const text = `${affiliate[1][0].affiliateName} успешно изминен`;
        res.status(200).json({ affiliate: affiliate[1][0], text });
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/destroy-affiliate-location/:id", (req, res) => {
  destroyAffiliateLocation(req.params.id)
    .then((location) => {
      const resText = `${location.affiliateName} успешно удалено`;
      res.status(200).json(resText);
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/all-city-location", (req, res) => {
  getCityAllLocations()
    .then((cityLocations) => {
      res.status(200).json(cityLocations);
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/all-city-location-and-affiliate", (req, res) => {
  getCityAllLocationsAndAffiliate()
    .then((cityLocations) => {
      res.status(200).json(cityLocations);
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/city-affiliate-location/:cityId", (req, res) => {
  getCityAffiliateLocations(req.params.cityId)
    .then((affiliateLocations) => {
      res.status(200).json(affiliateLocations);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
