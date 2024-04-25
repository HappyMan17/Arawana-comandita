/* eslint-disable max-len */

interface PaymentMethodModalProps {
  isShown: boolean;
  onClose: (paymentMethod: string | null) => void;
}

const paymentMethods = [
  { name: 'De contado' },
  { name: 'Tarjeta de crédito' },
  { name: 'Tarjeta de débito' },
  { name: 'Transferencia' },
  { name: 'Cheque' },
  { name: 'Otro' },
];

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isShown,
  onClose,
}) => {

  const handleOnClose = (event: any) => {
    if (event.target.tagName === 'SECTION') {
      onClose(null);
    }
  };

  const handleOnSave = (event: any) => {
    event.preventDefault();
    let methodSelected = null;

    paymentMethods.forEach(method => {
      if (event.target[method.name].checked) {
        methodSelected = method.name;
      }
    });

    // console.log(methodSelected); // todo remove
    onClose(methodSelected);
  };

  return (
    <section onClick={handleOnClose} className={`${isShown ? '' : 'hidden'} absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-zinc-600 bg-opacity-80`} >
      <div className="bg-white w-auto min-w-96 h-1/2 flex flex-col justify-start items-center py-9 px-3 rounded-xl overflow-auto">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> Payment Method </h1>
        <form onSubmit={handleOnSave}>
          <div className="min-h-10 w-full grid grid-flow-row grid-cols-2 gap-2 my-2 p-1">
            {
              paymentMethods.map(method => {
                return (
                  <label key={method.name} htmlFor={method.name} className="border border-solid rounded-md px-2">
                    <input type="radio" id={method.name} name="paymentMethod" value={method.name} className="mr-2" />
                    { method.name}
                  </label>
                );
              })
            }
          </div>
          <div>
            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
