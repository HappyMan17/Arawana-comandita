// gets the quantity of plates for the command
export const checkCurrentCommand = (table, command) => {
  const { plates, command: tableCommands } = table;

  if (!command || command.length === 0) {
    return [];
  }
  if (!plates || plates.length === 0) {
    return command;
  }

  const finalCommand = plates.map(plate => {
    const currentCommand = command.find(c => c.id === plate.id);

    if (!currentCommand || currentCommand.quantity < plate.quantity) {
      return null;
    }
    const updatedCommand = { ...currentCommand };

    const prevCommand = tableCommands.find(c => c.id === plate.id);
    let prevQuantity = prevCommand?.quantity ?? 0;

    updatedCommand.quantity -= plate.quantity;
    updatedCommand.quantity += prevQuantity;

    return updatedCommand;

  }).filter(command => command !== null);
  return finalCommand;

};
