import { commandMapper } from '../mappers/commandMapper.js';
import { CommandModel } from '../models/Command.js';

export const getCommands = async (req, res) => {
  try {
    const commands = await CommandModel.find({ uid: req.uid });

    if (!commands || commands.length === 0) {
      return res.status(200).json({
        ok: true,
        commands: [],
        message: 'No commands found',
      });
    }

    res.status(201).json({
      ok: true,
      commands,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      commands: [],
      message: 'Please talk with your administrator',
    });
  }
};

export const getTableCommands = async (req, res) => {
  try {
    const commands = await CommandModel.find({ table_id: req.params.table_id }).exec();

    if (!commands || commands.length === 0) {
      return res.status(200).json({
        ok: true,
        commands: [],
        message: 'No commands found',
      });
    }

    res.status(201).json({
      ok: true,
      commands,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      commands: [],
      message: 'Please talk with your administrator',
    });
  }
};

export const createCommand = async (req, res) => {
  try {
    const newCommand = commandMapper(req.body);

    if (!newCommand) {
      return res.status(400).json({
        ok: false,
        message: 'Some data is missing or incorrect',
      });
    }
    const command = new CommandModel({ ...newCommand, uid: req.uid });
    await command.save();

    res.status(201).json({
      ok: true,
      command,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      command: null,
      message: 'Please talk with your administrator',
    });
  }
};

export const updateCommand = async (req, res) => {
  try {
    const newCommand = commandMapper(req.body);

    if (!newCommand) {
      return res.status(200).json({
        ok: false,
        message: 'Some data is missing or incorrect',
      });
    }

    const command = await CommandModel.findByIdAndUpdate(
      req.body.id,
      {
        $set:
        {
          table_id: newCommand.table_id,
          initCommand: newCommand.initCommand,
          endCommand: newCommand.endCommand,
          platesServed: newCommand.platesServed,
          plates: newCommand.plates,
        }
      },
      { new: true }
    );

    if (!command) {
      return res.status(400).json({
        ok: false,
        message: 'Command not created.',
      });
    }

    res.status(201).json({
      ok: true,
      command,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      command: null,
      message: 'Please talk with your administrator',
    });
  }
};

export const deleteCommand = async (req, res) => {
  try {
    const command = await CommandModel.findByIdAndDelete(req.params.id);

    if (!command) {
      return res.status(400).json({
        ok: false,
        message: 'Command not found.',
      });
    }

    res.status(201).json({
      ok: true,
      command,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      command: null,
      message: 'Please talk with your administrator',
    });
  }
};
