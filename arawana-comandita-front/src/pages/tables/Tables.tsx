/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { Loader, PaymentMethodModal, SelectProduct, TableCard, TableForm, TablePlatesModal } from "../../components";
import { Table, Plate, Command } from "../../types";
import { usePlates, useTable, useUser, useDaySummary } from "../../hooks";
import Swal from "sweetalert2";
import { commandPDF, deepCopy } from "../../helpers";
import { usePlateGroup } from "../../hooks/usePlateGroup";

interface TableModelState {
  isPlateModalShown: boolean;
  isPreviewModalShown: boolean;
  isTableFormModalShown: boolean;
  isPaymentModalShown: boolean;
  title: string;
  plates: Plate[];
}

export const Tables = () => {
  const {
    tables,
    startCreatingTable,
    startUpdatingTable,
    startGetingTables,
    currentTable,
    setCurrentTable,
    isLoading,
    startRemovingTable,
    startUpdatingTablePlates,
    startCreatingTableCommand,
    startDeletingCommand,
    // startUpdatingTableCommand,
    errorMessage,
  } = useTable();
  const { plateGroups, startGettingPlateGroups } = usePlateGroup();
  const { plates, startGetingPlates } = usePlates();
  const { startAddingToDaySummary } = useDaySummary();
  const { user } = useUser();

  // TABLE MODAL
  const [modalStates, setModalStates] = useState<TableModelState>({
    isPlateModalShown: false,
    isPreviewModalShown: false,
    isTableFormModalShown: false,
    isPaymentModalShown: false,
    title: 'Create Table',
    plates: [],
  });

  /**
   * Modal to create or update table
   * @param title create or update
   * @param id table id
   */
  const showFormModal = async (title: string, id: string | null) => {
    // set currentPlate to show info in modal
    // if null, create new table
    await setCurrentTable(id);
    setModalStates(prevState => ({
      ...prevState,
      isTableFormModalShown: true,
      title,
    }));
  };

  // TABLE MODAL Create or update
  const onSaveClick = async (table: Table) => {
    if (!user.id) {
      // without uid plate mustn't be created or updated
      console.log('no user id');
      return;
    }

    if (currentTable) {
      // update
      await startUpdatingTable(table);
    } else {
      // create
      table.uid = user.id;
      await startCreatingTable(table);
    }
    closeFormModal();
  };

  // Close TABLE MODAL
  const closeFormModal = async () => {
    setModalStates(prevState => ({
      ...prevState,
      isTableFormModalShown: false,
    }));
    await setCurrentTable(null);
  };

  // TABLE MODAL
  const removeTable = async (tableId: string | null) => {
    const result = await Swal.fire({
      title: 'Delete',
      html: 'Do you really want to delete this table? This process can not be undone',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
    });
    if (result && result.isConfirmed) {
      tableId && (await startRemovingTable(tableId));
    }
  };

  const onEndService = async (table: Table) => {
    // console.log({ table });
    if (table.plates.length > 0) {
      // show modal
      setModalStates(prevState => ({
        ...prevState,
        isPaymentModalShown: true,
      }));
      setCurrentTable(table.id!);
    }
  };

  const onClosePaymentModal = async (method: string | null) => {
    // console.log({ currentTable });
    setModalStates(prevState => ({
      ...prevState,
      isPaymentModalShown: false,
    }));

    if (method === null) {
      return;
    }
    const table = { ...deepCopy(currentTable!), paymentMethod: method, hasPaidService: true };
    await startAddingToDaySummary(table);
    const cleanTable = {
      ...currentTable!,
      paymentMethod: method,
      total: 0,
      plates: [],
    };
    await startUpdatingTable(cleanTable);
    await setCurrentTable(null);
  };

  // Plate modal
  const onClosePlateModal = async () => {
    setModalStates(prevState => ({
      ...prevState,
      isPlateModalShown: false,
    }));
    await setCurrentTable(null);
  };

  const onShowPlateModal = async (tableId: string | null) => {
    if (!tableId) {
      console.log('no table id'); // todo remove
    }
    setModalStates(prevState => ({
      ...prevState,
      isPlateModalShown: true,
    }));

    await setCurrentTable(tableId);
  };

  /**
   * Saves the plates selected in its table
   * @param tablePlates Plates selected
   */
  const onSavePlateModal = async (tablePlates: Plate[]) => {
    if (currentTable) {
      // update plates
      tablePlates.forEach(plate => {
        console.log({ plate });
      });
      await startUpdatingTablePlates({
        tableId: currentTable.id!,
        selectedPlates: tablePlates,
      });
      // todo update command
    }
    startGetingTables();
    onClosePlateModal();
    await setCurrentTable(null);
  };

  // Preview
  const onShowPlateModalPreview = async (plates: Plate[]) => {
    setModalStates(prevState => ({
      ...prevState,
      isPreviewModalShown: true,
      plates,
    }));
  };

  const onClosePreviewModal = async (event: any) => {
    if (event.target.tagName === 'SECTION') {
      setModalStates(prevState => ({
        ...prevState,
        isPreviewModalShown: false,
        plates,
      }));
    }
  };

  /**
   * Creates a pdf with the command
   * And starts the timer
   */
  const handleStartCommand = async (table: Table) => {
    await setCurrentTable(table.id!);
    if (table.plates.length > 0) {
      commandPDF(table);
    }


    const command: Command = {
      table_id: table.id!,
      initCommand: new Date(),
      endCommand: null,
      platesServed: false,
      plates: table.plates,
    };
    await startCreatingTableCommand(command, table);
  };

  /**
   * Food delivered and timer ends
   * @param table
   */
  const handleFoodDelivered = async (table: Table) => {
    if (table.commands && table.commands.length > 0) {
      // await startUpdatingTableCommand(deepCopy(table));
      await startDeletingCommand(table);
    }
  };

  // Error message
  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error In Tables', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    startGetingTables();
    startGetingPlates();
    startGettingPlateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="w-full font-semibold text-4xl">
        Tables
      </h1>
      <section className="min-w-[700px] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 grid-flow-row gap-4 my-5 overflow-hidden">
        {
          tables.map(table => {
            return (
              <TableCard
                table={table}
                showFormModal={showFormModal}
                onShowPreview={onShowPlateModalPreview}
                removeTable={removeTable}
                showPlateModal={onShowPlateModal}
                onEndService={onEndService}
                onStartCommand={handleStartCommand}
                onFoodDelivered={handleFoodDelivered}
                key={`${table.id}-${table.name}`}
              />
            );
          })
        }
        {/* Create new table card */}
        <button onClick={() => showFormModal('Create Table', null)} className="flex justify-center items-center min-h-80 max-w-[320px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700">
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </section>
      {/* Modals: */}
      {/* Table preview: */}
      <TablePlatesModal
        isShown={modalStates.isPreviewModalShown}
        plates={modalStates.plates}
        onClose={onClosePreviewModal} />
      {
        modalStates.isTableFormModalShown && (
          <TableForm
            onClose={closeFormModal}
            onSave={onSaveClick}
            table={currentTable}
            title={modalStates.title ?? ''} />
        )
      }
      {
        modalStates.isPlateModalShown && (
          <SelectProduct plates={plates ?? []} onClose={onClosePlateModal} onSave={onSavePlateModal} plateGroups={plateGroups} />
        )
      }
      {
        isLoading && (
          <Loader />
        )
      }
      <PaymentMethodModal
        isShown={modalStates.isPaymentModalShown}
        onClose={onClosePaymentModal}
      />
    </>
  );
};
