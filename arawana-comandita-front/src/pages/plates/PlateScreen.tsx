/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { Loader, PlateGroupManagement, ProductCard, ProductForm } from "../../components";
import { ModalState, Plate } from "../../types";
import { usePlates, useUser } from "../../hooks";
import Swal from "sweetalert2";
import { capitalizeFirstLetter } from "../../helpers";
import { usePlateGroup } from "../../hooks/usePlateGroup";

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
  const {
    plateGroups,
    startGettingPlateGroups,
    startCreatingPlateGroup,
    startRemovingPlateGroups,
  } = usePlateGroup();
  const { user } = useUser();

  // const [plateSections, setPlateSections] = useState<Record<string, Plate[]>>({});
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
      // setPlateSections({});
      plateId && (await startRemovingPlate(plateId));
    }
    await setCurrentPlate(null);
  };

  const onSaveClick = async (plate: Plate) => {
    // setPlateSections({});
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
    const currentPlateGroup = plateGroups.find(group => group.name === groupInputValue);
    if (!currentPlateGroup) {
      await startCreatingPlateGroup(capitalizeFirstLetter(groupInputValue));
      setGroupInputValue('');
    }
  };

  const onRemovePlateGroup = async () => {
    const currentPlateGroup = plateGroups.find(group => group.name === groupInputValue);
    if (currentPlateGroup) {
      //logic
      await startRemovingPlateGroups(currentPlateGroup.id);
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
    startGettingPlateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startGettingPlateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plates]);

  return (
    <section className="w-full h-full px-4 sm:px-10 py-10">
      {
        // Default message:
        plateGroups.length === 0 ? (
          <h1 className="text-2xl mt-20 font-bold w-full text-start text-black dark:text-white">
            To start, create a menu group <br /> <span className="text-gray-500">(soups, drinks, etc):</span>
          </h1>
        ) : (
          plateGroups.map(group => {
            //const plates = plateSections[group.name] ?? [];
            return (
              <div className="mb-9" key={ group.name } >
                <h1 className="truncate w-full font-semibold text-4xl text-black dark:text-white">
                  { group.name }
                </h1>
                <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 mt-10 mb-10">
                  {
                    group.plates?.map(plate => {
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
                  <button onClick={() => showFormModal('Create Plate', null)} className="flex flex-col gap-2 justify-center items-center min-h-32 w-full rounded-lg border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400">
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span className="text-sm font-medium">Add product</span>
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
        plateGroup={plateGroups.filter(group => group.id)}
        onSavePlateGroup={onAddPlateGroup}
        onDeletePlateGroup={onRemovePlateGroup}
      />
      {
        modalValues.isShown && (
          <ProductForm
            onClose={closeFormModal}
            plate={currentPlate}
            title={modalValues.title ?? ''}
            onSave={onSaveClick}
            plateGroups={plateGroups.filter(group => group.id)}
          />
        )
      }
      {
        isLoading && (
          <Loader />
        )
      }
    </section>
  );
};
