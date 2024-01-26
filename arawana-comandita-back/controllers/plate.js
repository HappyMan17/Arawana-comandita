import { response } from "express";
import { plateMapper } from "../mappers/plateMapper.js";
import { PlateModel, PlateGroupModel } from "../models/index.js";

export const getUserPlates = async (req, res) => {
  try {
    const plates = await PlateModel.find({ uid: req.uid }).exec();
    if (!plates) {
      return res.status(500).json({
        ok: false,
        message: 'Plates not found',
      });
    }

    res.status(201).json({
      ok: true,
      plates: plates.map(plate => ({
        id: plate.id,
        name: plate.name,
        price: plate.price,
        plateGroup: plate.plateGroup,
        description: plate.description,
        image: plate.image,
      }))
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const getPlate = async (req, res) => {
  try {
    const plate = await PlateModel.findById(req.params.id).exec();
    if (!plate) {
      return res.status(500).json({
        ok: false,
        message: 'Plate not found',
      });
    }

    res.status(201).json({
      ok: true,
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        plateGroup: plate.plateGroup,
        description: plate.description,
        image: plate.image,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const createPlate = async (req, res = response) => {
  try {
    if (!req.body.plateGroup) {
      // db save plate
      const group = new PlateGroupModel({ name: 'Other', uid: req.uid });
      await group.save();
    }
    // db save plate
    const plate = new PlateModel(plateMapper(req.body));
    await plate.save();

    res.status(201).json({
      ok: true,
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        uid: req.uid,
        plateGroup: plate.plateGroup,
        description: plate.description,
        image: plate.image,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const updatePlate = async (req, res = response) => {
  try {
    const newPlate = plateMapper(req.body);
    // db save plate
    const plate = await PlateModel.findByIdAndUpdate(
      req.body.id,
      { $set:
        {
          name: newPlate.name,
          price: newPlate.price,
          description: newPlate.description,
          image: newPlate.image,
        }
      },
      { new: true },
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      plate: {
        id: plate.id,
        name: plate.name,
        price: plate.price,
        plateGroup: plate.plateGroup,
        description: plate.description,
        image: plate.image,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletPlate = async (req, res = response) => {
  try {
    const plateId = req.params.id;
    // db save plate
    const plate = await PlateModel.findByIdAndDelete(
      plateId,
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      plate: {
        id: plateId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const getPlateGroups = async (req, res) => {
  try {
    const groups = await PlateGroupModel.find({ uid: req.uid }).exec();
    if (!groups) {
      return res.status(500).json({
        ok: false,
        message: 'Plate groups not found',
      });
    }

    res.status(201).json({
      ok: true,
      group: groups.map(group => ({
        id: group.id,
        name: group.name,
      })),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const createGroup = async (req, res) => {
  try {
    // db save plate
    const group = new PlateGroupModel({ name: req.body.name, uid: req.uid });
    await group.save();

    res.status(201).json({
      ok: true,
      group: {
        id: group.id,
        name: group.name
      },
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletPlateGroup = async (req, res = response) => {
  try {
    const groupId = req.params.id;
    console.log(req.params.id);
    // db save plate
    const plate = await PlateGroupModel.findByIdAndDelete(
      groupId,
    );

    if (!plate) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      group: {
        id: groupId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};
