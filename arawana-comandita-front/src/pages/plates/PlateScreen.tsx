/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { Loader, PlateGroupManagement, ProductCard, ProductForm } from "../../components";
import { ModalState, Plate } from "../../types";
import { usePlates, useUser } from "../../hooks";
import Swal from "sweetalert2";
import { capitalizeFirstLetter } from "../../helpers";

export const PlateScreen = () => {
  const {
    plates,
    currentPlate,
    plateGroup,
    errorMessage,
    isLoading,
    setCurrentPlate,
    startGetingPlates,
    startCreatingPlate,
    startUpdatingPlate,
    startRemovingPlate,
    startGetingPlateGroups,
    startAddingPlateGroup,
    startRemovingPlateGroup,
  } = usePlates();
  const { user } = useUser();

  const [plateSections, setPlateSections] = useState<Record<string, Plate[]>>({});
  const [groupInputValue, setGroupInputValue] = useState('');
  const [modalValues, setModalValues] = useState<ModalState>({
    isShown: false,
    title: '',
  });

  const showFormModal = async (title: string, id: string | null) => {
    // set currentPlate to show info in modal
    await setCurrentPlate(id);

    setModalValues({ isShown: true, title });
  };

  const closeFormModal = async () => {
    setModalValues(prevState => ({
      ...prevState,
      isShown: false
    }));
    await setCurrentPlate(null);
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
      setPlateSections({});
      plateId && (await startRemovingPlate(plateId));
    }
    await setCurrentPlate(null);
  };

  const onSaveClick = async (plate: Plate) => {
    setPlateSections({});
    if (user.id) {
      plate.uid = user.id;
    } else {
      // without uid plate mustn't be created
      // or updated
      console.log('no user id');
      return;
    }

    if (currentPlate) {
      // update in db
      await startUpdatingPlate(plate);
    } else {
      // create in db
      await startCreatingPlate(plate);
    }
    closeFormModal();
  };

  const onAddPlateGroup = async () => {
    const currentPlateGroup = plateGroup.find(group => group.name === groupInputValue);
    if (!currentPlateGroup) {
      //logic
      await startAddingPlateGroup(capitalizeFirstLetter(groupInputValue));
      setGroupInputValue('');
    }
  };

  const onRemovePlateGroup = async () => {
    const currentPlateGroup = plateGroup.find(group => group.name === groupInputValue);
    if (currentPlateGroup) {
      if (plateSections[groupInputValue]?.length > 0) {
        return await Swal.fire({
          title: 'Delete',
          html: 'You can not delete this group because it has plates',
          icon: 'info',
        });
      }
      //logic
      await startRemovingPlateGroup(currentPlateGroup.id);
      setGroupInputValue('');
    }
  };

  // Error message
  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error In Plates', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    startGetingPlates();
    startGetingPlateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (plates.length === 0) {
      setPlateSections({});
      return;
    }
    plates.forEach((plate) => {
      const group = plateGroup.find((group) => plate.plateGroup === group.name);

      if (group) {
        const prevValue = plateSections[group.name] || [];
        const ids = new Set(prevValue.map((value) => value.id));
        if (!ids.has(plate.id)) {
          setPlateSections((prevState) => ({
            ...prevState,
            [group.name]: [plate, ...prevValue],
          }));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plates, plateGroup]);

  return (
    <main>
      <section className="relative">
        {
          // Default message:
          plateGroup.length === 0 ? (
            <h1 className="text-2xl mt-20 font-bold w-full text-start">
              To start, create a menu group <br /> <span className="text-gray-500">(soups, drinks, etc):</span>
            </h1>
          ) : (
            plateGroup.map(group => {
              const plates = plateSections[group.name] ?? [];
              return (
                <div className="mb-3" key={ group.name } >
                  <h1 className="truncate w-full font-semibold text-4xl">
                    { group.name }
                  </h1>
                  <section className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row gap-4 mt-10">
                    {
                      plates.map(plate => {
                        return (
                          <ProductCard
                            plate={plate}
                            showFormModal={showFormModal}
                            removePlate={removePlate}
                            key={plate.id}
                          />
                        );
                      })
                    }
                    {/* Create button */}
                    <button onClick={() => showFormModal('Create Plate', null)} className="flex justify-center items-center min-h-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700">
                      <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                      </svg>
                    </button>
                  </section>
                </div>
              );
            })
          )
        }
        {/* Plate group */}
        <PlateGroupManagement
          groupInputValue={groupInputValue}
          onChangeInput={(value) => {
            setGroupInputValue(value);
          }}
          plateGroup={plateGroup}
          onSavePlateGroup={onAddPlateGroup}
          onDeletePlateGroup={onRemovePlateGroup}
        />
      </section>
      {
        modalValues.isShown && (
          <ProductForm onClose={closeFormModal} plate={currentPlate} title={modalValues.title ?? ''} onSave={onSaveClick} plateGroups={plateGroup} />
        )
      }
      {
        isLoading && (
          <Loader />
        )
      }
    </main>
  );
};
