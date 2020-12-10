const db = require("../config/db_config");
const Affiliate = db.affiliateLoc;
const City = db.cityLoc;

/**
 * Метод добавления городов
 *
 * @param data
 */
exports.addCityLocation = async (data) => {
  try {
    return await City.create(data);
  } catch (e) {
    return e;
  }
};
/**
 * Метод добавления городов
 *
 * @param id
 */
exports.destroyCityLocation = async (id) => {
  try {
    return await City.destroy({ where: id });
  } catch (e) {
    return e;
  }
};

/**
 * Метод изминения городов
 *
 * @param data
 */
exports.editCityLocation = async (data) => {
  try {
    return await City.update(data, {
      where: { id: data.cityId },
      returning: true,
    });
  } catch (e) {
    return e;
  }
};

/**
 * Метод добавления филиалов
 *
 * @param data
 */
exports.addAffiliateLocation = async (data) => {
  try {
    return await Affiliate.create(data);
  } catch (e) {
    return e;
  }
};

/**
 * Метод удаления филиалов
 *
 * @param id
 */
exports.destroyAffiliateLocation = async (id) => {
  try {
    return await Affiliate.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    return e;
  }
};

/**
 * Метод редактирования филиалов
 *
 * @param data
 */
exports.editAffiliateLocation = async (data) => {
  try {
    return await Affiliate.update(data, {
      where: { id: data.id },
      returning: true,
    });
  } catch (e) {
    return e;
  }
};

/**
 * Получение всех городов
 *
 * @returns {Promise<Model[]|*>}
 */
exports.getCityAllLocations = async () => {
  try {
    return await City.findAll();
  } catch (e) {
    return e;
  }
};

/**
 * Получение всех городов и их филиалов
 *
 * @returns {Promise<Model[]|*>}
 */
exports.getCityAllLocationsAndAffiliate = async () => {
  try {
    return await City.findAll({include: Affiliate});
  } catch (e) {
    return e;
  }
};

/**
 * Получение всех филиалов по городу
 *
 * @param cityId
 * @returns {Promise<Model[]|*>}
 */
exports.getCityAffiliateLocations = async (cityId) => {
  try {
    return await Affiliate.findAll({
      where: {
        cityId,
      },
    });
  } catch (e) {
    return e;
  }
};
