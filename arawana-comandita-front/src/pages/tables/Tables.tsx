/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { SelectProduct, TableCard, TableForm } from "../../components";
import { ModalType, ModalState, Table, Plate } from "../../types";
import { usePlates, useTable, useUser, useDaySummary } from "../../hooks";
import Swal from "sweetalert2";

export const Tables = () => {
  const {
    tables,
    startCreatingTable,
    startUpdatingTable,
    startGetingTables,
    currentTable,
    setCurrentTable,
    startRemovingTable,
    startUpdatingTablePlates,
    errorMessage,
  } = useTable();
  const { plates, startGetingPlates } = usePlates();
  const { startAddingToDaySummary } = useDaySummary();
  const { user } = useUser();

  // TABLE MODAL
  const [modalValues, setModalValues] = useState<ModalState>({
    isShown: false,
    title: '',
    type: 'Create'
  });
    // PLATE MODAL
  const [plateModalValues, setPlateModalValues] = useState<ModalState>({
    isShown: false,
    tableId: null,
    type: 'Create'
  });

  const showFormModal = async (title: string, type: ModalType, id: string | null) => {
    // set currentPlate to show info in modal
    if (type === 'Modify') {
      // set current
      id && setCurrentTable(id);
    }
    if (type === 'Create') {
      // reset current
      await setCurrentTable(null);
    }
    setModalValues({ isShown: true, title, type });
  };

  // TABLE MODAL
  const closeFormModal = async () => {
    setModalValues(prevState => ({
      ...prevState,
      isShown: false
    }));
    await setCurrentTable(null);
  };

  // TABLE MODAL
  const removeTable = async (tableId: string | null) => {
    //todo remove plate alert
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

  // TABLE MODAL
  const onSaveClick = async (table: Table) => {
    if (user.id) {
      table.uid = user.id;
    } else {
      // without uid plate mustn't be created
      // or updated
      console.log('no user id');
      return;
    }

    if (modalValues.type === 'Create') {
      // create in db
      await startCreatingTable(table);
    } else if (modalValues.type === 'Modify') {
      // update in db
      await startUpdatingTable(table);
    }
    closeFormModal();
  };

  const onEndService = async (table: Table) => {
    // console.log({ table });
    await startAddingToDaySummary(table);
    // reset table
    const cleanTable = {
      ...table,
      total: 0,
      plates: [],
    };
    await startUpdatingTable(cleanTable);
  };

  // Plate modal
  const onClosePlateModal = async () => {
    setPlateModalValues(prevState => ({
      ...prevState,
      isShown: false
    }));
    await setCurrentTable(null);
  };

  const onShowPlateModal = async (tableId: string | null) => {
    if (!tableId) {
      console.log('no table id'); // todo remove
    }
    setPlateModalValues(prevState => ({
      ...prevState,
      isShown: true,
      tableId,
    }));

    await setCurrentTable(tableId);
  };

  const onSavePlateModal = async (tablePlates: Plate[]) => {
    // todo get table id
    if (plateModalValues.tableId) {
      // console.log({ ms: 'id exist', plates: tablePlates }); // todo remove
      await startUpdatingTablePlates({ tableId: plateModalValues.tableId, selectedPlates: tablePlates });
    }
    startGetingTables();
    onClosePlateModal();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="w-full font-semibold text-4xl">
        Tables
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row gap-4 mt-5 overflow-hidden">
        {
          tables.map(table => {
            return (
              <TableCard onEndService={onEndService} removeTable={removeTable} showFormModal={showFormModal} table={table} showPlateModal={onShowPlateModal} key={table.id} />
            );
          })
        }
        {/* Create new table card */}
        <button onClick={() => showFormModal('Create Table', 'Create', null)} className="flex justify-center items-center min-h-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700">
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </section>
      {/* Modals: */}
      {
        modalValues.isShown && (
          <TableForm onClose={closeFormModal} onSave={onSaveClick} table={currentTable} title={modalValues.title ?? ''} />
        )
      }
      {
        plateModalValues.isShown && (
          <SelectProduct plates={plates ?? []} onClose={onClosePlateModal} onSave={onSavePlateModal} />
        )
      }
    </>
  );
};
