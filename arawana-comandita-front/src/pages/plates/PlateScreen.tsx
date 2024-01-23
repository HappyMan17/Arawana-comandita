/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { Loader, ProductCard, ProductForm } from "../../components";
import { ModalState, ModalType, Plate } from "../../types";
import { usePlates, useUser } from "../../hooks";
import Swal from "sweetalert2";

export const PlateScreen = () => {
  const {
    plates,
    currentPlate,
    errorMessage,
    isLoading,
    setCurrentPlate,
    startGetingPlates,
    startCreatingPlate,
    startUpdatingPlate,
    startRemovingPlate,
  } = usePlates();
  const { user } = useUser();

  const [modalValues, setModalValues] = useState<ModalState>({
    isShown: false,
    title: '',
    type: 'Create'
  });

  const showFormModal = (title: string, type: ModalType, id: string | null) => {
    // set currentPlate to show info in modal
    if (type === 'Modify') {
      id && setCurrentPlate(id);
    }
    if (type === 'Create') {
      setCurrentPlate(null);
    }
    setModalValues({ isShown: true, title, type });
  };

  const closeFormModal = () => {
    setModalValues(prevState => ({
      ...prevState,
      isShown: false
    }));
  };

  const removePlate = async (plateId: string | null) => {
    //todo remove plate alert
    const result = await Swal.fire({
      title: 'Delete',
      html: 'Do you really want to delete this product? This process can not be undone',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
    });
    if (result && result.isConfirmed) {
      plateId && (await startRemovingPlate(plateId));
    }
  };

  const onSaveClick = async (plate: Plate) => {
    if (user.id) {
      plate.uid = user.id;
    } else {
      // without uid plate mustn't be created
      // or updated
      console.log('no user id');
      return;
    }

    if (modalValues.type === 'Create') {
      // create in db
      await startCreatingPlate(plate);
    } else if (modalValues.type === 'Modify') {
      // update in db
      await startUpdatingPlate(plate);
    }
    closeFormModal();
  };

  // Error message
  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error In Plates', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    startGetingPlates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="w-full font-semibold text-4xl">
                Plates
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row gap-4 mt-10">
        {
          plates.map(plate => {
            return (
              <ProductCard plate={plate} showFormModal={showFormModal} removePlate={removePlate} key={plate.id} />
            );
          })
        }
        {/* Create button */}
        <button onClick={() => showFormModal('Create Plate', 'Create', null)} className="flex justify-center items-center min-h-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700">
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </section>
      {
        modalValues.isShown && (
          <ProductForm onClose={closeFormModal} plate={currentPlate} title={modalValues.title ?? ''} onSave={onSaveClick} />
        )
      }
      {
        isLoading && (
          <Loader />
        )
      }
    </>
  );
};
